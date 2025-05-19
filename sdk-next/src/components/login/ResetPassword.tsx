'use client';

import { toErrorMessage } from '@hike/sdk';
import { useResetPassword } from '@hike/ui';
import { Button, Center, Paper, PasswordInput, Stack, Text } from '@mantine/core';
import { isNotEmpty, matchesField, useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import { useTransitionRouter } from 'next-view-transitions';
import { use, useEffect, useState } from 'react';
import { SubmitButton } from '../SubmitButton';
import { TokenInvalid } from './TokenInvalid';

export interface ResetPasswordProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token: string }>;
}

export const ResetPassword = ({ params: paramsAsync, searchParams: searchParamsAsync }: ResetPasswordProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const router = useTransitionRouter();
  const params = use(paramsAsync);
  const searchParams = use(searchParamsAsync);
  const { token } = searchParams;
  const { slug } = params;
  const slugPath = slug ? `/${slug}` : '';
  const tShared = useTranslations('shared');
  const t = useTranslations('login.resetPassword');

  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validate: {
      password: isNotEmpty(tShared('fields.passwordRequired')),
      confirmPassword: matchesField('password', tShared('fields.passwordMismatch'))
    }
  });

  const { mutate: resetPassword, isPending: isResetPasswordLoading } = useResetPassword({
    onSuccess: () => setSubmitted(true),
    onError: (error) => {
      const message = toErrorMessage(error, t('sentError'));
      showNotification({ title: tShared('error.title'), message, color: 'red' });
    }
  });

  const { mutate: verifyToken, isPending: isVerifyTokenLoading } = useResetPassword({
    onSuccess: () => setTokenValid(true),
    onError: () => setTokenValid(false)
  });

  const handleSubmit = async (values: typeof form.values) => {
    if (!token) {
      showNotification({
        title: tShared('error.title'),
        message: t('tokenRequired'),
        color: 'red'
      });
      return;
    }

    resetPassword({ token, password: values.password });
  };

  // Check if token is valid on first load
  useEffect(() => {
    if (!token) {
      return;
    }

    verifyToken({ token });
  }, [token, verifyToken]);

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
            <Text ta="center">{t('successDescription')}</Text>
            <Text ta="center" size="sm" c="dimmed">
              {t('sentGoToLogin')}
            </Text>
            <Button onClick={() => router.push(`${slugPath}/login`)} radius="md">
              {t('sentActionButton')}
            </Button>
          </Stack>
        ) : (
          <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
            <Stack>
              <PasswordInput
                {...form.getInputProps('password')}
                label={tShared('fields.newPassword')}
                type="password"
                placeholder={tShared('fields.newPasswordPlaceholder')}
                autoComplete="new-password"
                required
              />
              <PasswordInput
                {...form.getInputProps('confirmPassword')}
                label={tShared('fields.confirmPassword')}
                type="password"
                placeholder={tShared('fields.confirmPasswordPlaceholder')}
                autoComplete="new-password"
                required
              />
              <SubmitButton label={t('actionButton')} loading={isResetPasswordLoading || isVerifyTokenLoading} />
            </Stack>
          </form>
        )}
      </Paper>
    </Center>
  );
};
