const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// i dont know if i want my code here. perhaps i make some function to initialize database connection?
mongoose.connect('mongodb://localhost/nineramen',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);


/**
 * Word, emoji, vulgarity, and description are required to create an emojiEntry. 
 * Absurdity is not, with a default value of 5.
 */
const emojiEntry = new Schema({
    word: {
        type: String,
        required: [true, 'Word parameter must be included']
    },
    emoji: {
        type: String,
        maxlength: [4, 'Emoji must consist of 1 emoji'], // this will not protect against 'aaaa'
        required: [true, 'Emoji parameter must be included']
    },
    absurdity: {
        type: Number,
        min: [1, 'Absurdity cannot be lower than 1'],
        max: [5, 'Absurdity cannot be higher than 5'],
        default: 5
    },
    vulgarity: {
        type: Boolean,
        required: [true, 'Vulgarity parameter must be included']
    },
    description: {
        type: String

    }
});

let Emoji = mongoose.model('Emoji', emojiEntry);

function create(req, res) {
    console.log(req.body);
    Emoji.create(req.body)
        .then(function(newEntry) {
            console.log('New entry ', newEntry);
            res.json({'message': 'New entry successfully created!'});
        })
        .catch(function(err) {
            err.errors.forEach((error) => {
                if (error.name === 'ValidationError') {
                    res.status(422).json(error.message);
                }
            });
            res.status(500).json(err);
        });
}

module.exports = {
    create
};