import { configureServices } from '@hike/services';
import type { HikeConfig } from '@hike/types';
import { ReactNode } from 'react';
import { HikeProviderClient } from './HikeProviderClient';

export const HikeProvider = ({ config, children }: { config: HikeConfig; children: ReactNode }) => {
  const safeConfig = configureServices(config); // Server-side initialization
  return <HikeProviderClient config={safeConfig}>{children}</HikeProviderClient>;
};
