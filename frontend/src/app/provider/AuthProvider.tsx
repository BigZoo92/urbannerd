'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { isAuth } from '../utils/auth';
import { useRouter } from 'next/navigation';

interface AuthContextProps {
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuth();
      setIsAuthenticated(authStatus);
    };
    checkAuth();
  }, []);

  useEffect(() => {
      if(!isAuthenticated){
        router.push('/auth');
        setLoading(true)
      }
      else{
        setLoading(false)
      }
  }, [isAuthenticated])

  return (
    <AuthContext.Provider value={{ loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext doit être utilisé à l\'intérieur d\'un AuthProvider');
  }

  return context;
};
