const io = require("socket.io")(3000) //create server on port 3000

io.on('connection', socket => {
    console.log("New User");
    // socket.emit('chat-message', 'Hello World'); //if someone connects, they get hello world
    socket.on('send-chat-message', message => {
        console.log(message);
        socket.broadcast.emit('chat-message', message);
    });
});

