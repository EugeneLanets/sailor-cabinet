'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { User, RegisterFormData } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  register: (userData: RegisterFormData) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser) as User;
          setUser(parsedUser);
        } catch (error) {
          console.error('Failed to parse user from localStorage:', error);
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    }
  }, []);

  const login = (userData: User): void => {
    setUser(userData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(userData));
    }

    if (userData.role === 'hr') {
      router.push('/cabinet/hr');
    } else {
      router.push('/cabinet/sailor');
    }
  };

  const logout = (): void => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
    router.push('/');
  };

  const register = (userData: RegisterFormData): void => {
    // Имитация регистрации
    alert('Регистрация успешна! На вашу почту отправлено письмо с подтверждением.');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
