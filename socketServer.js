const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');
const cors = require("cors");
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser} = require('./utils/users');
const { 
    statusOnlineSetRequest, 
    statusOfflineLastSeen,
    checkMemberOfRoom, 
} = require('./utils/socket/axiosReqMethods');
const { welcomeMessage } = require('./utils/socket/socketFunctions');

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));
const botName = "bot";

const PORT = 3000 || process.env.PORT;



io.on('connection', socket => {

    const user = socket.handshake.query;

    //Set status to online
    socket.on('setOnline', async () => {
        try{
            const updatedData = await statusOnlineSetRequest({userId: user.userId});
        }
        catch(err){
            console.log(err);
        }
    })
  
    //end

    socket.on('enterRoom', async ({roomId}) => {

        try{
            const isMember = await checkMemberOfRoom({userId: user.userId, roomId});
            console.log(isMember);
            if(isMember){
                socket.join(roomId);
                console.log("Joined socket room")
            }
        }
        catch(err){
            console.log(err);
        }
        // const user = userJoin(socket.id, username, room);

        // socket.join(user.room);

        // socket.emit('message', formatMessage(botName,"Welcome to chat app"))

        // socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`))
    
    })

    socket.on('chatMessage', ({message, roomId}) => {
        console.log(message);
        console.log(roomId);
        io.to(roomId).emit('message', message)
    })


    socket.on('disconnect', async() => {
        //Set status to offline and last seen
        const updatedData = statusOfflineLastSeen({userId: user.userId});
        console.log(updatedData);
        io.emit('message', formatMessage(botName,'A user has left the chat'))
        //end
    });
})


server.listen(PORT, () => console.log(`Listening to socket server port ${PORT}`));