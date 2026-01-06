import React, { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';

const Chatbar = ({ onSelectUser, selectedUserId }) => {
  const [search, setSearch] = useState("");

  // Mocked users (frontend-only)
  const users = [
    { _id: "1", name: "Yeasin Arafat" },
    { _id: "2", name: "John Doe" },
    { _id: "3", name: "Jane Smith" },
    { _id: "4", name: "Alice Johnson" },
  ];

  // Filter users based on search input
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='w-80 h-full border-r border-slate-800 bg-slate-900 flex flex-col'>

      {/* Search Header */}
      <div className='p-4 space-y-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-bold text-white'>Messages</h1>
          <button className='p-2 bg-slate-800 rounded-lg hover:bg-slate-700'>
            <UserPlus size={18} className='text-green-500'/>
          </button>
        </div>

        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-500' size={16}/>
          <input 
            type="text" 
            placeholder="Search users..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full bg-slate-800 text-sm py-2 pl-10 pr-4 rounded-xl focus:ring-1 focus:ring-green-500 outline-none border-none'
          />
        </div>
      </div>

      {/* Users List */}
      <div className='flex-1 overflow-y-auto px-2'>
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => onSelectUser(user)}
            className={`w-full flex items-center gap-3 p-3 mb-1 rounded-2xl transition-all cursor-pointer ${
              selectedUserId === user._id ? 'bg-green-500/10 border-l-4 border-green-500' : 'hover:bg-slate-800'
            }`}
          >
            <div className='relative'>
              <div className='w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white'>
                {user.name.charAt(0)}
              </div>
              <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full'></div>
            </div>
            <div className='text-left flex-1'>
              <h3 className={`text-sm font-semibold ${selectedUserId === user._id ? 'text-green-400' : 'text-slate-200'}`}>
                {user.name}
              </h3>
              <p className='text-xs text-slate-500 truncate'>Click to chat</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chatbar;
