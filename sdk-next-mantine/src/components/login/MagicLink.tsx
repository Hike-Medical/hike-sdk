'use client';

import { toErrorMessage, validateEmail, validatePhone } from '@hike/sdk';
import { useMagicLink } from '@hike/sdk-next';
import { CompanyContext, SessionContext } from '@hike/ui';
import { Button, Container, Loader, Stack, Text, TextInput, Title } from '@mantine/core';
import { IconArrowRight, IconCheck } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import { useTransitionRouter } from 'next-view-transitions';
import { use } from 'react';
import { TokenInvalid } from './TokenInvalid';

export interface MagicLinkProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    token: string;
    contact: string;
    redirect: string;
  }>;
}

export const MagicLink = ({ params, searchParams }: MagicLinkProps) => {
  const { update, status } = use(SessionContext);
  const company = use(CompanyContext);
  const router = useTransitionRouter();
  const { slug } = use(params);
  const { token, contact, redirect: redirectUrl } = use(searchParams);
  const slugPath = slug ? `/${slug}` : '';
  const tShared = useTranslations('shared');
  const t = useTranslations('shared.login.magicLink');

  const { handleSubmit: handleMagicLinkSubmit, isPending, submitted, tokenValid } = useMagicLink({
    token,
    contact,
    companyId: company?.id,
    redirectUrl,
    isAuthenticated: status === 'AUTHENTICATED',
    onSuccess: async () => {
      await update();
      router.replace(redirectUrl || `${slugPath}/`);
    },
    onError: (error) => {
      const message = toErrorMessage(error, t('sentError'));
      showNotification({ title: tShared('error.title'), message, color: 'red' });
    }
  });

  const form = useForm({
    initialValues: {
      emailOrPhone: contact ?? ''
    },
    validate: {
      emailOrPhone: (value) => (validateEmail(value) || validatePhone(value) ? null : tShared('fields.emailOrPhoneInvalid'))
    }
  });

  const handleSubmit = async (values: typeof form.values) => {
    handleMagicLinkSubmit(values);
  };

  return (
    <Container size={460} my={100}>
      {!tokenValid ? (
        <TokenInvalid />
      ) : submitted ? (
        <Stack align="center" gap="xl">
          <IconCheck size={80} stroke={1.5} color="var(--mantine-color-green-6)" />
          <Title ta="center" order={1}>
            {t('sentDescription')}
          </Title>
          <Text c="dimmed" size="lg" ta="center">
            {t('sentGoToLogin')}
          </Text>
          <Button
            variant="subtle"
            size="sm"
            rightSection={<IconArrowRight size={18} />}
            onClick={() => router.push(`${slugPath}/login${redirectUrl ? `?redirect=${redirectUrl}` : ''}`)}
          >
            Go to login
          </Button>
        </Stack>
      ) : !token ? (
        <Stack align="center" gap="xl">
          <Title ta="center" order={1}>
            {t('title')}
          </Title>
          <form onSubmit={form.onSubmit(handleSubmit)} noValidate style={{ width: '100%', maxWidth: '400px' }}>
            <Stack gap="md">
              <TextInput
                {...form.getInputProps('emailOrPhone')}
                placeholder={tShared('fields.emailOrPhone')}
                autoCapitalize="none"
                autoCorrect="off"
                size="md"
                required
              />
              <Button type="submit" size="md" fullWidth loading={isPending}>
                {t('actionButton')}
              </Button>
            </Stack>
          </form>
        </Stack>
      ) : (
        <Stack align="center" gap="xl">
          <Loader size="xl" />
          <Text c="dimmed" size="lg" ta="center">
            Logging you in...
          </Text>
        </Stack>
      )}
    </Container>
  );
};
