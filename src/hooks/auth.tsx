import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface SignInCredentials {
  email: string;
  senha: string;
}

interface AuthContextData {
  user: object;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
}

interface AuthState {
  token: string;
  user: object;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@HubLocal:token');
    const user = localStorage.getItem('@HubLocal:user');

    if (token && user) return { token, user: JSON.parse(user) };

    return {} as AuthState;
  });
  const signIn = useCallback(async ({ email, senha }) => {
    const response = await api.post('/sessions', {
      email,
      senha,
    });

    const { token, user } = response.data;

    localStorage.setItem('@HubLocal:token', token);
    localStorage.setItem('@HubLocal:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@HubLocal:token');
    localStorage.removeItem('@HubLocal:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
