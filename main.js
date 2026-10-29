const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const configPath = path.join(app.getPath('userData'), 'db-config.json');

// main.js

ipcMain.handle('select-db-location', async () => {
    const result = await dialog.showOpenDialog({
        title: 'Select MS Access Database File',
        properties: ['openFile'],
        filters: [{ name: 'Access Database', extensions: ['accdb', 'mdb'] }]
    });

    if (!result.canceled && result.filePaths.length > 0) {
        const selectedPath = path.normalize(result.filePaths[0]);
        
        // Write new path to config
        fs.writeFileSync(configPath, JSON.stringify({ dbPath: selectedPath }));
        return selectedPath;
    }
    return null;
});

ipcMain.handle('restart-app', () => {
    app.relaunch();
    app.exit(0);
});
// --------------------

let mainWindow;

// Function to force user to pick a database if one isn't saved
async function enforceDatabaseSelection() {
    if (!fs.existsSync(configPath)) {
        const result = await dialog.showOpenDialog({
            title: 'Please select your MS Access Database',
            properties: ['openFile'],
            filters: [{ name: 'Access Database', extensions: ['accdb', 'mdb'] }]
        });

        if (!result.canceled && result.filePaths.length > 0) {
            // Save the path so it doesn't ask again next time
            fs.writeFileSync(configPath, JSON.stringify({ dbPath: result.filePaths[0] }));
            return true;
        } else {
            // If they click "Cancel", the app cannot run. Show error and quit.
            dialog.showErrorBox(
                "Database Required", 
                "You must select the database file to launch the application."
            );
            app.quit();
            return false;
        }
    }
    return true; // Config already exists
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        title: "وزارة الاتصالات وتكنولوجيا المعلومات",
        icon: path.join(__dirname, 'static/public/media', 'favicon.ico'),
        show: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            // NEW: Attach the preload script
            preload: path.join(__dirname, 'preload.js') 
        }
    });

    mainWindow.loadURL('http://127.0.0.1:8080');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(async () => {
    // 1. Prompt the user FIRST (Wait until they pick a file)
    const hasDatabase = await enforceDatabaseSelection();
    if (!hasDatabase) return; 

    // 2. Start Express SECOND (Now db.js will find the saved config)
    require('./server');

    // 3. Open the UI window THIRD
    setTimeout(createWindow, 500);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});