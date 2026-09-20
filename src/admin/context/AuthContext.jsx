import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiGetMe, apiLogin, apiLogout, getToken, removeToken } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await apiGetMe();
        if (response.success && response.admin) {
          setAdmin(response.admin);
        } else {
          removeToken();
        }
      } catch (error) {
        removeToken();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await apiLogin(email, password);
    setAdmin(response.admin);
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch {
      // Ignore network errors on logout
    } finally {
      setAdmin(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated: !!admin,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
