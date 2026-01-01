import React from 'react';
import { SquarePen, Search } from "lucide-react";

const Chatbar = () => {
  // Mock data for your chat list
  const chats = [
    { id: 1, name: "Alex Rivera", lastMsg: "See you at 5!", time: "10:30 AM", unread: 2, online: true },
    { id: 2, name: "Design Team", lastMsg: "New assets uploaded.", time: "Yesterday", unread: 0, online: false },
    { id: 3, name: "Sarah Jenkins", lastMsg: "Did you check the file?", time: "Monday", unread: 5, online: true },
  ];

  return (
    <div className='w-50 md:w-80 h-screen bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col'>
      
      {/* Header */}
      <div className='p-6 pb-4'>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-black text-slate-800 dark:text-white">Messages</h1>
          <button className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all shadow-lg shadow-green-500/20 cursor-pointer">
            <SquarePen size={18} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="search" 
            placeholder="Search chats..."
            className="w-full bg-slate-200/50 dark:bg-slate-900 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-green-400 outline-none transition-all" 
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-3 space-y-1">
        {chats.map((chat) => (
          <div 
            key={chat.id} 
            className="group flex items-center gap-3 p-3 rounded-2xl hover:bg-white dark:hover:bg-slate-900 hover:shadow-sm cursor-pointer transition-all"
          >
            {/* Avatar with Online Status */}
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-500">
                {chat.name.charAt(0)}
              </div>
              {chat.online && (
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-slate-50 dark:border-slate-950 rounded-full"></div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-0.5">
                <h3 className="font-bold text-slate-900 dark:text-white truncate text-sm">{chat.name}</h3>
                <time className="text-[10px] font-medium text-slate-400 uppercase">{chat.time}</time>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate pr-2 font-medium">
                  {chat.lastMsg}
                </p>
                {chat.unread > 0 && (
                  <span className="bg-green-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatbar;