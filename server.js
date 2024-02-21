const io = require("socket.io")(3000) //create server on port 3000
const http = require('http')
const fs = require('fs')
const port = 3000;
const user

const server = http.createServer(function(req, res){
    res.writeHead({'Content-Type': 'text/html'});

});

// https://www.youtube.com/watch?v=VShtPwEkDD0&list=PLZlA0Gpn_vH_uZs4vJMIhcinABSTUH2bY&index=1 creating server

io.on('connection', socket => {
    console.log("New User");
    // socket.emit('chat-message', 'Hello World'); //if someone connects, they get hello world
    socket.on('send-chat-message', message => {
        console.log(message);
        socket.broadcast.emit('chat-message', message);
    });
});

