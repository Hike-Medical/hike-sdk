import { backendApi, currentUrl } from '@hike/sdk';
import { useEffect, useState } from 'react';

export interface UseGoogleLoginUrlParams {
  companyId: string;
  companySlug: string;
  redirectParam?: string | null;
}

/**
 * Headless hook for generating Google OAuth login URL
 */
export const useGoogleLoginUrl = ({ companyId, companySlug, redirectParam }: UseGoogleLoginUrlParams): string => {
  const [signInUrl, setSignInUrl] = useState('');

  useEffect(() => {
    const url = currentUrl();

    if (!url) {
      return;
    }

    const redirectUrl = redirectParam || `${url.protocol}//${url.host}/${companySlug}`;
    setSignInUrl(`${backendApi.getUri()}/auth/google?redirect=${encodeURIComponent(redirectUrl)}&company=${companyId}`);
  }, [companyId, companySlug, redirectParam]);

  return signInUrl;
};
