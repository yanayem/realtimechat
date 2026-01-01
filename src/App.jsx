import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './Pages/Auth/LogIn'
import SignUp from "./Pages/Auth/SignUp"
import Home from './Pages/Home';
import Sidebar from './Pages/Sidebar';
import Topbar from './Pages/Topbar';
import Chatbar from './Pages/Chat/Chatbar';
import ChatPage from './Pages/Chat/Chatpage';

const App = () => {
  // Get the current path (e.g., "/", "/signup", or "/home")
  const location = useLocation();

  // Define paths where the Sidebar should NOT appear
  const hideSidebarPaths = ['/', '/signup'];

  return (
    <div className="">
    {!hideSidebarPaths.includes(location.pathname) && <Topbar />}
    {/* We use 'flex' so Sidebar and Content sit side-by-side */}
    <div className='flex h-screen bg-gray-950 overflow-hidden'>
      
      {/* 1. Conditional Rendering: Only show Sidebar if NOT on login/signup */}
      {!hideSidebarPaths.includes(location.pathname) && <Sidebar />}
      {!hideSidebarPaths.includes(location.pathname) && <Chatbar />}

      {/* 2. Content Area */}
      <div className='flex-1 h-full overflow-y-auto'>
        <Routes>
          {/* Auth Routes */}
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />

          {/* Main App Routes */}
          <Route path='/home' element={<Home />} />
          {/* Add more routes here, e.g., /profile, /settings */}
          <Route path='/chat' element={<ChatPage />} />
        </Routes>
      </div>
    </div>
    </div>
  )
}

export default App