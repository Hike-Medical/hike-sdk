'use client';

import { Center, Paper, Stack, Text, Button, PinInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { toErrorMessage } from '@hike/sdk';
import { useVerifyTwoFa } from '@hike/ui';

export const TwoFaVerify = () => {
  const form = useForm({ initialValues: { code: '' } });
  const { mutate: verifyTwoFa, isPending } = useVerifyTwoFa({
    onError: (error) =>
      showNotification({ title: 'Error', message: toErrorMessage(error) })
  });

  const handleSubmit = (values: { code: string }) => {
    verifyTwoFa({ code: values.code });
  };

  return (
    <Center p="xl">
      <Paper radius="md" p="xl" miw={300} maw={400} withBorder>
        <Text size="lg" fw={500} mb="md">
          Two-Factor Verification
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
          <Stack>
            <PinInput
              {...form.getInputProps('code')}
              onChange={(value) => form.setFieldValue('code', value)}
              length={6}
              inputMode="numeric"
              radius="md"
              aria-label="Authenticator code"
            />
            <Button type="submit" loading={isPending}>
              Verify
            </Button>
          </Stack>
        </form>
      </Paper>
    </Center>
  );
};
