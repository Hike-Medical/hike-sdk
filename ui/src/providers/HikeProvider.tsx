'use client';

import { configureBackendApi } from '@hike/services';
import type { HikeConfig } from '@hike/types';
import { ReactNode } from 'react';
import { SessionProvider } from './SessionProvider';

interface HikeProviderProps {
  config: HikeConfig;
  children: ReactNode;
}

export const HikeProvider = ({ config, children }: HikeProviderProps) => {
  configureBackendApi(config);
  return <SessionProvider>{children}</SessionProvider>;
};
