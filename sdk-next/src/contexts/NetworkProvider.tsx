'use client';

import { configureNetworkSpeed } from '@hike/sdk';
import { createContext, ReactNode, useEffect } from 'react';
import { useNetwork } from '../hooks/useNetwork';

export interface NetworkState {
  speed: 'slow' | 'fast' | 'unknown';
}

export const NetworkProvider = ({ children }: { children: ReactNode }) => {
  const { speed } = useNetwork();
  useEffect(() => configureNetworkSpeed(speed), [speed]);
  return <NetworkContext value={{ speed }}>{children}</NetworkContext>;
};

export const NetworkContext = createContext<NetworkState>(undefined as never);
