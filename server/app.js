const fs = require("fs");
fs.readFile("tempdata.json", (err, data) => {
    if (err) {
        throw err;
    }    
    let map = JSON.parse(data);
    console.log(map);
});

/* POTENTIALLY USABLE DATABASE STUFF */
// const sqlite3 = require("sqlite3").verbose();

// let db = new sqlite3.Database("../data/emoji_table.db", (err) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log("Connected to emoji table database.");
// });

// db.close((err) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log("Closed connection to emoji table databse.");
// });
