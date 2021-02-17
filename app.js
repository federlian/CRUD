const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
require('dotenv').config();

const {
    loginRouter,
    userRouter,
    signUpRouter,
    confirmRouter
} = require('./routes');
const { PORT } = require('./config/config');
const db = require('./dataBase').getInstance();

const app = express();

db.setModels();

app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/signup', signUpRouter);
app.use('/login', loginRouter);
app.use('/confirmation', confirmRouter);
app.use('/users', userRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res.status(err.code || 500).json({
        message: err.message,
        ok: false
    });
});

app.listen(PORT, () => {
    console.log(`App listen ${PORT}`);
});
