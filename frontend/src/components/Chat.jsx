import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Base_Url } from '../utils/constants';

const socket = createSocketConnection();

const Chat = () => {
  const navigate = useNavigate();
  const { targetUserId } = useParams();
  const connections = useSelector((store) => store.connection?.connections || []);
  const user = useSelector(store => store.user);
  const userId = user?._id;

  const targetUser = connections.find((field) => field?._id === targetUserId);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const messagesEndRef = useRef(null);

  const sendMessageClick = () => {
    const time = new Date().toLocaleTimeString();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      targetUserId,
      text: newMessages,
      time
    });
    setMessages(prev => [...prev, {
      firstName: user?.firstName,
      lastName: user?.lastName,
      text: newMessages,
      time
    }]);
    setNewMessages('');
  };

  const allMessage = async () => {
    if (!targetUserId) return;
    const chat = await axios.get(Base_Url + "/chat/" + targetUserId, { withCredentials: true });
    const chatMessages = chat?.data?.messages.map((msg) => ({
      firstName: msg?.senderId?.firstName,
      lastName: msg?.senderId?.lastName,
      text: msg?.text,
      time: new Date(msg.createdAt).toLocaleTimeString()
    }));
    setMessages(chatMessages);
  };

  useEffect(() => {
    allMessage();
  }, [targetUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!userId || !targetUserId) return;
    socket.emit("joinChat", { userName: user?.firstName, userId, targetUserId });

    socket.on("messageReceived", ({ firstName, lastName, text, time }) => {
      setMessages(prev => [...prev, { firstName, lastName, text, time }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="flex h-screen w-full flex-col md:flex-row overflow-hidden bg-white dark:bg-black transition-colors">
      
      {/* Left Sidebar - Friends */}
      <div className="w-full md:w-1/3 border-r dark:border-gray-700 border-gray-300 bg-gray-50 dark:bg-gray-900 overflow-y-auto">
        <h2 className="text-xl font-semibold p-4 border-b dark:border-gray-700 text-gray-800 dark:text-white">Friends</h2>
        {connections.map(friend => (
          <div
            key={friend._id}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition ${
              friend._id === targetUserId ? 'bg-gray-300 dark:bg-gray-800' : ''
            }`}
            onClick={() => navigate(`/chatWithFriends/${friend._id}`)}
          >
            <img
              src={friend?.photoUrl || "https://via.placeholder.com/150"}
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover border-2 border-gray-300"
            />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                {friend.firstName} {friend.lastName}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col bg-gray-100 dark:bg-gray-950 transition-colors">
        
        {/* Header */}
        <div className="p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex items-center gap-4">
          <img
            className="h-12 w-12 rounded-full object-cover border border-gray-400"
            src={targetUser?.photoUrl || "https://via.placeholder.com/150"}
            alt="Profile"
          />
          <div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {targetUser?.firstName} {targetUser?.lastName}
            </div>
            <div className={`text-sm ${isOnline ? "text-green-600" : "text-red-500"}`}>
              {isOnline ? "Online" : "Offline"}
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {messages.map((message, index) => {
            const isOwn = user?.firstName === message.firstName;
            return (
              <div
                key={index}
                className={`w-full flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-xs md:max-w-md">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {message.firstName} {message.lastName}
                    <span className="ml-2 text-xs text-gray-500">{message.time}</span>
                  </div>
                  <div className={`px-4 py-2 rounded-2xl text-white ${
                    isOwn ? "bg-blue-600" : "bg-gray-500"
                  }`}>
                    {message.text}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border border-gray-400 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 text-black dark:text-white focus:outline-none"
            value={newMessages}
            onChange={(e) => setNewMessages(e.target.value)}
          />
          <button
            onClick={sendMessageClick}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
