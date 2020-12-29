const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const path = require('path');
require('dotenv').config();

const {
    loginRouter,
    userRouter,
    signUpRouter,
    carRouter,
} = require('./routes');
const db = require('./dataBase').getInstance();
const cronRun = require('./cron-jobs');

const app = express();

db.setModels();
_connectDB();

app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/cars', carRouter);
app.use('/signup', signUpRouter);
app.use('/login', loginRouter);
app.use('/users', userRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res.status(err.code || 500).json({
        message: err.message,
        ok: false
    });
});

app.listen(5000, () => {
    console.log('App listen 5000');
    cronRun();
});

function _connectDB() {
    mongoose.connect('mongodb://localhost:27017/okten', { useNewUrlParser: true });
    const connect = mongoose.connection;

    connect.on('error', (error) => {
        console.log(error);
    });
}
