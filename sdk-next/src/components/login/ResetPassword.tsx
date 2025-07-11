'use client';

import { toErrorMessage, validatePassword } from '@hike/sdk';
import { useResetPassword } from '@hike/ui';
import { Button, Center, Paper, PasswordInput, Stack, Text } from '@mantine/core';
import { matchesField, useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import { useTransitionRouter } from 'next-view-transitions';
import { use, useEffect, useState } from 'react';
import { SubmitButton } from '../SubmitButton';
import { PasswordCriteria } from './PasswordCriteria';
import { TokenInvalid } from './TokenInvalid';

export interface ResetPasswordProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token: string }>;
}

export const ResetPassword = ({ params, searchParams }: ResetPasswordProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const router = useTransitionRouter();
  const { slug } = use(params);
  const { token } = use(searchParams);
  const slugPath = slug ? `/${slug}` : '';
  const tShared = useTranslations('shared');
  const t = useTranslations('shared.login.resetPassword');

  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validate: {
      password: validatePassword,
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
                placeholder={tShared('fields.newPasswordPlaceholder')}
                type="password"
                autoComplete="new-password"
                required
              />
              <PasswordInput
                {...form.getInputProps('confirmPassword')}
                label={tShared('fields.confirmPassword')}
                placeholder={tShared('fields.confirmPasswordPlaceholder')}
                type="password"
                autoComplete="new-password"
                required
              />
              <PasswordCriteria form={form} />
              <SubmitButton label={t('actionButton')} loading={isResetPasswordLoading || isVerifyTokenLoading} />
            </Stack>
          </form>
        )}
      </Paper>
    </Center>
  );
};
