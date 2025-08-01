import { logout as backendLogout, configureAuthorization, configureRefreshToken, refreshToken } from '@hike/services';
import type { AuthSession, AuthStatus, AuthUser, Tokens } from '@hike/types';
import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from 'react';

interface SessionState {
  user: AuthUser | null;
  status: AuthStatus;
  accessToken: string | null;
  update: (newTokens?: Tokens | null, hideLoading?: boolean) => Promise<AuthSession | null>;
  logout: () => Promise<void>;
}

interface SessionProviderProps {
  children: ReactNode;
  authTokens: Tokens | null;
  setAuthSession: (session: AuthSession) => void;
}

export const MobileSessionContext = createContext<SessionState>(undefined as never);

export const MobileSessionProvider = ({ children, authTokens, setAuthSession }: SessionProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>('LOADING');
  const [tokens, setTokens] = useState<Tokens | null>(() => authTokens);

  const update = useCallback(
    async (newTokens?: Tokens | null, hideLoading?: boolean): Promise<AuthSession | null> => {
      try {
        if (!hideLoading) setStatus('LOADING');
        const latest = newTokens ?? tokens ?? null;
        const authSession = await refreshToken(latest?.refreshToken, true);
        setAuthSession(authSession);
        configureAuthorization(authSession.tokens.accessToken);
        setUser(authSession.user);
        setStatus(authSession ? 'AUTHENTICATED' : 'UNAUTHENTICATED');
        setTokens(authSession.tokens);
        return authSession;
      } catch {
        await logout();
        return null;
      }
    },
    [setAuthSession, tokens]
  );

  const logout = useCallback(async () => {
    configureAuthorization(null);
    setUser(null);
    setTokens(null);
    setStatus('UNAUTHENTICATED');
    await backendLogout();
  }, []);

  useEffect(() => {
    if (!authTokens) return;

    // Keep the auth tokens in sync
    setTokens(authTokens);

    /**
     * Configure the refresh token interceptor. This is used to
     * refresh the token and retry the request on 401 error.
     */
    configureRefreshToken(authTokens, (session) => {
      setAuthSession(session);
      setTokens(session.tokens);
    });
  }, [authTokens, setAuthSession]);

  const contextValue: SessionState = useMemo(
    () => ({
      user,
      status,
      accessToken: tokens?.accessToken ?? null,
      update,
      logout
    }),
    [user, status, tokens, update, logout]
  );

  return <MobileSessionContext value={contextValue}>{children}</MobileSessionContext>;
};
