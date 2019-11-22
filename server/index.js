const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const routes = require(path.join(__dirname, 'routes', 'router'));
const cors = require('cors');

// this could not be secure, ask sasha
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(8000, function() {
    console.log('Listening on 8000!');
});

module.exports = {
    app
};