'use client';

import { validatePassword } from '@hike/sdk';
import { useUpdateUserPassword } from '@hike/ui';
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

  const form = useForm({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validate: {
      password: validatePassword,
      confirmPassword: (value, values) => (value === values.password ? null : 'Passwords do not match')
    }
  });

  const { mutate: updatePassword, isPending } = useUpdateUserPassword({
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

  return (
    <form onSubmit={form.onSubmit((values) => updatePassword({ password: values.password }))} noValidate>
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
