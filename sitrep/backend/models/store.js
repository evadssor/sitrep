// import { Update } from 'app/updates/update.model';
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
    resolved: { type: Boolean, required: true}
});


module.exports = mongoose.model('Store', storeSchema);