const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Update = require('./models/update');
const Store = require('./models/store');
const app = express();

mongoose.connect('mongodb+srv://DJAdmin:UzlXjjD8OacEuTOV@cluster0-6udlx.mongodb.net/sitrep?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to DB!');
    })
    .catch((e) => {
        console.log('Connection Failed', e);
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader('Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.post('/api/updates', (req, res, next) => {
    const update = new Update({
        id: req.body.id,
        date: req.body.date,
        time: req.body.time,
        message: req.body.message
    });
    // update.save();
    res.status(201).json({
        message: 'Update Added Successfully'
    });
});

app.get('/api/updates', (req, res, next) => {
    const updates = [
        {
            id: '1001',
            date: '02/20/20',
            time: '06:50',
            message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi voluptatum omnis culpa nihil dignissimos iste amet repudiandae? Ut, voluptate quasi sint velit consequatur adipisci, nostrum maiores cupiditate aut quibusdam in?'
        },
        {
            id: '1002',
            date: '02/21/20',
            time: '10:50',
            message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi voluptatum omnis culpa nihil dignissimos iste amet repudiandae? Ut, voluptate quasi sint velit consequatur adipisci, nostrum maiores cupiditate aut quibusdam in?'
        },
        {
            id: '1003',
            date: '02/22/20',
            time: '16:50',
            message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi voluptatum omnis culpa nihil dignissimos iste amet repudiandae? Ut, voluptate quasi sint velit consequatur adipisci, nostrum maiores cupiditate aut quibusdam in?'
        }
    ]
    res.status(200).json({
        message: 'updates fetched succesfully',
        updates: updates
    })
});

app.post('/api/stores', (req, res, next) => {
    console.log('Store: ', req.body);
    const store = new Store({
        storeNumber: req.body.storeNumber,
        issue: req.body.issue,
        bmcTicket: req.body.bmcTicket,
        serviceTicket: req.body.serviceTicket,
        serverType: req.body.serverType,
        serverModel: req.body.serverModel,
        commType: req.body.commType,
        provider: req.body.provider,
        //updates: req.body.updates
    });
    store.save().then(result => {
        console.log('result', result);
        res.status(201).json({
            message: 'Store Added Successfully'
        });
    }).catch();
});

app.get('/api/stores', (req, res, next) => {
    Store.find().then(documents => {
        res.status(200).json({
            message: 'stores fetched succesfully',
            stores: documents
        });
    }).catch();
});

// TODO 
app.get('/api/stores/:id', (req, res, next) => {
    Store.findById(req.params.id).then(documents => {
        res.status(200).json({
            message: 'store fetched succesfully',
            stores: documents
        });
    }).catch();
});

module.exports = app;