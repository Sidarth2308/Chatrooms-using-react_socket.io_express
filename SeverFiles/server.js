//jshint  esversion: 6
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");
const cors = require("cors");
const {addUser, removeUser, getUser, getUsersinRoom} =require("./users.js");

const app = express();
app.use(cors());
const PORT  = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketio(server);

io.on("connection",(socket)=>{
  console.log("Client Joined:", socket.id );

  //User joining
  socket.on("join",({name, room}, callback)=>{
    const {error, user} = addUser({id:socket.id, name, room}); // The addUser can only return two things. If it is an error, the next line deals with it. If not, we get a user with an id, name and room.
    if(error){
      return callback(error);
    }
    //admin category messages like user has joined, user is typing etc.
    socket.emit("message",{user:"admin",text:`${user.name},Welcome to the room: ${user.room}`});// welcome message for the user.
    socket.broadcast.to(user.room).emit("message",{user:"admin", text: user.name+" has joined the room!"}); // letting everyone else know

    //joins the user to a room.
    socket.join(user.room);
    io.to(user.room).emit("roomData",{room:user.room, users:getUsersinRoom(user.room)});
    callback(); // the callback will be called everytime but since there is no error passed, it will not show anything on the front end.
  });
  //user category message
  socket.on("sendMessage",(message, callback)=>{
    const user = getUser(socket.id);
    io.to(user.room).emit("message",{user:user.name, text: message});


    callback();
  });
  //User disconnecting
  socket.on("disconnect",()=>{
    console.log("Clinet Disconnected:", socket.id);
    const user = removeUser(socket.id);
    if(user){
      io.to(user.room).emit("message",{user:"admin", text:`${user.name} has left the room.`});
      io.to(user.room).emit("roomData",{room:user.room, users:getUsersinRoom(user.room)});
    }
  });
});

app.use(router);

server.listen(PORT, ()=> console.log('Server running on port :',PORT));
