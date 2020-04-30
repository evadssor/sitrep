const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    storeNumber: { type: String, required: true},
    issue: { type: String, required: false},
    bmcTicket: { type: String, required: false},
    serviceTicket: { type: String, required: false},
    serverType: { type: String, required: false},
    serverModel: { type: String, required: false},
    commType: { type: String, required: false},
    provider: { type: String, required: false},
    hardware: { type: String, required: false},
    startDate: { type: String, required: true},
    startTime: { type: String, required: true},
    downTime: { type: String, required: false},
});


module.exports = mongoose.model('Store', storeSchema);