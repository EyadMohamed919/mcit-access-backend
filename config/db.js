const ADODB = require('node-adodb');
const path = require("path");
const fs = require("fs");
const { app } = require('electron');

// 1. Point node-adodb to the unpacked script (No process.mainModule)
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

let dbPath;
const dbFileName = 'dashboard-DevelopmentProjects_Data.accdb';

// Check if the app is ready and we can access AppData
const configPath = path.join(app.getPath('userData'), 'db-config.json');

// 2. Resolve the database path dynamically (Custom vs Default)
if (fs.existsSync(configPath)) {
    // Load custom path if the user picked one previously
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    dbPath = config.dbPath;
    console.log("--> Loaded custom Database Path from config:", dbPath);
} else {
    // Fall back to original logic if no custom path exists yet
    const isPackaged = !process.execPath.endsWith('electron.exe') && !process.execPath.endsWith('node.exe');
    const baseDir = isPackaged ? path.dirname(process.execPath) : process.cwd();
    dbPath = path.join(baseDir, 'data', dbFileName);
    console.log("--> Resolving Default Access Database Path to:", dbPath);
}

const connectionString = `Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${dbPath};Persist Security Info=False;`;
const db = ADODB.open(connectionString, process.arch.includes('64'));

module.exports = db;