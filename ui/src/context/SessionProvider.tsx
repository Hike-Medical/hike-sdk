'use client';

import { logout as backendLogout, configureAuthorization, refreshToken } from '@hike/services';
import type { AuthStatus, AuthUser } from '@hike/types';
import { ReactNode, createContext, useEffect, useState } from 'react';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface SessionState {
  user: AuthUser | null;
  status: AuthStatus;
  accessToken: string | null;
  update: (newTokens?: Tokens | null) => Promise<void>;
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

  const update = async (newTokens?: Tokens | null) => {
    try {
      setStatus('LOADING');
      const latest = newTokens ?? tokens ?? null;
      //TODO: Replace with proper exclude-cookie flag from Simplr
      const excludeCookie = !!disableAutoStart;
      const value = await refreshToken(latest?.refreshToken, excludeCookie);
      configureAuthorization(excludeCookie ? value.tokens.accessToken : null);
      setUser(value.user);
      setStatus(value ? 'AUTHENTICATED' : 'UNAUTHENTICATED');
      setTokens(value.tokens);
    } catch {
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

  return (
    <SessionContext value={{ user, status, accessToken: tokens?.accessToken ?? null, update, logout }}>
      {children}
    </SessionContext>
  );
};
