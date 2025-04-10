"use client";
import React, { useEffect, useMemo, useState } from "react";
import { getToken, getUserByToken } from "@/../actions/userActions";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";

const ChatPage = () => {
  const socket = useMemo(() => io("http://localhost:8080"), []);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    connectSocket();
    return () => {
      socket.disconnect();
    };
  }, []);

  const connectSocket = async () => {
    await checkAuth();
    socket.connect();
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("Connected to server", socket.id);
    });
    socket.on("received-message", (data) => {
      console.log("Received message:", data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });
  };

  const checkAuth = async () => {
    if (typeof window !== "undefined") {
      try {
        const userToken = await getToken("userToken");
        console.log("User token from cookies:", userToken);
        if (userToken) {
          const res = await getUserByToken(userToken, "user");
          console.log("User data:", res);
          if (res.success) {
            setIsLoggedIn(true);
            setUser(res.user);
            setToken(userToken);
          } else {
            console.error(res.message);
            throw new Error(res.message);
          }
        } else {
          throw new Error("No token found");
        }
      } catch (error) {
        console.error("Auth verification error:", error);
        router.push("/login");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("message", { message, room });
      setMessage("");
      console.log("Message has been emitted");
    } else console.log("Message is empty");
  };
  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (roomName.trim()) {
      socket.emit("join-room", roomName);
      console.log("Room joined:", roomName);
    }
    setRoomName("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4">
      <h1 className="text-2xl font-bold">Real-time Chat</h1>
      <div className="w-96 h-64 border p-4 overflow-auto">
        {messages.map((msg, index) => (
          <p key={index} className="p-1 bg-gray-200 rounded mb-2">
            {msg}
          </p>
        ))}
      </div>
      <h2>{socketId}</h2>
      <form onSubmit={handleJoinRoom}>
        <input
          type="text"
          placeholder="Enter room id"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="mt-2 p-2 border rounded w-96"
        />
        <button type="submit">Join</button>
      </form>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="mt-2 p-2 border rounded w-96"
          placeholder="Enter room name..."
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 p-2 border rounded w-96"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
