const io = require('socket.io')(3000, {
  cors:{
    origin: ['http://localhost:5173']
  }
});

io.on("connection", socket =>{
  socket.on("SendMessage", (message, room) =>{
    if (room == ""){
      socket.broadcast.emit("RecieveMessage", message);
    }
    else{
      socket.to(room).emit("RecieveMessage", message);
    }
  })


  socket.on("JoinRoom", (room, cb) =>{
    socket.join(room);
    cb(`Joined room: ${room}`);
  })
});