const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(process.cwd(), 'views')));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));

app.set('views', path.join(process.cwd(), 'views'));

let usersList = [];
fs.readFile('./user-list.json', ((err, data) => {
    if (err) {
        console.log(err);
    } else {
        usersList = JSON.parse(data);
    }
}));

const isUser = false;

app.get('/users', ((req, res) => {
    res.render('users');
}));

app.get('/', ((req, res) => {
    if (isUser) {
        res.redirect('/users');
    } else {
        res.redirect('/login');
    }
}));

app.get('/login', ((req, res) => {
    res.render('login');
}));

app.get('/signup', ((req, res) => {
    res.render('signup');
}));

app.post('/signup', ((req, res) => {
    usersList.push(req.body);
    console.log(usersList);
    res.redirect('/users');
}));

app.listen(5001, () => {
    // eslint-disable-next-line no-console
    console.log('App listen 5000');
});
