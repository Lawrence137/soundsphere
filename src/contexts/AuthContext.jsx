import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem('soundsphere_user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  // Simulate login
  const login = async (email, password) => {
    // Create a mock user object
    const user = {
      id: 'mock-user-id',
      email,
      name: email.split('@')[0], // Use part of email as name
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`, // Generate avatar from email
    };
    
    // Store user data in localStorage
    localStorage.setItem('soundsphere_user', JSON.stringify(user));
    setCurrentUser(user);
  };

  // Simulate register
  const register = async (email, password, name) => {
    // Create a mock user object
    const user = {
      id: 'mock-user-id',
      email,
      name: name || email.split('@')[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    };
    
    // Store user data in localStorage
    localStorage.setItem('soundsphere_user', JSON.stringify(user));
    setCurrentUser(user);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('soundsphere_user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext; 