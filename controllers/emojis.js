const express = require('express');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..');
const models = require(path.join(HOMEDIR, 'models', 'emoji-entry'));

/**
 * GET request endpoint, outputs the emoji database.
 * @param  {Request} req - Request object containing info on HTTP Request
 * @param  {Response} res - Response object used to send back information
 */
function getAll(req, res) {
    console.log('GET request detected');
    models.getAll(req, res);
}

/**
 * POST request endpoint, adds a new emoji entry to the database.
 * @param  {Request} req - Request object containing info on HTTP Request
 * @param  {Response} res - Response object used to send back information
 */
function create(req, res) {
    console.log('POST Request detected');
    models.create(req, res);
}

/**
 * Updates an emoji entry with ID found in FormData in the database to have certain
 * values which are also contained in FormData.
 * @param  {Request} req - Request object containing info on HTTP Request
 * @param  {Response} res - Response object used to send back information
 */
function update(req, res) {
    console.log('update');
}

/**
 * Deletes an entry in the database given an ID contained in FormData. 
 * @param  {Request} req - Request object containing info on HTTP Request
 * @param  {Response} res - Response object used to send back information
 */
function destroy(req, res) {
    console.log('destroy');
}

module.exports = {
    getAll,
    create,
    update,
    destroy
};