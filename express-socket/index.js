const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const users = [];

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
   socket.on('login', (data) => {
    const found = users.find((nickName) => {
      return nickName === data;
    });

    if(!found) {
      users.push(data);
      socket.nickName = data;
      io.sockets.emit('login', {status : 'OK'});
      io.sockets.emit('users', {users});
    }else {
      io.sockets.emit('login', {status : 'FAILD'});
    }
  });

  socket.on('message', (data) => {
    io.sockets.emit('new message', {
      message : data,
      time : new Date(),
      nickName: socket.nickName
    });
  });

  socket.on('disconnect', (data) => {

    for(let i = 0; i < users.length; i++) {
      if(users[index] === socket.nickName) {
        users.splice(i, 1);
      }
    }
    
    io.sockets.emit('users', {users});

  });
});

server.listen(3000, () => {
  console.log('Server is work on port: 3000 ...');  
});