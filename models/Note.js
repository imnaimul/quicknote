const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Note title is required'],
        trim: true
    },
    body: {
        type: String,
        required: [true, "Note content is required"],
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    tags: [{
        type: String,
        trim: true
    }]
});

module.exports = mongoose.model("Note", noteSchema);