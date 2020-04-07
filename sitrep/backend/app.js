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
    Update.find().then(documents => {
        res.status(200).json({
            message: 'updates fetched succesfully',
            updates: documents
        }).catch();
    });
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
            message: 'Store Added Successfully',
            storeId: result._id
        });
        // const update = new Update({
        //     id: result._id,
        //     store: req.body.storeNumber,
        //     date: req.body.date,
        //     time: req.body.time,
        //     message: req.body.message
        // });
        // update.save().then( updateResult => {
        //     res.status(201).json({
        //         message: 'Update Added Successfully',
        //         result: result
        //     });
        // })
    }).catch();
    
});

app.get('/api/stores', (req, res, next) => {
    Store.find().then(documents => {
        res.status(200).json({
            message: 'stores fetched successfully',
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

app.delete('/api/stores/delete/:storeId', (req, res, next) => {
    console.log('Backend:', req);
    Store.deleteOne({_id: req.params.storeId}).then(result => {
        res.status(200).json({
            message: 'store delete successfully',
            result: result
        });
    });
});

module.exports = app;