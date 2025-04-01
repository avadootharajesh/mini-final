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

io.on("connection", (socket) => {
  console.log(`A user connected ${socket.id}`);

  // joining a room
  socket.on("join-room", (roomName) => {
    socket.join(roomName);
    console.log(`User ${socket.id} joined room: ${roomName}`);
  });

  socket.on("leave-room", (roomName) => {
    socket.leave(roomName);
    console.log(`User ${socket.id} left room: ${roomName}`);
  });

  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    io.to(msg.room).emit("received-message", msg); // sends message to the particular client connected to the socket
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
