const express = require('express');
const { userRouter } = require('./routes');
const db = require('./dataBase').getInstance();

const app = express();

db.setModels();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', userRouter);

app.listen(5001, () => {
    console.log('App listen 5001');
});
