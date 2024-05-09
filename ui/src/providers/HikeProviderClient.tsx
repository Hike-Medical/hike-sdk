'use client';

import { init as serviceInit } from '@hike/services';
import type { HikeConfig } from '@hike/types';
import { ReactNode } from 'react';

export const HikeProviderClient = ({ config, children }: { config: HikeConfig; children: ReactNode }) => {
  serviceInit(config); // Client-side initialization
  return children;
};
