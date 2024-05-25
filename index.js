// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let rooms = {};
let usernames = {};

io.on('connection', (socket) => {
  socket.on('join', (username, room) => {
    usernames[socket.id] = username;
    rooms[socket.id] = room;

    socket.leaveAll();
    socket.join(room);
    io.in(room).emit('message', 'Server: ' + username + ' has entered the game.');
  });

  socket.on('play', (number) => {
    io.in(rooms[socket.id]).emit('play', usernames[socket.id] + ' played ' + number);
  });

  socket.on('disconnect', () => {
    io.in(rooms[socket.id]).emit('message', 'Server: ' + usernames[socket.id] + ' has left the game.');
    delete usernames[socket.id];
    delete rooms[socket.id];
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});