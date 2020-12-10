const express = require('express');

const { userRouter } = require('./routes');
const db = require('./dataBase').getInstance();

const app = express();

db.setModels();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', userRouter);
// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res.status(err.code).json({
        message: err.message,
        ok: false
    });
});

app.listen(5000, () => {
    console.log('App listen 5000');
});
