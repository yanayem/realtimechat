import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Import Pages
import Login from './Pages/Auth/LogIn';
import SignUp from './Pages/Auth/SignUp';
import Home from './Pages/Home';
import ChatPage from './Pages/Chat/Chatpage';

// Import Components
import Sidebar from './Pages/Sidebar';
import Topbar from './Pages/Topbar';
import Chatbar from './Pages/Chat/Chatbar';
import ProtectedRoute from './components/ProtectedRoute';


const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/signup';

  return (
    <div className='flex h-screen w-full bg-slate-950 text-white overflow-hidden'>
      {!isAuthPage && <Sidebar />}
      
      {/* Pass the selection function to Chatbar */}
      {!isAuthPage && <Chatbar onSelectUser={setSelectedUser} selectedUserId={selectedUser?._id} />}

      <div className='flex-1 flex flex-col min-w-0'>
        {!isAuthPage && <Topbar />}
        <div className='flex-1 overflow-y-auto'>
          <Routes>
            <Route path='/chat' element={
              <ProtectedRoute>
                {/* Pass the selected user data to ChatPage */}
                <ChatPage selectedUser={selectedUser} />
              </ProtectedRoute>
            } />
            {/* ... other routes */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;