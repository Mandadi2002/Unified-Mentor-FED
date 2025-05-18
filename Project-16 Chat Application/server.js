const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users = {};
const socketToUser = {};

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  console.log('Connected:', socket.id);

  socket.on('setUsername', username => {
    users[username] = socket.id;
    socketToUser[socket.id] = username;
    io.emit('userList', Object.keys(users));
  });

  socket.on('privateMessage', ({ from, to, text }) => {
    const time = new Date().toLocaleTimeString();
    const msg = { from, to, text, time };

    const toSocket = users[to];
    if (toSocket) io.to(toSocket).emit('message', msg);
    socket.emit('message', msg);
  });

  socket.on('disconnect', () => {
    const username = socketToUser[socket.id];
    delete users[username];
    delete socketToUser[socket.id];
    io.emit('userList', Object.keys(users));
    console.log('Disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
