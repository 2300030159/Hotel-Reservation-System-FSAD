import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/SignUp';
import HotelLandingPage from './pages/LandingPage';
import UserHome from './user/UserHome';
import AdminHome from './admin/AdminHome';


// Redirect user to appropriate dashboard if logged in
const RootRedirect = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (user?.role === 'ADMIN') return <Navigate to="/adminhome" />;
  if (user?.role === 'USER') return <Navigate to="/userhome" />;

  return <HotelLandingPage />;
};

// Protected Route Component
const ProtectedRoute = ({ element, role }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return <Navigate to="/login" />;
  if (role && user?.role !== role) return <Navigate to="/" />;

  return element;
};

// Redirect to dashboard if already logged in
const RedirectIfLoggedIn = ({ element }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user?.role === 'ADMIN') return <Navigate to="/adminhome" />;
  if (user?.role === 'USER') return <Navigate to="/userhome" />;

  return element;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/login" element={<RedirectIfLoggedIn element={<Login />} />} />
        <Route path="/signup" element={<RedirectIfLoggedIn element={<Signup />} />} />
        <Route path="/userhome" element={<ProtectedRoute role="USER" element={<UserHome />} />} />
        <Route path="/adminhome" element={<ProtectedRoute role="ADMIN" element={<AdminHome />} />} />
      </Routes>
    </Router>
  );
}

export default App;
