import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// Pages
import Login from "./Pages/Auth/LogIn";
import SignUp from "./Pages/Auth/SignUp";
import Home from "./Pages/Home";
import Chatbar from "./Pages/Chat/Chatbar";
import ChatPage from "./Pages/Chat/Chatpage";
import Profile from "./Pages/Profile";

// Components
import Sidebar from "./Pages/Sidebar";
import Topbar from "./Pages/Topbar";

const App = () => {
  const location = useLocation();

  // Login & Signup pages
  const isAuthPage =
    location.pathname === "/" || location.pathname === "/signup";

  return (
    <div className="flex h-screen w-full bg-slate-950 text-white">
      {/* Sidebar only for Home */}
      {!isAuthPage && <Sidebar />}
      {!isAuthPage && <Chatbar />}

      <div className="flex-1 flex flex-col">
        {/* Topbar only for Home */}
        {!isAuthPage && <Topbar />}

        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/profile" element={<Profile />} />

            {/* fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
