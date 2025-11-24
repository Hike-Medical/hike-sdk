import { useGoogleLoginUrl } from '@hike/sdk-next';
import { Button } from '@mantine/core';
import { IconBrandGoogle } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';

interface GoogleLoginButtonParams {
  company: {
    id: string;
    slug: string;
  };
}

export const GoogleLoginButton = ({ company }: GoogleLoginButtonParams) => {
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get('redirect');

  const signInUrl = useGoogleLoginUrl({
    companyId: company.id,
    companySlug: company.slug,
    redirectParam
  });

  return (
    <Button component="a" href={signInUrl} leftSection={<IconBrandGoogle />} variant="default" radius="xl">
      Google
    </Button>
  );
};
