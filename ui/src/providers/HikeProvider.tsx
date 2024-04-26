'use client';

import { configureBackendApi } from '@hike/services';
import type { HikeConfig } from '@hike/types';
import { ReactNode } from 'react';

interface HikeProviderProps {
  config: HikeConfig;
  children: ReactNode;
}

export const HikeProvider = ({ config, children }: HikeProviderProps) => {
  configureBackendApi(config);
  return children;
};
