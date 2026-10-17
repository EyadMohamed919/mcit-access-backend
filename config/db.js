const ADODB = require('node-adodb');
const path = require("path");

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

const dbFileName = 'dashboard-DevelopmentProjects_Data.accdb';

// 2. Resolve the database path dynamically
const isPackaged = !process.execPath.endsWith('electron.exe') && !process.execPath.endsWith('node.exe');
const baseDir = isPackaged ? path.dirname(process.execPath) : process.cwd();
const dbPath = path.join(baseDir, 'data', dbFileName);

console.log("--> Resolving Access Database Path to:", dbPath);

const connectionString = `Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${dbPath};Persist Security Info=False;`;
const db = ADODB.open(connectionString, process.arch.includes('64'));

module.exports = db;