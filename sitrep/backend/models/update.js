const mongoose = require('mongoose');

const updateSchema = mongoose.Schema({
    instanceId: { type: String, required: true},
    storeNumber: { type: String, required: true},
    date: { type: String, required: false},
    time: { type: String, required: false},
    message: { type: String, required: false}
});


module.exports = mongoose.model('Update', updateSchema);