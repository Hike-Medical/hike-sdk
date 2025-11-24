'use client';

import { usePasswordCriteria } from '@hike/sdk-next';
import { Checkbox, Stack, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { useTranslations } from 'next-intl';

interface PasswordCriteriaProps {
  form: UseFormReturnType<{ password: string; confirmPassword: string }>;
}

export const PasswordCriteria = ({ form }: PasswordCriteriaProps) => {
  const t = useTranslations('shared.login.resetPassword');
  const { hasMinLength, hasNumber, hasSpecialChar } = usePasswordCriteria({ password: form.values.password });

  return (
    <Stack pl="sm" pr="xl">
      <Text fs="italic" c="hike-dimmed.8">
        {t('criteria.description')}
      </Text>
      <Stack gap="md" fs="italic">
        <Checkbox label={t('criteria.length')} checked={hasMinLength} size="xs" radius="xl" readOnly />
        <Checkbox label={t('criteria.number')} checked={hasNumber} size="xs" radius="xl" readOnly />
        <Checkbox label={t('criteria.special')} checked={hasSpecialChar} size="xs" radius="xl" readOnly />
      </Stack>
    </Stack>
  );
};
