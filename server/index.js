import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import cors from "cors";

const port = 8080;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const activeRooms = new Set();
const users = new Map();

io.on("connection", (socket) => {
  console.log(`A user connected ${socket.id}`);
  users.set(socket.id, "Anonymous");

  // set username
  socket.on("set-username", (username) => {
    users.set(socket.id, username);
    console.log(`User ${socket.id} set username to ${username}`);
  });

  // get active rooms
  socket.on("get-rooms", () => {
    socket.emit("room-list", Array.from(activeRooms));
  });

  // joining a room
  socket.on("join-room", (roomName) => {
    if (!socket.rooms.has(roomName)) {
      socket.join(roomName);
      activeRooms.add(roomName);
      console.log(`User ${socket.id} joined room: ${roomName}`);
    }
    io.emit("room-list", Array.from(activeRooms));
    io.to(roomName).emit("received-message", {
      text: `${users.get(socket.id)} has joined the room`,
      sender: "System",
      time: new Date().toISOString(),
      socketId: "system",
    });
  });

  socket.on("leave-room", (roomName) => {
    socket.leave(roomName);
    console.log(`User ${socket.id} left room: ${roomName}`);

    // notifying the other users that the user left the room
    io.to(roomName).emit("received-message", {
      text: `${users.get(socket.id)}  has left the room`,
      sender: "System",
      time: new Date().toISOString(),
      socketId: "system",
    });

    // check if the room is empty
    const room = io.sockets.adapter.rooms.get(roomName);
    if (!room) {
      activeRooms.delete(roomName);
      io.emit("room-list", Array.from(activeRooms));
      console.log(`Room ${roomName} is empty and has been deleted`);
    }
  });

  socket.on("message", (messageData) => {
    console.log("Message received:", messageData);
    io.to(messageData.room).emit("received-message", messageData); // sends message to the particular client connected to the socket
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });
});

httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// socket.emit = sends message to the particular socket
// io.emit = sends message to all connected sockets
// socket.broadcast.emit = sends message to all connected sockets except the sender
// io.to(id).emit(msg) = sends message to the particular socket with id
// socket.id is the original room of the socket so we shouldnt exit it
