'use client';

import { configureFingerprint, marketingUtmParams } from '@hike/sdk';
import { SessionContext } from '@hike/ui';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import posthog from 'posthog-js'; // eslint-disable-line import/no-named-as-default
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { ReactNode, use, useEffect, useState } from 'react';
import { NetworkContext } from './NetworkProvider';

const PostHogPageView = dynamic(() => import('../components/PostHogPageView'), {
  ssr: false
});

interface PostHogProviderProps {
  postHogKey: string | undefined;
  postHogHost: string | undefined;
  children: ReactNode;
}

export const PostHogProvider = ({ postHogKey, postHogHost, children }: PostHogProviderProps) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { user } = use(SessionContext);
  const { speed } = use(NetworkContext);
  const params = useParams<{ patientId: string }>();

  useEffect(() => {
    if (!postHogKey || !postHogHost || isInitialized) {
      return;
    }

    posthog.init(postHogKey, {
      api_host: postHogHost,
      capture_pageview: false,
      disable_session_recording: true,
      capture_pageleave: true,
      disable_surveys: true,
      loaded: (instance) => {
        configureFingerprint(instance.get_distinct_id());
      },
      custom_campaign_params: [...marketingUtmParams]
    });

    setIsInitialized(true);
  }, [postHogKey, postHogHost, isInitialized]);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    posthog.identify(user?.id, {
      userId: user?.id,
      patientId: params.patientId || null,
      companies: JSON.stringify(user?.companies),
      networkSpeed: speed
    });
  }, [user, params.patientId, speed, isInitialized]);

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
};
