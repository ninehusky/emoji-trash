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
        required: [true, 'Word parameter must be included'],
        unique: true
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
        type: String,
        default: "No description given."
    }
});

let Emoji = mongoose.model('Emoji', emojiEntry);

/**
 * Adds an emoji to the database using the parameters in req.body.
 * The required parameters are req.body.word, req.body.emoji, and req.body.vulgarity.
 * The optional parameters are req.body.absurdity and req.body.description.
 * Outputs 200 JSON if success.
 * Outputs 400 error if word/emoji pair already exists in database, or if missing required
 * param.
 * Outputs 503 error if other error.
 * @param {Request} req - Request object containing info on HTTP Request
 * @param {Response} res - Response object used to send back information
 */
function create(req, res) {
    Emoji.create(req.body)
        .then(function(newEntry) {
            res.status(200).json({'success': 'New entry successfully created!'});
        })
        .catch(function(err) {
            _handleErrors(res, err);
        });
}

/**
 * Gets one emoji entry given a word/emoji pair.
 * @param {Request} req - Request object containing info on HTTP Request
 * @param {Response} res - Response object used to send back information
 */
function getOne(req, res) {
    if (!(req.body.word && req.body.emoji)) {
        res.status(400).json({'error': 'Please include word and emoji parameters!'});
        return false;
    } else {

    }
}

/**
 * Outputs the entire contents of the emoji table.
 * @param {Request} req - Request object containing info on HTTP Request
 * @param {Response} res - Response object used to send back information
 */
function getAll(req, res) {
    Emoji.find({})
        .then(function(docs) {
            res.status(200).json(docs);
        })
        .catch(function(err) {
            _handleErrors(res, err);
        });
}

/**
 * Deletes an emoji corresponding to the word specified in req.body.word
 * Outputs 200 JSON if successful deletion
 * Outputs 400 error if no word parameter
 * Outputs 400 error if no entry to delete
 * Outputs 503 error if some other error in database
 * 
 * @param {Request} req - Request object containing info on HTTP Request
 * @param {Response} res - Response object used to send back information
 */
function destroy(req, res) {
    if (!req.body.word) {
        return res.status(400).json({'error': 'You must include the word parameter!'})
    }
    Emoji.findOneAndDelete({'word': new RegExp(req.body.word, 'i')}, function(err, docs) {
        if (err) {
            console.error(err);
            return res.status(503).json({'error': 'There was an error with the database.'});
        }
        if (docs) {
            return res.status(200).json({'success': 'Entry successfully deleted from the database!'});
        } else {
            return res.status(400).json({'error': 'No entry found with the given word.'});
        }
    });
}

/**
 * Outputs the error object's first error to the user.
 * @param {Response} res - Response object used to send back information
 * @param {Error} err - Error object
 */
function _handleErrors(res, err) {
    if (err.errors) {
        const keys = Object.keys(err);
        console.log(err);
        for (const key of keys) {
            if (err.errors[key]['name'] && err.errors[key]['name'] === 'ValidatorError') {
                return res.status(400).json({'error': err.errors[key]['message']});
            }
        }
    } else if (err.errmsg && err.errmsg.includes('duplicate')) {
        return res.status(400).json({'error': 'That word already exists in the database!'});
    }
    res.status(500).json({'error': 'There was an error with the database.'});
}

module.exports = {
    create,
    getAll,
    destroy
};