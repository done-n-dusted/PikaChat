// const io = require('socket.io')(5000) //client connected to 5000

const socket = io('http://localhost:3000') //connect to server
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');

socket.on('chat-message', data =>{
    appendMessage(data);
    // console.log(data);
})

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('send-chat-message', message); //event name, content
    messageInput.value = ""; // reset after sending
})

function appendMessage(message){
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);

}