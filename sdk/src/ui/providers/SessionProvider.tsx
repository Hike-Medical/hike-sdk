'use client';

import { refreshToken } from '@hike/services';
import type { AuthStatus, AuthUser } from '@hike/types';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

export interface SessionState {
  user: AuthUser | null;
  status: AuthStatus;
  update: () => Promise<void>;
}

export const SessionContext = createContext<SessionState>(undefined as never);

// TODO: Implement token refresh at strategic times
export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>('LOADING');

  const update = async () => {
    try {
      setStatus('LOADING');
      const value = await refreshToken();
      setUser(value.sessionUser);
      setStatus(value ? 'AUTHENTICATED' : 'UNAUTHENTICATED');
    } catch (error) {
      setUser(null);
      setStatus('UNAUTHENTICATED');
    }
  };

  useEffect(() => {
    update();
  }, []);

  return <SessionContext.Provider value={{ user, status, update }}>{children}</SessionContext.Provider>;
};

export const useSession = () => useContext(SessionContext);
