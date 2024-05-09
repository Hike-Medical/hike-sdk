'use client';

import { configureServices } from '@hike/services';
import type { HikeConfig } from '@hike/types';
import { ReactNode } from 'react';

export const HikeProviderClient = ({ config, children }: { config: HikeConfig; children: ReactNode }) => {
  configureServices(config); // Client-side initialization
  return children;
};
