const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emojiEntry = new Schema({
    word: String,
    emoji: String,
    absurdity: Number,
    vulgarity: Boolean,
    description: String
});

let Emoji = mongoose.model('Emoji', emojiEntry);

function create(req, res) {
    
}

module.exports = {

};