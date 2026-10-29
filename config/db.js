const ADODB = require('node-adodb');
const path = require("path");
const fs = require("fs");
const { app } = require('electron');

// 1. Point node-adodb to the unpacked script
if (__dirname.includes('app.asar')) {
    ADODB.PATH = path.join(
        process.resourcesPath,
        'app.asar.unpacked',
        'node_modules',
        'node-adodb',
        'lib',
        'adodb.js'
    );
}

const dbFileName = 'dashboard-DevelopmentProjects_Data.accdb';

function getDatabaseConnection() {
    let dbPath;
    
    // Safely fetch userData path
    const userDataPath = app ? app.getPath('userData') : path.join(process.env.APPDATA, 'mcit-access-backend');
    const configPath = path.join(userDataPath, 'db-config.json');

    // Load custom path from config if it exists on disk
    if (fs.existsSync(configPath)) {
        try {
            const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            if (config.dbPath && fs.existsSync(config.dbPath)) {
                dbPath = config.dbPath;
            }
        } catch (e) {
            console.error("Failed to parse db-config.json:", e);
        }
    }

    // Fallback path
    if (!dbPath) {
        const isPackaged = !process.execPath.endsWith('electron.exe') && !process.execPath.endsWith('node.exe');
        const baseDir = isPackaged ? path.dirname(process.execPath) : process.cwd();
        dbPath = path.join(baseDir, 'data', dbFileName);
    }

    try {
        console.log("--> ADODB Active Connection Path:", dbPath);
        const connectionString = `Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${dbPath};Persist Security Info=False;`;
        return ADODB.open(connectionString, process.arch.includes('64'));
    } catch (error) {
        console.log("----- ERROR at db.js -----");
        console.error(error);
    }
    
}

// Proxy wrapper so existing model files (UserModel, etc.) don't need any code changes
module.exports = {
    query: (sql) => getDatabaseConnection().query(sql),
    execute: (sql) => getDatabaseConnection().execute(sql),
    executeScalar: (sql, scalar) => getDatabaseConnection().executeScalar(sql, scalar)
};