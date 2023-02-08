const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const cors = require("cors");
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser} = require('./utils/users');

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));
const botName = "bot";

const PORT = 3000 || process.env.PORT;



io.on('connection', socket => {

    //Set status to online
    socket.on('setOnline', ({profileId}) => {

    })

    //end

    socket.on('joinRoom', ({username, room}) => {

        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        socket.emit('message', formatMessage(botName,"Welcome to chat app"))

        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`))
    
    })

    socket.on('chatMessage', (msg) => {

        io.to('JavaScript').emit('message', formatMessage('user',msg))
    })


    socket.on('disconnect', () => {
        //Set status to offline and last seen
        io.emit('message', formatMessage(botName,'A user has left the chat'))
        //end
    });
})


server.listen(PORT, () => console.log(`Listening to socket server port ${PORT}`));