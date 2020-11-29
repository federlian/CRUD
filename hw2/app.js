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

// ----------------------let--------------

let isUser = false;

// -----------------GET-----------------

app.get('/', ((req, res) => {
    if (isUser) {
        return res.redirect('/users');
    }

    res.redirect('login');
}));

app.get('/users', ((req, res) => {
    fs.readFile('./user-list.json', (err, data) => {
        if (err) throw err;

        const userList = JSON.parse(data.toString());

        res.render('users', { users: userList });
    });
}));

app.get('/login', ((req, res) => {
    res.render('login');
}));

app.get('/signup', ((req, res) => {
    res.render('signup');
}));

app.get('/error', (req, res) => {
    res.render('error');
});

// --------------POST-----------------

app.post('/signup', ((req, res) => {
    const { email } = req.body;

    fs.readFile('./user-list.json', (err, data) => {
        if (err) throw err;

        const userList = JSON.parse(data);

        if (userList.find((user) => user.email === email)) {
            return res.redirect('/error');
        }

        userList.push(req.body);
        fs.writeFile('./user-list.json', JSON.stringify(userList), (err1) => {
            if (err1) throw err1;
        });

        isUser = true;
        res.redirect('/users');
    });
}));

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    fs.readFile('./user-list.json', (err, data) => {
        if (err) throw err;

        const userList = JSON.parse(data);
        const findEmail = userList.find((user) => user.email === email && user.password === password);

        if (!findEmail) {
            return res.redirect('/error');
        }

        isUser = true;
        res.redirect('/users');
    });
});

app.post('/logout', (req, res) => {
    isUser = false;
    res.redirect('/');
});

// -------------SERVER_LISTEN--------------------

app.listen(5000, () => {
    console.log('App listen 5000');
});
