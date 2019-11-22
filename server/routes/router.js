const express = require('express');
const router = express.Router();
const path = require('path');
const HOMEDIR = path.join(__dirname, '..');
const emojiController = require(path.join(HOMEDIR, 'controllers', 'emojis'));
const staticController = require(path.join(HOMEDIR, 'controllers', 'static-controller'))


/**
 * STATIC WEBSITE ROUTES
 */
// router.get('/', staticController.displaySite);
// router.get('/admin', staticController.displayAdmin);

/**
 * EMOJI API ROUTES
 */
router.get('/api/getAll', emojiController.getAll);
router.post('/api/create', emojiController.create);
router.put('/api/update', emojiController.update);
router.delete('/api/destroy', emojiController.destroy);




module.exports = router;