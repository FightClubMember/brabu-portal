import React, { createContext, useContext, useState, useEffect } from 'react';

export type Stream = 'science' | 'arts' | 'commerce';

interface UserProfile {
  name: string;
  email: string;
  mobile: string;
  stream: Stream;
  semester: string;
  mjcSubject: string;
}

interface UserContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('brabu-user');
    if (savedUser) {
      setUserState(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const setUser = (userData: UserProfile) => {
    setUserState(userData);
    setIsAuthenticated(true);
    localStorage.setItem('brabu-user', JSON.stringify(userData));
  };

  const logout = () => {
    setUserState(null);
    setIsAuthenticated(false);
    localStorage.removeItem('brabu-user');
  };

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
