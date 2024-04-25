'use client';

import { findSession } from '@hike/services';
import type { AuthUser } from '@hike/types';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

export type Status = 'authenticated' | 'unauthenticated' | 'loading';

export interface SessionState {
  session: AuthUser | null;
  status: Status;
  update: () => Promise<void>;
}

const SessionContext = createContext<SessionState>(undefined as never);

// TODO: Implement token refresh at strategic times
export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<Status>('loading');

  const update = async () => {
    try {
      setStatus('loading');
      const value = await findSession();
      setSession(value);
      setStatus(value ? 'authenticated' : 'unauthenticated');
    } catch (error) {
      // TODO: Handle session error
      console.log('Session error', error);
      setStatus('unauthenticated');
    }
  };

  useEffect(() => {
    update();
  }, []);

  return <SessionContext.Provider value={{ session, status, update }}>{children}</SessionContext.Provider>;
};

export const useSession = () => useContext(SessionContext);
