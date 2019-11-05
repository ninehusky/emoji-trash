const express = require('express');
const app = express();
const path = require('path');
const routes = require(path.join(__dirname, 'routes', 'router'));

app.get('/', function(req, res) {
    res.send('App is working');
});

app.use('/api', routes);


app.listen(3000, function() {
    console.log('Listening on 3000!');
});

module.exports = {
    app
};