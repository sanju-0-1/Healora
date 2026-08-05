import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('healora_user');
    return savedUser ? JSON.parse(savedUser) : {
      id: 'usr-1',
      name: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      age: 28,
      gender: 'Male',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    };
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    if (user) {
      localStorage.setItem('healora_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('healora_user');
    }
  }, [user]);

  const login = (email, password) => {
    const newUser = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0].replace('.', ' '),
      email,
      age: 30,
      gender: 'Not specified',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    };
    setUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  const register = (name, email, password) => {
    const newUser = {
      id: 'usr-' + Date.now(),
      name,
      email,
      age: 25,
      gender: 'Other',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    };
    setUser(newUser);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUserProfile = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
