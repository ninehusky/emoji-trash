const express = require('express');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..');
const public = path.join(HOMEDIR, 'public');

function displaySite(req, res) {
    res.sendFile(public);
}


