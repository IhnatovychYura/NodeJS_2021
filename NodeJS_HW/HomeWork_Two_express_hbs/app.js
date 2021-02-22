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
    let {email, password} = req.body;
    let findUser = users.find(user => user.email === email && user.password === password)

    if(findUser) {
        res.redirect(`/users/${users.indexOf(findUser)}`)
        return
    }
    res.redirect('/register')
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

    let {email} = req.body;
    let findUser = users.find(user => user.email === email)

    if(findUser) {
        res.redirect('/error')
        return
    }
    users.push(req.body);
    res.redirect('/users')
})

app.get('/error', (req, res) => {
    res.render('error');
});

app.get('/users', (req, res) => {
    res.render('users', {users})
})
