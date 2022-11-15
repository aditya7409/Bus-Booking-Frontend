import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './Pages/Login'
import Register from './Pages/Register'
import ViewSchedule from './Pages/ViewSchedule.js';
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard.js'
import PastBookings from './Pages/PastBookings';


function App() {

  const [userId,setuserId] = useState('');
  const [jwtToken,setjwtToken] = useState('');
  const [role,setrole] = useState('');
  useEffect(() => {
    const user = localStorage.getItem('userId');
    const jwt = localStorage.getItem('jwtToken');
    const role = localStorage.getItem('role');
    setuserId(user);
    setjwtToken(jwt);
    setrole(role);
  },[role])

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pastBookings" element={<PastBookings />} />
        <Route path="/viewSchedule" element={<ViewSchedule />} />
      </Routes>
      
    </BrowserRouter>
    
    </>
  );
}
export default App;