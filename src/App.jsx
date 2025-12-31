import React from 'react'
import {Routes, Route } from 'react-router-dom';
import Login from './Pages/Auth/LogIn'
import SignUp from "./Pages/Auth/SignUp"
const App = () => {
  return (
    <div className='bg-green-100'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
