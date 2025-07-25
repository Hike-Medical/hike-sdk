'use client';

import { CompanyContext } from '@hike/ui';
import { Button, Stack, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useTransitionRouter } from 'next-view-transitions';
import { useSearchParams } from 'next/navigation';
import { use } from 'react';

export const TokenInvalid = () => {
  const company = use(CompanyContext);
  const router = useTransitionRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');
  const slugPath = company?.slug ? `/${company.slug}` : '';
  const t = useTranslations('shared.login.tokenInvalid');

  const handleSubmit = () => {
    const queryParams = new URLSearchParams();

    if (redirectUrl) {
      queryParams.set('redirect', redirectUrl);
    }

    router.push(`${slugPath}/login/?${queryParams.toString()}`);
  };

  return (
    <Stack align="center" gap="md">
      <Text ta="center" c="red">
        {t('title')}
      </Text>
      <Text ta="center" size="sm" c="dimmed">
        {t('description')}
      </Text>
      <Button onClick={handleSubmit} radius="md">
        {t('actionButton')}
      </Button>
    </Stack>
  );
};
