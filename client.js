// client.js
const socket = io('http://localhost:3000');

let username = prompt('Enter your username');
let room = prompt('Enter the room you want to join');

socket.emit('join', username, room);

socket.on('message', (message) => {
    console.log(message);
});

socket.on('play', (message) => {
    console.log(message);
});

function play(number) {
    socket.emit('play', number);
}