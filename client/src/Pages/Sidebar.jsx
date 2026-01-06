import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare, Users, Settings, LogOut, User, LayoutDashboard } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const sidetools = [
    { path: '/home', label: 'Chats', icon: <MessageSquare size={22} /> },
    { path: '/groups', label: 'Groups', icon: <Users size={22} /> },
    { path: '/dashboard', label: 'Stats', icon: <LayoutDashboard size={22} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={22} /> },
  ];

  const handleLogout = () => {
   // localStorage.removeItem('user'); // only remove user, not everything
    navigate('/', { replace: true });
  };

  return (
    <div className="flex flex-col w-20 h-screen bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 py-6 items-center">

      {/* Brand Logo */}
      <div className="mb-10">
        <div className="w-12 h-12 bg-gradient-to-tr from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20 rotate-3 hover:rotate-0 transition-transform cursor-pointer">
          <span className="font-black text-2xl text-white">Y</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 w-full px-3 space-y-6">
        {sidetools.map((tool) => {
          const isActive = location.pathname === tool.path;
          return (
            <Link
              key={tool.label}
              to={tool.path}
              className={`relative flex items-center justify-center group ${
                isActive ? '' : ''
              }`}
            >
              <div className={`p-3 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'bg-green-500 text-white shadow-xl shadow-green-500/40 scale-110' 
                  : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-green-500'
              }`}>
                {tool.icon}
              </div>

              {/* Tooltip */}
              <span className="absolute left-20 scale-0 group-hover:scale-100 transition-all duration-150 origin-left bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold px-3 py-2 rounded-xl shadow-2xl z-50 pointer-events-none">
                {tool.label}
              </span>

              {/* Active Indicator */}
              {isActive && (
                <div className="absolute -left-3 w-1.5 h-8 bg-green-500 rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Profile & Logout */}
      <div className="w-full px-3 space-y-4 border-t border-slate-100 dark:border-slate-800 pt-6">
        <Link to="/profile" className="relative flex items-center justify-center group p-3 rounded-2xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
          <User size={22} />
          <span className="absolute left-20 scale-0 group-hover:scale-100 transition-all duration-150 origin-left bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold px-3 py-2 rounded-xl z-50">
            Profile
          </span>
        </Link>

        {/* Only this button logs out */}
        <button
          onClick={handleLogout}
          className="relative flex items-center justify-center group p-3 rounded-2xl text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
        >
          <LogOut size={22} />
          <span className="absolute left-20 scale-0 group-hover:scale-100 transition-all duration-150 origin-left bg-red-600 text-white text-xs font-bold px-3 py-2 rounded-xl z-50">
            Exit
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
