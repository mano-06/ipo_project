import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import IPOList from './components/IPOList';
import IPODetail from './components/IPODetail';
import AdminLogin from './components/AdminLogin';
import AdminSignup from './components/AdminSignup';
import AdminForgotPassword from './components/AdminForgotPassword';
import AdminDashboard from './components/AdminDashboard';
import AdminIPOList from './components/AdminIPOList';
import AdminRegisterIPO from './components/AdminRegisterIPO';
import AdminEditIPO from './components/AdminEditIPO';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<IPOList />} />
            <Route path="/ipo/:id" element={<IPODetail />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/ipos/upcoming" element={<AdminIPOList />} />
            <Route path="/admin/ipo/register" element={<AdminRegisterIPO />} />
            <Route path="/admin/ipo/edit/:id" element={<AdminEditIPO />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
