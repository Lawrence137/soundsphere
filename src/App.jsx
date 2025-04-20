import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import Dashboard from './pages/Dashboard';
import Releases from './pages/Releases';
import Analytics from './pages/Analytics';
import Welcome from './pages/Welcome';
import MyMusic from './pages/MyMusic';

// Placeholder components for other routes
const Profile = () => <div className="p-6"><h1 className="text-2xl font-semibold text-gray-900">Profile</h1></div>;
const Settings = () => <div className="p-6"><h1 className="text-2xl font-semibold text-gray-900">Settings</h1></div>;
const Earnings = () => <div className="p-6"><h1 className="text-2xl font-semibold text-gray-900">Earnings</h1></div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/my-music" element={<Layout><MyMusic /></Layout>} />
          <Route path="/releases" element={<Layout><Releases /></Layout>} />
          <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
          <Route path="/earnings" element={<Layout><Earnings /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
