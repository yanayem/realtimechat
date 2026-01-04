import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { Send, Paperclip } from 'lucide-react';

// Connect to Socket.io
const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000');

const ChatPage = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef();

  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('user'));

  // --- 1. Load Chat History ---
  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/messages/${currentUser.id}/${selectedUser.id}`);
        setMessages(res.data);
        socket.emit('join_room', currentUser.id);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };

    fetchMessages();
  }, [selectedUser, currentUser.id]);

  // --- 2. Listen for Socket Events (Messages & Typing) ---
  useEffect(() => {
    socket.on('receive_message', (newMessage) => {
      if (newMessage.sender === selectedUser?.id) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    socket.on('typing', () => setIsTyping(true));
    socket.on('stop_typing', () => setIsTyping(false));

    return () => {
      socket.off('receive_message');
      socket.off('typing');
      socket.off('stop_typing');
    };
  }, [selectedUser]);

  // --- 3. Scroll to Bottom ---
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // --- 4. Typing Logic ---
  const typingHandler = (e) => {
    setText(e.target.value);

    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedUser.id);
    }

    let lastTypingTime = new Date().getTime();
    setTimeout(() => {
      let timeNow = new Date().getTime();
      if (timeNow - lastTypingTime >= 3000 && typing) {
        socket.emit('stop_typing', selectedUser.id);
        setTyping(false);
      }
    }, 3000);
  };

  // --- 5. Send Message ---
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    socket.emit('stop_typing', selectedUser.id); // Stop typing indicator on send

    const messageData = {
      sender: currentUser.id,
      receiver: selectedUser.id,
      text: text
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/messages/send`, messageData);
      setMessages([...messages, res.data]);
      socket.emit('send_message', { ...res.data, receiverId: selectedUser.id });
      setText("");
    } catch (err) {
      console.error(err);
      alert("Message failed to send");
    }
  };

  if (!selectedUser) return <div className="flex-1 flex items-center justify-center text-slate-500">Select a contact to start chatting</div>;

  return (
    <div className='flex flex-col h-full bg-slate-950'>
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-bold">
          {selectedUser.name.charAt(0)}
        </div>
        <h2 className="font-bold">{selectedUser.name}</h2>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === currentUser.id ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-3 rounded-2xl ${msg.sender === currentUser.id
              ? 'bg-green-600 text-white rounded-tr-none'
              : 'bg-slate-800 text-slate-100 rounded-tl-none'
              }`}>
              <p className="text-sm">{msg.text}</p>
              <span className="text-[10px] opacity-50 block text-right mt-1">
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator UI - Uses 'isTyping' to clear the warning */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-800/50 text-slate-400 text-xs italic p-2 rounded-lg animate-pulse">
              {selectedUser.name} is typing...
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSendMessage} className="p-4 bg-slate-900 flex items-center gap-2">
        <button type="button" className="p-2 text-slate-400"><Paperclip size={20} /></button>
        <input
          type="text"
          value={text}
          onChange={typingHandler} // Using typingHandler instead of setText
          placeholder="Type a message..."
          className="flex-1 bg-slate-800 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
        />
        <button type="submit" className="p-3 bg-green-500 rounded-xl text-white hover:bg-green-600 transition-all">
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatPage;