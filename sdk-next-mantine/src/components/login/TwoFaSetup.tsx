'use client';

import { useTwoFaSetup } from '@hike/sdk-next';
import { SessionContext } from '@hike/ui';
import { Box, Center, Image, Loader, PinInput, Stack, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { use } from 'react';
import { CopyButton } from '../../components/CopyButton';
import { SubmitButton } from '../../components/SubmitButton';

interface TwoFaSetupProps {
  onVerified?: () => Promise<void>;
}

export const TwoFaSetup = ({ onVerified }: TwoFaSetupProps) => {
  const { update } = use(SessionContext);

  const {
    handleSubmit: handleTwoFaSubmit,
    handleCodeChange,
    isPending,
    qrCodeDataUrl,
    secret,
    error,
    validateCodeField
  } = useTwoFaSetup({
    onVerified: async () => {
      showNotification({ title: 'Success', message: 'Two-Factor Authentication setup successful' });
      await update();
      await onVerified?.();
    },
    onError: (error) => {
      showNotification({ title: 'Error', message: error, color: 'red' });
    }
  });

  const form = useForm({
    initialValues: { code: '' },
    onValuesChange: handleCodeChange,
    validate: {
      code: (value) => validateCodeField(value)
    }
  });

  const handleSubmit = (values: { code: string }) => {
    handleTwoFaSubmit(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack>
        {qrCodeDataUrl && secret ? (
          <>
            <Stack h="100%" maw={300} mx="auto">
              <Image src={qrCodeDataUrl} alt="QR Code" />
            </Stack>
            <Stack gap="xs" align="center">
              <Text size="xs" c="dimmed">
                If you can&apos;t scan the QR code, enter this key manually:
              </Text>
              <Box>
                <CopyButton value={secret} ff="monospace" />
              </Box>
            </Stack>
          </>
        ) : (
          !error && (
            <Center p="xl">
              <Loader size="lg" />
            </Center>
          )
        )}
        <PinInput
          {...form.getInputProps('code')}
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
        {error && (
          <Text fz="sm" c="red" mx="auto">
            {error}
          </Text>
        )}
        <SubmitButton label="Enable" loading={isPending} disabled={!secret} />
      </Stack>
    </form>
  );
};
