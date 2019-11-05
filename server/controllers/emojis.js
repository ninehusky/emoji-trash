const express = require('express');
const path = require('path');
const HOMEDIR = path.join(__dirname, '..');
const models = path.join(HOMEDIR, 'models', 'emoji-entry');

/**
 * Outputs the emoji database.
 * @param  {Request} req - Request object containing info on HTTP Request
 * @param  {Response} res - Response object used to send back information
 */
function getAll(req, res) {
    console.log('get');
    res.send({'message': 'you did it reddit'});
}

/**
 * Adds a new emoji entry to the database.
 * @param  {Request} req - Request object containing info on HTTP Request
 * @param  {Response} res - Response object used to send back information
 */
function create(req, res) {
    console.log('create');
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