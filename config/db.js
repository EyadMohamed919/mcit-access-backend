const ADODB = require('node-adodb');
const path = require("path");
require('dotenv').config()
const dbPath = path.join(__dirname, '../data', process.env.DB_FILENAME);

const connectionString = `Provider=Microsoft.ACE.OLEDB.12.0;Data Source=${dbPath};Persist Security Info=False;`;
const db = ADODB.open(connectionString, process.arch.includes('64') );

module.exports = db;