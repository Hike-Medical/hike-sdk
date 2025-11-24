'use client';

import { CompanyContext, SessionContext } from '@hike/ui';
import { hideNotification, showNotification } from '@mantine/notifications';
import { IconClock } from '@tabler/icons-react';
import { decodeJwt } from 'jose';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { use, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { logger } from '../../utils/logger';

const REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes
const CHECK_INTERVAL = 60 * 1000; // 1 minute

export const TokenRefresher = () => {
  const [warningShown, setWarningShown] = useState(false);
  const { accessToken, update, logout } = useContext(SessionContext);
  const company = use(CompanyContext);
  const router = useRouter();
  const lastActivityRef = useRef<number>(Date.now());
  const lastExpRef = useRef<number | null>(null);
  const slugPath = company?.slug ? `/${company.slug}` : '';
  const t = useTranslations('shared.login.tokenRefresher');

  const getTokenExpiry = useCallback((token: string | null): number | null => {
    if (!token) {
      return null;
    }

    try {
      const payload = decodeJwt(token);
      const exp = typeof payload.exp === 'number' ? payload.exp * 1000 : null;
      return exp;
    } catch (error) {
      logger.error('Failed to decode token', { error });
      return null;
    }
  }, []);

  const refreshIfNeeded = useCallback(async () => {
    const exp = lastExpRef.current;
    const now = Date.now();

    if (!exp) {
      return;
    }

    const isUserActive = now - lastActivityRef.current < REFRESH_THRESHOLD;
    const timeLeft = exp - now;

    if (!isUserActive && timeLeft <= 0) {
      await logout();
      const query = new URLSearchParams({ redirect: window.location.href });
      router.replace(`${slugPath}/login?${query}`);
      return;
    }

    if (timeLeft > REFRESH_THRESHOLD) {
      return;
    }

    if (isUserActive) {
      update().catch((error) => logger.error('Token refresh failed', { error }));
    } else if (!warningShown) {
      setWarningShown(true);
    }
  }, [logout, update, router, slugPath, warningShown]);

  // Listen for access token changes to update the expiry time
  useEffect(() => {
    lastExpRef.current = getTokenExpiry(accessToken);
    setWarningShown(false);
  }, [accessToken, getTokenExpiry]);

  // Listen for user activity to refresh the token
  useEffect(() => {
    const handleActivity = () => {
      lastActivityRef.current = Date.now();
      setWarningShown(false);
      refreshIfNeeded();
    };

    // Comprehensive event list to detect activity across all devices
    const events = [
      'touchstart', // Initial touch on mobile/tablet
      'touchmove', // Continuous touch interaction (scrolling, dragging)
      'touchend', // Touch completion
      'click', // Taps and clicks
      'mousemove', // Mouse movement on desktop
      'mousedown', // Mouse clicks
      'keydown', // Keyboard input
      'scroll', // Scrolling (backup for touch scrolling)
      'wheel' // Mouse wheel / trackpad scrolling
    ];

    events.forEach((event) =>
      window.addEventListener(event, handleActivity, {
        // Passive listeners improve scroll performance by not blocking browser's default behavior
        passive: true
      })
    );

    // Handle visibility changes when user returns to app after switching away
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        handleActivity();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const interval = setInterval(() => refreshIfNeeded(), CHECK_INTERVAL);

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleActivity));
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(interval);
    };
  }, [refreshIfNeeded]);

  // Show a warning notification if the session is expiring soon
  useEffect(() => {
    if (warningShown) {
      showNotification({
        id: 'session-warning',
        title: t('title'),
        message: t('message', { minutes: Math.round(REFRESH_THRESHOLD / 60_000) }),
        icon: <IconClock />,
        autoClose: false,
        color: 'orange'
      });
    } else {
      hideNotification('session-warning');
    }
  }, [warningShown, t]);

  return null;
};
