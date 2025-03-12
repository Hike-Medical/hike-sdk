'use client';

import { useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react';

export const useIsMobile = () => {
  const theme = useMantineTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia(`(max-width: ${theme.breakpoints.sm}), (hover: none) and (pointer: coarse)`);

    const updateIsMobile = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    updateIsMobile(mobileQuery);

    mobileQuery.addEventListener('change', updateIsMobile);

    return () => {
      mobileQuery.removeEventListener('change', updateIsMobile);
    };
  }, []);

  return isMobile;
};
