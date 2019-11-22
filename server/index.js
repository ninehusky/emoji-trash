const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const routes = require(path.join(__dirname, 'routes', 'router'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.listen(3000, function() {
    console.log('Listening on 3000!');
});

module.exports = {
    app
};