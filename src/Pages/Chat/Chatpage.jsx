import React, { useState } from 'react';
import { Phone, Video, MoreVertical, Paperclip, Smile, Mic, Send } from 'lucide-react';

const ChatPage = () => {
  const [message, setMessage] = useState("");
  
  // This would usually come from your "Selected User" state
  const activeUser = { name: "Alex Rivera", status: "Online", avatar: "" };

  return (
    <div className='flex flex-col h-full bg-slate-50 dark:bg-slate-950'>
      
      {/* 1. Header Area */}
      <div className="h-20 px-6 flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
            {activeUser.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white leading-none">{activeUser.name}</h3>
            <span className="text-xs text-green-500 font-medium">{activeUser.status}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"><Phone size={20} /></button>
          <button className="p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"><Video size={20} /></button>
          <button className="p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"><MoreVertical size={20} /></button>
        </div>
      </div>

      {/* 2. Messages Area (The scrollable part) */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat opacity-90 dark:opacity-20">
        {/* Placeholder for messages */}
        <div className="flex justify-start">
          <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-md text-sm text-slate-800 dark:text-slate-200">
            Hey! Did you see the new design?
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-green-500 text-white p-3 rounded-2xl rounded-tr-none shadow-md max-w-md text-sm">
            Yes! It looks amazing. Let's go with the dark theme.
          </div>
        </div>
      </div>

      {/* 3. Input Message Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <button className="p-2 text-slate-400 hover:text-green-500 transition-colors"><Paperclip size={22} /></button>
          <button className="p-2 text-slate-400 hover:text-green-500 transition-colors"><Smile size={22} /></button>
          
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-green-400 outline-none dark:text-white"
            />
          </div>

          <button className={`p-3 rounded-xl transition-all ${message ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            {message ? <Send size={20} /> : <Mic size={22} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;