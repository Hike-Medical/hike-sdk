'use client';

import { logout as backendLogout, configureAuthorization, refreshToken } from '@hike/services';
import type { AuthStatus, AuthUser } from '@hike/types';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface SessionState {
  user: AuthUser | null;
  status: AuthStatus;
  update: (newTokens?: Tokens) => Promise<void>;
  logout: () => Promise<void>;
}

export const SessionContext = createContext<SessionState>(undefined as never);

export const SessionProvider = ({
  disableAutoStart,
  children
}: {
  disableAutoStart?: boolean;
  children: ReactNode;
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>('LOADING');
  const [tokens, setTokens] = useState<Tokens | null>(null);

  const update = async (newTokens?: Tokens) => {
    try {
      setStatus('LOADING');
      const latest = newTokens ?? tokens ?? null;
      const excludeCookie = !!latest;
      const value = await refreshToken(latest?.refreshToken, excludeCookie);
      configureAuthorization(excludeCookie ? value.accessToken : null);
      setUser(value.sessionUser);
      setStatus(value ? 'AUTHENTICATED' : 'UNAUTHENTICATED');
      setTokens(value);
    } catch (error) {
      await logout();
    }
  };

  const logout = async () => {
    configureAuthorization(null);
    setUser(null);
    setStatus('UNAUTHENTICATED');
    setTokens(null);
    await backendLogout();
  };

  useEffect(() => {
    if (disableAutoStart !== true) {
      update();
    }
  }, []);

  return <SessionContext.Provider value={{ user, status, update, logout }}>{children}</SessionContext.Provider>;
};

export const useSession = () => useContext(SessionContext);
