import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, MoreVertical, Phone, Video } from 'lucide-react';

const ChatPage = ({ selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const scrollRef = useRef();

  // ১. হার্ডকোডেড ইউজার (যেহেতু ব্যাকএন্ড নেই)
  const currentUser = { id: '101', name: 'You' };

  // ২. ডামি মেসেজ লোড করা
  useEffect(() => {
    if (!selectedUser) return;

    setMessages([
      { sender: selectedUser.id, text: `Hey there! I am ${selectedUser.name}`, createdAt: new Date().toISOString() },
      { sender: '101', text: "Hi! How's your project going?", createdAt: new Date().toISOString() },
      { sender: selectedUser.id, text: "It's going great! Just working on the UI.", createdAt: new Date().toISOString() }
    ]);
  }, [selectedUser]);

  // ৩. অটো স্ক্রল টু বটম
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ৪. মেসেজ পাঠানোর ফাংশন (শুধু ফ্রন্টএন্ডের জন্য)
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newMessage = {
      sender: '101',
      text: text.trim(),
      createdAt: new Date().toISOString()
    };

    setMessages([...messages, newMessage]);
    setText("");
  };

  if (!selectedUser)
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-950 text-slate-500">
        <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-4 border border-slate-800">
           <Send size={32} className="text-slate-700" />
        </div>
        <p className="text-lg font-medium">Your Messages</p>
        <p className="text-sm">Select a contact to start a conversation</p>
      </div>
    );

  return (
    <div className="flex flex-col h-full bg-slate-950 text-white">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 flex items-center justify-center font-bold text-white shadow-lg">
              {selectedUser.name.charAt(0)}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
          </div>
          <div>
            <h2 className="font-bold text-slate-100">{selectedUser.name}</h2>
            <p className="text-[10px] text-green-400 font-medium uppercase tracking-wider">Online</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-slate-400">
          <Phone size={20} className="hover:text-white cursor-pointer transition-colors" />
          <Video size={20} className="hover:text-white cursor-pointer transition-colors" />
          <MoreVertical size={20} className="hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === currentUser.id ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
            <div className={`max-w-[75%] p-3.5 rounded-2xl shadow-sm ${
              msg.sender === currentUser.id
                ? 'bg-green-600 text-white rounded-tr-none'
                : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700'
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <span className={`text-[9px] block mt-1 ${msg.sender === currentUser.id ? 'text-green-100' : 'text-slate-400'}`}>
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 bg-slate-900/80 backdrop-blur-md border-t border-slate-800">
        <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-center gap-3">
          <button type="button" className="p-2.5 text-slate-400 hover:bg-slate-800 rounded-full transition-all">
            <Paperclip size={22} />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a message..."
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all placeholder:text-slate-500"
            />
          </div>

          <button 
            type="submit" 
            disabled={!text.trim()}
            className="p-3 bg-green-500 rounded-2xl text-white hover:bg-green-600 active:scale-90 disabled:opacity-50 disabled:hover:bg-green-500 transition-all shadow-lg shadow-green-500/20"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;