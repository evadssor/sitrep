const mongoose = require('mongoose');

const updateSchema = mongoose.Schema({
    date: { type: String, required: true},
    time: { type: String, required: true},
    message: { type: String, required: true}
});


module.exports = mongoose.model('Update', updateSchema);