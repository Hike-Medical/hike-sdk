'use client';

import { toErrorMessage, validateEmail } from '@hike/sdk';
import { useAccountRecovery } from '@hike/sdk-next';
import { Button, Center, Paper, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useTransitionRouter } from 'next-view-transitions';
import { use } from 'react';
import { SubmitButton } from '../SubmitButton';

export interface AccountRecoveryProps {
  params: Promise<{ slug: string }>;
}

export const AccountRecovery = ({ params }: AccountRecoveryProps) => {
  const router = useTransitionRouter();
  const { slug } = use(params);
  const slugPath = slug ? `/${slug}` : '';
  const tShared = useTranslations('shared');
  const t = useTranslations('shared.login.accountRecovery');

  const { handleSubmit: handleRecoverySubmit, isPending, submitted } = useAccountRecovery({
    onError: (error) => {
      const message = toErrorMessage(error, t('sentError'));
      showNotification({ title: tShared('error.title'), message, color: 'red' });
    }
  });

  const form = useForm({
    initialValues: {
      email: ''
    },
    validate: {
      email: (value) => (validateEmail(value) ? null : tShared('fields.emailInvalid'))
    }
  });

  const handleSubmit = async (values: typeof form.values) => {
    handleRecoverySubmit(values);
  };

  return (
    <Center p="xl">
      <Paper radius="md" p="xl" miw={300} maw={400} withBorder>
        <Text size="lg" fw={500}>
          {t('title')}
        </Text>
        {submitted ? (
          <Stack align="center" gap="md">
            <IconCheck size={48} color="green" />
            <Text ta="center">{t('sentDescription')}</Text>
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
              <TextInput
                {...form.getInputProps('email')}
                label={tShared('fields.email')}
                type="email"
                placeholder="hello@insoles.ai"
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                required
              />
              <SubmitButton label={t('actionButton')} loading={isPending} />
            </Stack>
          </form>
        )}
      </Paper>
    </Center>
  );
};
