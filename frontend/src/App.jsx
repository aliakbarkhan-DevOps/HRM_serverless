import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Briefcase, DollarSign, Target, LogOut } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Login from './pages/Login';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const Sidebar = () => {
  const location = useLocation();
  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/employees', label: 'Employees', icon: <Users size={20} /> },
    { path: '/attendance', label: 'Attendance', icon: <Calendar size={20} /> },
    { path: '/leave', label: 'Leave', icon: <Briefcase size={20} /> },
    { path: '/payroll', label: 'Payroll', icon: <DollarSign size={20} /> },
    { path: '/recruitment', label: 'Recruitment', icon: <Target size={20} /> },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">Nexus HRMS</div>
      <div className="sidebar-nav">
        {navItems.map(item => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
      <div style={{ marginTop: 'auto' }}>
        <button 
          className="nav-item" 
          style={{ width: '100%', background: 'none', textAlign: 'left' }}
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

const Topbar = () => {
  return (
    <div className="topbar">
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Welcome back, Admin!</h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
          AD
        </div>
      </div>
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="page-content animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <PrivateRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/employees" element={<Employees />} />
                {/* Add placeholders for other routes */}
                <Route path="/attendance" element={<div><h2>Attendance Module</h2><p>Coming soon...</p></div>} />
                <Route path="/leave" element={<div><h2>Leave Module</h2><p>Coming soon...</p></div>} />
                <Route path="/payroll" element={<div><h2>Payroll Module</h2><p>Coming soon...</p></div>} />
                <Route path="/recruitment" element={<div><h2>Recruitment Module</h2><p>Coming soon...</p></div>} />
              </Routes>
            </Layout>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
