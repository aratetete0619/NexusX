// AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';

interface AuthContextProps {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const login = (token: string) => {
    // Save the token in a secure cookie
    setCookie(null, 'token', token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    setIsLoggedIn(true);
    router.push('/explore');
  };

  const logout = () => {
    // Destroy the cookie
    destroyCookie(null, 'token');
    setIsLoggedIn(false);
    router.push('/login');
  };

  useEffect(() => {
    // Check the session or local storage and restore the login state
    const cookies = parseCookies();
    const token = cookies.token;

    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
