const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const multer = require('multer');
const readline = require('readline');
const uploads = multer();

/*
    TODO:
        - implement editing
        - parsing of proper params
        - change output from /gettable to proper json instead of array, i.e., a map
        - documentation
        - make the code look not bad
        - logger?

*/

// i put this up here cause i thought it was funny
// it can't get called from anywhere though
function nukeDatabase() {
    const SQL = 'DROP TABLE emojis';
    const con = connect();
    con.query(SQL);
    console.log("Are you sure you want to delete the table? I haven't implemented caching. (Y/n)");
    let answer = readline();
    if (answer === 'Y') {
        console.log('the dark deed you requested is done sir');
    } else {
        console.log('Mission aborted o7');
    }
}

app.use(express.static('public'));

app.get('/emojitable', function(req, res) {
    const database = require('./tempdata.json');
    res.json(database);
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', function(req, res) {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname, 'about.html'));
})

app.get('/createdatabase', function(req, res) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ilovesql', // this is obviously not going into production
        multipleStatements: true
    });

    const SQL_SETUP_COMMAND = `
        CREATE DATABASE IF NOT EXISTS nineramen;
        USE nineramen;
        SET NAMES utf8mb4;
        CREATE TABLE IF NOT EXISTS emojis(
            word VARCHAR(255),
            emoji VARCHAR(255),
            absurdity TINYINT,
            vulgarity TINYINT,
            description VARCHAR(255)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;
    ` // the ENGINE bit makes it so that emoji support is there
    con.connect(function(err) {
        if (err) throw err;
    });
    console.log('Connected!');
    console.log('Creating database and table...');
    con.query(SQL_SETUP_COMMAND, function(err, result) {
        if (err) throw err;
        console.log('Success!');
    });
    res.json({"success": "Database and table successfully created!"});
});

app.get('/gettable', function(req, res) {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ilovesql',
        database: 'nineramen'
    });

    con.query('SELECT * FROM emojis', function(err, data) {
        if (err) throw err;
        res.json(data);
    });
})

app.get('/add', uploads.none(), function (req, res) {
    // parse params in formdata, throw necessary errs
    const SQL = `
                INSERT INTO emojis
                (
                    word, emoji, absurdity, vulgarity, description
                )
                VALUES
                (
                    ?, ?, ?, ?, ?
                )`;
    con = connect();
    con.query(SQL, [req.body.word, req.body.emoji, req.body.absurdity, req.body.vulgarity, req.body.description], function(err, data) {
        if (err) res.json(error('There was an error adding this entry to the database')); // idk if this works
    });
    // return json of success
    res.json({'success': 'Successfully added entry to database!'})
});

// should return 'no' if nothing to delete
app.get('/delete', uploads.none(), function(req, res) {
    con = connect();
    SQL = `DELETE FROM emojis WHERE `;
    let param;
    // delete by id
    if (req.body && req.body.id) {
        SQL += 'id = ?';
        param = req.body.id;
    } else if (req.body && req.body.word) {
        // delete by word
        SQL += 'word = ?';
        param = req.body.word;
    } else {
        error("you didn't include the right params in formdata :c. id or word.");
    }

    con.query(SQL, [param], function(err, data) {
        if (err) throw err;     
        res.json({'message': 'Successfully removed row(s) from the database!'});          
    });
});

/* TODO: add this to other functions*/
function connect() {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'ilovesql', // this is obv not going into production
        database: 'nineramen',
        charset: "utf8mb4",
        collation: "utf8mb4_general_ci"
    });
    return con;
}

function error(message) {
    return {"error": message};
}
app.listen(8000);
console.log("shit's happening");