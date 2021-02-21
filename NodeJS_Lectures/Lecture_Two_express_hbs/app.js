const express = require('express');
const expressHbs = require('express-handlebars');
const lodash = require('lodash');
const path = require('path');

const app = express();

// port 3000 - React
// port 4200 - Angular
app.listen(5000, () => {
    console.log('App listen 5000')
});

// in terminal
// ctrl + c - stop server
// ctrl + z - request server about state in the moment

app.get('/hello', (req, res)=>{
    res.send('Hello World');
})

app.get('/end', (req, res)=>{
    res.write('Response End');
    res.end();
})

app.get('/usersFromApp', (req, res)=>{
    res.json([
        {name: 'Dima'},
        {name: 'Viktor '},
        {name: 'Karina'},
    ]);
})




/// Щоб віддавати якісь дані наззовні (зображення, html, ...) потрібно здійснити певні налаштування в бекенді: ///

// привязка до статичної папки (типу ми прописуємо, щоб аплікашка використовувала статичну папку)
app.use(express.static(path.join(__dirname, 'views')));
// який двигун використовувати для відображення (аплікашка встанови 'view engine' (нода це читає) для відображення файлів з розширенням .hbs)
app.set('view engine', '.hbs');
// як працювати коли зустрінуться такі налаштування (аплікашка використовуй двіжок коли зустрічаєш файли .hbs і далі використовуй такий обробник)
app.engine('.hbs', expressHbs({
    defaultLayout: false
}))
// де вюшки лежать (аплікушка встанови папку де лежать вюшки 'views' - нода це читає)
app.set('views', path.join(__dirname, 'views'));




app.get('/login', (req, res) => {
    res.render('login', {xxx: true, name: 'Andrey'});
})

app.use(express.json()); // вчимо апку читати json але поки будуть пусті об'єкти
app.use(express.urlencoded({extended: true})); // тепер будуть об'єкти з даними

const users = [
    {email: 'yuraihnatovych111@gmail.com', gender: 'male'},
    {email: 'yura_ihnatovych@mail.ru', gender: 'male'},
    {email: 'volodymyrihnatovych1@gmail.com', gender: 'male'},
    {email: 'martamozharovska@gmail.com', gender: 'female'}
];

// в hbs в формі аргументом ми вписали method="post" відповідно щоб він відображався треба створити app.post
app.post('/login', (req, res) => {
    console.log(req.body); // буде undefined поки ми апку не навчимо читати json

    users.push(req.body);

    // res.json('User registered')
    res.redirect('/users')
})

// app.get('/users', (req, res) => {
//     res.render('users', {users})
// })

app.get('/users', (req, res) => {
    const {gender} = req.query;
    console.log(req.query);

    let userToShow = JSON.parse(JSON.stringify(users));

    if (gender) {
        userToShow = users.filter(value => value.gender === gender)
    }

    res.render('users', {users: userToShow})
})


app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;
    console.log(req.params);

    res.json(users[userId])
})

// =========== NOT GOOD ===========
// /users/single
// /users/register
// PUT /users/updateUser
// DELETE /users/deleteOneUSer/:userId
// =========== NOT GOOD ===========


// GET /users
// POST /users
// GET /users/:userID
// PUT /users/:userID
// DELETE /users/:usersID
