'use client';

import { toErrorMessage, validateEmail, validatePhone } from '@hike/sdk';
import { CompanyContext, SessionContext, useAccountRecovery, useSignInWithToken } from '@hike/ui';
import { Button, Center, Paper, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import { useTransitionRouter } from 'next-view-transitions';
import { use, useEffect, useState } from 'react';
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
  const [submitted, setSubmitted] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const { update, status } = use(SessionContext);
  const company = use(CompanyContext);
  const router = useTransitionRouter();
  const { slug } = use(params);
  const { token, contact, redirect: redirectUrl } = use(searchParams);
  const slugPath = slug ? `/${slug}` : '';
  const tShared = useTranslations('shared');
  const t = useTranslations('login.magicLink');

  const form = useForm({
    initialValues: {
      emailOrPhone: contact ?? ''
    },
    validate: {
      emailOrPhone: (value) =>
        validateEmail(value) || validatePhone(value) ? null : tShared('fields.emailOrPhoneInvalid')
    }
  });

  const { mutate: accountRecovery, isPending: isAccountRecoveryLoading } = useAccountRecovery({
    onSuccess: () => setSubmitted(true),
    onError: (error) => {
      const message = toErrorMessage(error, t('sentError'));
      showNotification({ title: tShared('error.title'), message, color: 'red' });
    }
  });

  const { mutate: signInWithToken, isPending: isSignInWithTokenLoading } = useSignInWithToken({
    onSuccess: async () => {
      await update();
      setTokenValid(true);
      router.replace(redirectUrl || `${slugPath}/`);
    },
    onError: () => setTokenValid(false)
  });

  const handleSubmit = async (values: typeof form.values) => {
    accountRecovery({
      params: {
        contact: values.emailOrPhone,
        contactType: values.emailOrPhone.includes('@') ? 'EMAIL' : 'SMS',
        type: 'INVITATION',
        redirectUrl: redirectUrl ?? undefined
      },
      companyId: company?.id
    });
  };

  // Check if token is valid on first load
  useEffect(() => {
    if (!token || !contact || status === 'LOADING') {
      return;
    }

    if (status === 'AUTHENTICATED') {
      router.replace(redirectUrl || `${slugPath}/`);
      return;
    }

    signInWithToken({ contact, token });
  }, [contact, redirectUrl, router, signInWithToken, slugPath, status, token]);

  return (
    <Center p="xl">
      <Paper radius="md" p="xl" miw={300} maw={400} withBorder>
        <Text size="lg" fw={500}>
          {t('title')}
        </Text>
        {!tokenValid ? (
          <TokenInvalid />
        ) : submitted ? (
          <Stack align="center" gap="md">
            <Text ta="center">{t('sentDescription')}</Text>
            <Text ta="center" size="sm" c="dimmed">
              {t('sentGoToLogin')}
            </Text>
          </Stack>
        ) : !token ? (
          <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
            <Stack>
              <TextInput
                {...form.getInputProps('emailOrPhone')}
                label={tShared('fields.emailOrPhone')}
                autoCapitalize="none"
                autoCorrect="off"
                required
              />
              <Button type="submit" radius="md" loading={isAccountRecoveryLoading || isSignInWithTokenLoading}>
                {t('actionButton')}
              </Button>
            </Stack>
          </form>
        ) : (
          <Text ta="center" size="sm" c="dimmed">
            {t('sentLoading')}
          </Text>
        )}
      </Paper>
    </Center>
  );
};
