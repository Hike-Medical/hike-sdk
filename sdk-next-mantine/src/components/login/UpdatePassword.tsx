'use client';

import { validatePassword } from '@hike/sdk';
import { useUpdatePassword } from '@hike/sdk-next';
import { Button, PasswordInput, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import { PasswordCriteria } from './PasswordCriteria';

interface UpdatePasswordProps {
  onSuccess?: () => Promise<void>;
}

export const UpdatePassword = ({ onSuccess }: UpdatePasswordProps) => {
  const tShared = useTranslations('shared');

  const { handleSubmit: handlePasswordUpdate, isPending } = useUpdatePassword({
    onSuccess: async () => {
      notifications.show({
        title: 'Success!',
        message: 'Your password has been updated.',
        color: 'green'
      });

      form.reset();
      await onSuccess?.();
    },
    onError: (error) => notifications.show({ title: 'Failed to update password', message: error.message, color: 'red' })
  });

  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validate: {
      password: (value) => validatePassword(value),
      confirmPassword: (value) => (value === form.values.password ? null : tShared('fields.passwordMismatch'))
    }
  });

  return (
    <form onSubmit={form.onSubmit((values) => handlePasswordUpdate(values))} noValidate>
      <Stack>
        <PasswordInput
          {...form.getInputProps('password')}
          label={tShared('fields.newPassword')}
          placeholder={tShared('fields.newPasswordPlaceholder')}
          type="password"
          autoComplete="new-password"
          maw={500}
          required
        />
        <PasswordInput
          {...form.getInputProps('confirmPassword')}
          label={tShared('fields.confirmPassword')}
          placeholder={tShared('fields.confirmPasswordPlaceholder')}
          type="password"
          autoComplete="new-password"
          maw={500}
          required
        />
        <PasswordCriteria form={form} />
        <Button type="submit" variant="light" loading={isPending} w={{ base: '100%', sm: 200 }}>
          Update Password
        </Button>
      </Stack>
    </form>
  );
};
