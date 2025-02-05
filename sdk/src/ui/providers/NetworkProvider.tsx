'use client';

import { configureNetworkSpeed } from '@hike/services';
import { ReactNode, useEffect } from 'react';
import { useNetwork } from '../../ui/hooks/useNetwork';

export const NetworkProvider = ({ children }: { children: ReactNode }) => {
  const { speed } = useNetwork();
  useEffect(() => configureNetworkSpeed(speed), [speed]);
  return children;
};
