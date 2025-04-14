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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="max-w-5xl w-full mx-auto p-6 flex flex-col flex-grow">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-amber-900 mb-2 tracking-tight">Real-time Chat</h1>
          {user && (
            <p className="text-amber-700 text-lg font-medium">
              Welcome, {user.username || user.email || "User"}
            </p>
          )}
          <div className="text-xs text-amber-600/70 mt-1 font-light">
            Socket ID: {socketId}
          </div>
        </header>

        <div className="flex flex-col md:flex-row gap-8 flex-grow">
          {/* Sidebar for room management */}
          <div className="w-full md:w-72 bg-gradient-to-b from-amber-50 to-amber-100 rounded-xl shadow-lg p-6 border border-amber-200/80 backdrop-blur-sm">
            <h2 className="font-semibold text-xl mb-4 text-amber-900 border-b border-amber-200 pb-2">Rooms</h2>
            <form onSubmit={handleJoinRoom} className="mb-6">
              <div className="flex flex-col space-y-3">
                <label htmlFor="roomName" className="text-amber-800 font-medium text-sm">Room Name</label>
                <input
                  id="roomName"
                  type="text"
                  placeholder="Enter room name"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900 bg-amber-50/70 shadow-inner placeholder-amber-400"
                />
                <button 
                  type="submit"
                  className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-3 px-4 rounded-lg transition duration-200 text-sm font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Join Room
                </button>
              </div>
            </form>

            <div className="mt-6">
              <h3 className="font-medium text-sm text-amber-800 mb-3 uppercase tracking-wider">Current Room</h3>
              <div className="bg-amber-200/70 p-3 rounded-lg text-amber-900 font-medium border border-amber-300 shadow-inner text-center">
                {room ? room : "Not in any room"}
              </div>
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-grow flex flex-col bg-white rounded-xl shadow-lg overflow-hidden border border-amber-200">
            {/* Messages container */}
            <div className="flex-grow p-6 overflow-y-auto bg-gradient-to-br from-amber-50/80 to-amber-100/50">
              {messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div 
                      key={index} 
                      className="max-w-[80%] p-4 rounded-xl bg-white border border-amber-200/70 shadow-sm ml-auto"
                    >
                      <p className="text-amber-900 font-medium">{msg}</p>
                      <div className="text-xs text-amber-500 mt-1 text-right">
                        {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center p-8 rounded-xl bg-amber-100/50 border border-amber-200/50">
                    <p className="text-amber-700 italic font-medium">No messages yet</p>
                    <p className="text-amber-600/70 text-sm mt-2">Join a room and start chatting!</p>
                  </div>
                </div>
              )}
            </div>

            {/* Message input form */}
            <div className="border-t border-amber-200 p-5 bg-gradient-to-r from-amber-100 to-amber-50">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="flex-grow px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900 bg-white shadow-sm placeholder-amber-400"
                    placeholder="Room name..."
                  />
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-grow px-4 py-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900 bg-white shadow-sm placeholder-amber-400"
                    placeholder="Type a message..."
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3 rounded-lg transition duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
