import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { AuthResponse } from '@/types/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthResponse['user'] | null;
  userRole: string | null;
  isAdmin: boolean;
  token: string | null;
  isLoading: boolean;
  logout: () => void;
  setToken: (token: string) => void;
  setUser: (user: AuthResponse['user']) => void;
  setUserRole: (role: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('token')
  );
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!token;
  const isAdmin = userRole === 'admin';

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await api.get('/common/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setUserRole(res.data.user.role);
      } catch (err) {
        console.error('Session expired');
        logout(); // auto logout if invalid
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        isAdmin,
        token,
        isAuthenticated,
        isLoading,
        logout,
        setToken,
        setUser,
        setUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
