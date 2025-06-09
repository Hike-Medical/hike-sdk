'use client';

import { Checkbox, Stack, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { useTranslations } from 'next-intl';

interface PasswordCriteriaProps {
  form: UseFormReturnType<{ password: string; confirmPassword: string }>;
}

export const PasswordCriteria = ({ form }: PasswordCriteriaProps) => {
  const t = useTranslations('shared.login.resetPassword');

  return (
    <Stack pl="sm" pr="xl">
      <Text fs="italic" c="hike-dimmed.8">
        {t('criteria.description')}
      </Text>
      <Stack gap="md" fs="italic">
        <Checkbox
          label={t('criteria.length')}
          checked={form.values.password.length >= 8}
          size="xs"
          radius="xl"
          readOnly
        />
        <Checkbox
          label={t('criteria.number')}
          checked={/\d/.test(form.values.password)}
          size="xs"
          radius="xl"
          readOnly
        />
        <Checkbox
          label={t('criteria.special')}
          checked={/[^A-Za-z0-9]/.test(form.values.password)}
          size="xs"
          radius="xl"
          readOnly
        />
      </Stack>
    </Stack>
  );
};
