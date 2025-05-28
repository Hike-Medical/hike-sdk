import { backendApi, currentUrl } from '@hike/sdk';
import { Button } from '@mantine/core';
import { IconBrandGoogle } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface GoogleLoginButtonParams {
  company: {
    id: string;
    slug: string;
  };
}

export const GoogleLoginButton = ({ company }: GoogleLoginButtonParams) => {
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get('redirect');
  const [signInUrl, setSignInUrl] = useState('');

  useEffect(() => {
    const url = currentUrl();

    if (!url) {
      return;
    }

    const redirectUrl = redirectParam || `${url.protocol}//${url.host}/${company.slug}`;
    setSignInUrl(
      `${backendApi.getUri()}/auth/google?redirect=${encodeURIComponent(redirectUrl)}&company=${company.id}`
    );
  }, [company, redirectParam]);

  return (
    <Button component="a" href={signInUrl} leftSection={<IconBrandGoogle />} variant="default" radius="xl">
      Google
    </Button>
  );
};
