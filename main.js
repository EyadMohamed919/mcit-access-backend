const { app, BrowserWindow } = require('electron');
const path = require('path');

// 1. Start the Express backend server
require('./server');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        title: "وزارة الاتصالات وتكنولوجيا المعلومات",
        show: true,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    // 2. Load Express local endpoint
    mainWindow.loadURL('http://127.0.0.1:8080');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    // Give Express a brief moment to bind to port 8080 before creating the window
    setTimeout(createWindow, 500);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});