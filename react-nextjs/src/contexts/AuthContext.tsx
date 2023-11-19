// AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';

interface AuthContextProps {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET as string;

  if (!secretKey) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
  }

  const login = (token: string) => {
    setCookie(null, 'token', token, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    setIsLoggedIn(true);
    const browserLocale = navigator.language.split('-')[0] || 'en-US';
    const supportedLocales = ['en', 'ja'];
    const locale = supportedLocales.includes(browserLocale) ? browserLocale : 'en';
    router.push(`/${locale === 'en' ? 'en-US' : 'ja-JP'}/explore`);
  };

  const logout = () => {
    destroyCookie(null, 'token');
    setIsLoggedIn(false);
    router.push('/login');
  };

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token;

    if (token) {
      try {
        jwt.verify(token, secretKey);
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
