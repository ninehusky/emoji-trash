const express = require('express');
const router = express.Router();
const path = require('path');
const HOMEDIR = path.join(__dirname, '..');
const controller = require(path.join(HOMEDIR, 'controllers', 'emojis'));


router.get('/emojis', controller.getAll);

router.post('/emojis/create', controller.create);
router.put('/emojis/update', controller.update);
router.delete('/emojis/destroy', controller.destroy);

module.exports = router;