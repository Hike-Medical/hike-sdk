'use client';

import { backendApi, Constants } from '@hike/sdk';
import { useNetwork as useMantineNetwork } from '@mantine/hooks';
import { NetworkState } from 'contexts/NetworkProvider';
import { useEffect, useState } from 'react';

export const useNetwork = () => {
  const { effectiveType, online } = useMantineNetwork();
  const [speed, setSpeed] = useState<NetworkState['speed']>('unknown');

  useEffect(() => {
    // Use mantine speed if browser supported
    if (effectiveType) {
      if (['slow-2g', '2g', '3g'].includes(effectiveType)) {
        setSpeed('slow');
      } else {
        setSpeed('fast');
      }
      return;
    }

    // Fallback to measuring speed via backend
    const measureSpeed = async () => {
      const startTime = performance.now();
      const baseUrl = backendApi.defaults.baseURL;

      if (!baseUrl) {
        return;
      }

      try {
        const response = await fetch(`${baseUrl}/health/speed`, { cache: 'no-store' });

        if (!response.ok) {
          return;
        }

        // Fully download the payload
        await response.arrayBuffer();

        // Calculate and measure speed
        const duration = performance.now() - startTime;
        const speedMbps = (Constants.NETWORK_SPEED_FILE_SIZE_KB * 8) / (duration / 1000) / 1024; // Mbps

        setSpeed(speedMbps < Constants.NETWORK_SPEED_MIN_MBPS ? 'slow' : 'fast');
      } catch {
        // Silently fail
      }
    };

    measureSpeed();
  }, [effectiveType]);

  return { speed, online };
};
