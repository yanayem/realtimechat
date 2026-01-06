import React from 'react';
import { MessageSquarePlus, ShieldCheck, Zap } from 'lucide-react';

const Home = () => {
  // Get user name from localStorage safely
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="flex items-center justify-center w-full h-full bg-slate-50 dark:bg-slate-950 p-6">
      
      {/* Main Welcome Card */}
      <div className="relative max-w-2xl w-full bg-white dark:bg-slate-900 rounded-[2rem] p-10 shadow-2xl shadow-slate-200 dark:shadow-none border border-white dark:border-slate-800 text-center overflow-hidden">

        {/* Decorative Background Glows */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-green-500/10 blur-3xl rounded-full pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>

        {/* Icon Animation */}
        <div className="relative mb-8 inline-block">
          <div className="w-24 h-24 bg-gradient-to-tr from-green-400 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-500/40 animate-bounce-slow">
            <MessageSquarePlus size={48} className="text-white" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 p-1.5 rounded-full shadow-lg">
            <Zap size={16} className="text-yellow-400 fill-yellow-400" />
          </div>
        </div>

        {/* Welcome Text */}
        <h1 className="text-4xl font-black text-slate-800 dark:text-white mb-4">
          Welcome back, <span className="text-green-500">{user.name ? user.name.split(' ')[0] : 'User'}</span>!
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          Your messages are synchronized and ready. Select a contact from the sidebar to start a secure conversation.
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300">
            <ShieldCheck size={14} className="text-green-500" /> End-to-end Encrypted
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300">
            <Zap size={14} className="text-blue-500" /> Real-time Sync
          </div>
        </div>

        {/* Quick Start Button (Mobile Only) */}
        <button className="mt-12 md:hidden w-full bg-green-500 dark:bg-green-600 text-white dark:text-white font-bold py-4 rounded-2xl shadow-xl transition-transform active:scale-95">
          Open Contact List
        </button>

      </div>
    </div>
  );
};

export default Home;
