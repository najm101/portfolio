import React, { createContext, useContext, useState, useEffect } from 'react';
import { RESUME_DATA } from './constants';
import { ResumeData } from './types';

// --- Auth Context ---
interface AuthContextType {
  isAuthenticated: boolean;
  login: (pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('isAdmin');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  const login = (pass: string) => {
    // Hardcoded password for demo purposes
    if (pass === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- Resume Data Context ---
interface ResumeContextType {
  data: ResumeData;
  updateData: (newData: ResumeData) => void;
}

const ResumeContext = createContext<ResumeContextType>({
  data: RESUME_DATA,
  updateData: () => {},
});

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ResumeData>(RESUME_DATA);

  // You might want to load from localStorage here if you want persistence across refreshes
  // for the demo, we just use the constant as initial state
  
  const updateData = (newData: ResumeData) => {
    setData(newData);
    // In a real app, this would send a POST request to an API
    console.log('Data Updated:', newData);
  };

  return (
    <ResumeContext.Provider value={{ data, updateData }}>
      {children}
    </ResumeContext.Provider>
  );
};