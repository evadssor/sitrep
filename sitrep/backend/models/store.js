import { Update } from 'app/updates/update.model';
const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    issue: { type: String, required: true},
    bmcTicket: { type: String, required: true},
    serviceTicket: { type: String, required: true},
    serverType: { type: String, required: true},
    serverModel: { type: String, required: true},
    commType: { type: String, required: true},
    provider: { type: String, required: true},
    updates: { type: Update, required: true}
});


module.exports = mongoose.model('Store', storeSchema);