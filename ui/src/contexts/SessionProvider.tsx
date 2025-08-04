'use client';

import { logout as backendLogout, configureAuthorization, refreshToken } from '@hike/services';
import type { AuthSession, AuthStatus, AuthUser } from '@hike/types';
import { ReactNode, createContext, useEffect, useState } from 'react';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface SessionState {
  user: AuthUser | null;
  status: AuthStatus;
  accessToken: string | null;
  update: (newTokens?: Tokens | null) => Promise<AuthSession | null>;
  logout: () => Promise<void>;
}

interface SessionProviderProps {
  noCookie?: boolean;
  children: ReactNode;
}

export const SessionProvider = ({ noCookie, children }: SessionProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>('LOADING');
  const [tokens, setTokens] = useState<Tokens | null>(null);

  const update = async (newTokens?: Tokens | null): Promise<AuthSession | null> => {
    try {
      setStatus('LOADING');
      const latest = newTokens ?? tokens ?? null;
      const value = await refreshToken(latest?.refreshToken, noCookie);
      configureAuthorization(noCookie ? value.tokens.accessToken : null);
      setUser(value.user);
      setStatus(value ? 'AUTHENTICATED' : 'UNAUTHENTICATED');
      setTokens(value.tokens);
      return value;
    } catch {
      await logout();
      return null;
    }
  };

  const logout = async () => {
    configureAuthorization(null);
    setUser(null);
    setStatus('UNAUTHENTICATED');
    setTokens(null);
    await backendLogout();
  };

  // Tokens auto loaded from cookie, otherwise caller responsible for executing
  // update after restoring token from other source, i.e. keychain
  useEffect(() => {
    if (noCookie !== true) {
      update();
    }
  }, []);

  return (
    <SessionContext value={{ user, status, accessToken: tokens?.accessToken ?? null, update, logout }}>
      {children}
    </SessionContext>
  );
};

export const SessionContext = createContext<SessionState>(undefined as never);
