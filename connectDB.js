// ------ File Database ------ // 
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('websiteProjectDB');

module.exports = db;