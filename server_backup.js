if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

const port = 3000;
// const io = require("socket.io")(port) //create server on port 3000
const http = require('http')
const fs = require('fs')
const express = require('express')
const session = require('express-session')
const flash = require('express-flash')
const methodOverride = require('method-override')

const app = express();
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}));
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.get('/', (req, res) => {
    console.log('home page')
    res.render('index.ejs', {name: "yo"});
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})


// io.on('connection', socket => {
//     console.log("New User");
//     // socket.emit('chat-message', 'Hello World'); //if someone connects, they get hello world
//     socket.on('send-chat-message', message => {
//         console.log(message);
//         socket.broadcast.emit('chat-message', message);
//     });
// });

app.listen(port);