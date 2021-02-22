const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const users = require('./users.json');

const app = express();

app.listen(5000, () => {
    console.log('App listen 5000')
    console.log(users)
});

app.get('', (req, res) => {
    res.send('Welcome to OktenWeb Email System');
})


app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}))
app.set('views', path.join(__dirname, 'views'));


app.get('/login', (req, res) => {
    res.render('login');
})

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/login', (req, res) => {
    let outsideUser = req.body
    for (let i = 0; i < users.length; i++) {
        if (outsideUser.email === users[i].email && outsideUser.password === users[i].password) {
            res.redirect(`/users/${i}`)
        } else {
            res.redirect('/register')
        }
    }
})

app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;
    console.log(req.params);

    let userToShow = JSON.parse(JSON.stringify(users[userId]));

    res.render('userId', {user: userToShow})
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', (req, res) => {

    for (let i = 0; i < users.length; i++) {
        if (req.body.email === users[i].email) {
            res.redirect('/error')
        } else {
            users.push(req.body);
            res.redirect('/users')
        }
    }
})

app.get('/error', (req, res) => {
    res.render('error');
});

app.get('/users', (req, res) => {
    res.render('users', {users})
})
