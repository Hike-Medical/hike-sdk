'use client';

import { configureServices } from '@hike/services';
import type { HikeConfig } from '@hike/types';
import { ReactNode } from 'react';

interface HikeProviderClientProps {
  config: Omit<HikeConfig, 'apiKey' | 'cookies'>;
  children: ReactNode;
}

export const HikeProviderClient = ({ config, children }: HikeProviderClientProps) => {
  configureServices(config); // Client-side initialization
  return children;
};
