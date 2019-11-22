const express = require('express');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..');
const public = path.join(HOMEDIR, 'public');

// this file probably won't be used if i keep client and server separate.