'use client';

import { useEffect } from 'react';
import { PinInput, Paper, Text, Stack, Button, Center, Image } from '@mantine/core';
import { useSetupTwoFa, useVerifyTwoFa } from '@hike/ui';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { toErrorMessage } from '@hike/sdk';

export const TwoFaSetup = () => {
  const form = useForm({ initialValues: { code: '' } });
  const { mutate: setupTwoFa, data, isSuccess } = useSetupTwoFa();
  const { mutate: verifyTwoFa, isPending } = useVerifyTwoFa({
    onError: (error) =>
      showNotification({ title: 'Error', message: toErrorMessage(error) })
  });

  useEffect(() => {
    setupTwoFa();
  }, [setupTwoFa]);

  const handleSubmit = (values: { code: string }) => {
    verifyTwoFa({ code: values.code });
  };

  return (
    <Center p="xl">
      <Paper radius="md" p="xl" miw={300} maw={400} withBorder>
        <Stack>
          <Text fw={500}>Set up Two-Factor Authentication</Text>
          {data && (
            <>
              <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
                  data.otpauthUrl
                )}`}
                alt="QR Code"
                width={200}
                height={200}
                mx="auto"
              />
              <Text c="dimmed" ta="center">
                Secret: {data.secret}
              </Text>
            </>
          )}
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
              <Button type="submit" loading={isPending} disabled={!isSuccess}>
                Verify
              </Button>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Center>
  );
};
