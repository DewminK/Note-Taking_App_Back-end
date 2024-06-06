const mongoose = require('./db');

const notesSchema = new mongoose.Schema({
    header: String,
    description: String,
});

const Notes =mongoose.model('Notes',notesSchema);

module.exports= Notes;