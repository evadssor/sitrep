const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Update = require('./models/store');
const app = express();

mongoose.connect('mongodb+srv://DJAdmin:UzlXjjD8OacEuTOV@cluster0-6udlx.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to DB!');
    })
    .catch(() => {
        console.log('Connection Failed');
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
        date: req.body.date,
        time: req.body.time,
        message: req.body.message
    });
    update.save();
    res.status(201).json({
        message: 'Post Added Successfully'
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

module.exports = app;