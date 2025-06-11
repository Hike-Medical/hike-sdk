'use client';

import { toErrorMessage } from '@hike/sdk';
import { useSetupTwoFa, useVerifyTwoFa } from '@hike/ui';
import { Button, Center, Image, Paper, PinInput, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useEffect } from 'react';

export const TwoFaSetup = () => {
  const form = useForm({ initialValues: { code: '' } });

  const { mutate: setupTwoFa, data, isSuccess } = useSetupTwoFa();

  const { mutate: verifyTwoFa, isPending } = useVerifyTwoFa({
    onError: (error) => showNotification({ title: 'Error', message: toErrorMessage(error) })
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
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(data.otpauthUrl)}`}
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
                placeholder=""
                radius="md"
                mx="auto"
                my="lg"
                aria-label="Authenticator code"
                oneTimeCode
                autoFocus
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
