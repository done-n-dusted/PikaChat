const express = require('express');
const app = express();
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}));

const io = require('socket.io-client');
const socket = io('http://localhost:3000') //connect to server

const port = 8080;

app.get('/', isAuth, (req, res) => {
    console.log('Hello')
    res.render('index.ejs', {name: req.user.name});
})

app.get('/login', isNotAuth, (req, res) => {
    res.render('login.ejs');
})

app.post('/login', isNotAuth, (req, res) => {
    socket.emit('login-try', req.body.name);
    let reply = null;
    socket.on('login-attempt', data => {
        reply = data;
    })
    //success
    if(reply){
        res.name = req.body.name;
        res.render('index.ejs')
    }
    //fail
    res.name = null
    res.render('login.ejs')
})


app.post('/', isAuth, (req, res) => {
    // const message = req.body.content;
    const user = req.name;
    socket.emit('send-chat-message', {sender: req.name, content: req.body.content})
})


function isAuth(req, res, next){
    if(req.auth){
        return next();
    }
    res.redirect('/login');
}

function isNotAuth(req, res, next){
    if(req.auth){
        return res.redirect('/');
    }
    return next();
}

app.listen(port);
