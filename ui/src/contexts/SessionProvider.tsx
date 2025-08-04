'use client';

import {
  addRequestInterceptor,
  logout as backendLogout,
  configureAuthorization,
  ejectRequestInterceptor,
  refreshToken
} from '@hike/services';
import type { AuthSession, AuthStatus, AuthUser } from '@hike/types';
import { ReactNode, createContext, useEffect, useMemo, useRef, useState } from 'react';

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
  autoRefresh?: boolean;
  noCookie?: boolean;
  children: ReactNode;
}

export const SessionProvider = ({ autoRefresh, noCookie, children }: SessionProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>('LOADING');
  const [tokens, setTokens] = useState<Tokens | null>(null);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const tokensRef = useRef<Tokens | null>(null);
  const expiresAtRef = useRef<Date | null>(null);

  const decodeJwtExpiry = (token: string): Date | null => {
    try {
      const [, payload] = token.split('.');

      if (!payload) {
        return null;
      }

      const decoded = JSON.parse(atob(payload));
      return decoded.exp ? new Date(decoded.exp * 1000) : null;
    } catch {
      return null;
    }
  };

  const update = async (newTokens?: Tokens | null, silent = false): Promise<AuthSession | null> => {
    try {
      if (!silent) {
        setStatus('LOADING');
      }

      const latest = newTokens ?? tokens ?? null;
      const value = await refreshToken(latest?.refreshToken, noCookie);
      configureAuthorization(noCookie ? value.tokens.accessToken : null);
      setExpiresAt(decodeJwtExpiry(value.tokens.accessToken));
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

  const contextValue = useMemo(
    () => ({
      user,
      status,
      accessToken: tokens?.accessToken ?? null,
      update,
      logout
    }),
    [user, status, tokens?.accessToken]
  );

  // Attach interceptor to auto refresh token if enabled
  useEffect(() => {
    if (!autoRefresh) {
      return () => {};
    }

    const id = addRequestInterceptor(async (config) => {
      // Skip if refresh request to avoid infinite loop
      if (config.url?.includes('auth/refresh')) {
        return config;
      }

      const currentTokens = tokensRef.current;
      const expiry = expiresAtRef.current;
      const isExpiring = !!currentTokens && !!expiry && Date.now() >= expiry.getTime() - 60_000;

      if (isExpiring) {
        await update(currentTokens, true);
      }

      return config;
    });

    return () => ejectRequestInterceptor(id);
  }, [autoRefresh]);

  // References to prevent re-registering interceptor
  useEffect(() => {
    tokensRef.current = tokens;
    expiresAtRef.current = expiresAt;
  }, [tokens, expiresAt]);

  // Tokens auto loaded from cookie, otherwise caller responsible for executing
  // update after restoring token from other source, i.e. keychain
  useEffect(() => {
    if (noCookie !== true) {
      update();
    }
  }, []);

  return <SessionContext value={contextValue}>{children}</SessionContext>;
};

export const SessionContext = createContext<SessionState>(undefined as never);
