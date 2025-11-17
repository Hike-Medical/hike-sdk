'use client';

import { CompanyContext } from '@hike/ui';
import { Button, Stack, Text, Title } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
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
    <Stack align="center" gap="xl">
      <IconAlertTriangle size={80} stroke={1.5} color="var(--mantine-color-red-6)" />
      <Title ta="center" order={1}>
        {t('title')}
      </Title>
      <Text c="dimmed" size="lg" ta="center" maw={400}>
        {t('description')}
      </Text>
      <Button onClick={handleSubmit} size="sm">
        {t('actionButton')}
      </Button>
    </Stack>
  );
};
