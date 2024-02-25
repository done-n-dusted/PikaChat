if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

const port = 3000;

const names = ['user1', 'user2', 'user3'];

const io = require("socket.io")(port)

function isValid(obj){
    return names.includes(obj);
}

io.on('connection', socket => {
    console.log("New User");
    // socket.emit('chat-message', 'Hello World'); //if someone connects, they get hello world
    
    socket.on('login-try', credentials => {
        // do login
        if(isValid(credentials)){
            socket.emit('login-attempt', true);
            socket.broadcast.emit('chat-message', credentials + "has joined the chat.")
        }
        else{
            socket.emit('login-attempt', false);
        }
    })

    
    socket.on('send-chat-message', message => {
        console.log(message);
        const from = message.sender;
        socket.broadcast.emit('chat-message', from + ": " + message.content);
    });
});