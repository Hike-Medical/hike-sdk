'use client';

import { useSetupTwoFa, useVerifyTwoFa } from '@hike/ui';
import { Box, Center, Container, Image, Loader, Paper, PinInput, Space, Stack, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import QRCode from 'qrcode';
import { useEffect, useRef, useState } from 'react';
import { CopyButton } from '../../components/CopyButton';
import { SubmitButton } from '../../components/SubmitButton';

export const TwoFaSetup = () => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [secret, setSecret] = useState('');
  const [error, setError] = useState<string | null>(null);
  const hasInitialized = useRef(false);

  const form = useForm({
    initialValues: { code: '' },
    onValuesChange: () => setError(null)
  });

  const { mutate: setupTwoFa, isSuccess: isSetupSuccess } = useSetupTwoFa({
    onSuccess: (data) => {
      QRCode.toDataURL(data.otpauthUrl, { width: 400, margin: 0 })
        .then((dataUrl) => setQrCodeDataUrl(dataUrl))
        .catch((err) =>
          showNotification({ title: 'Error', message: `Failed to generate QR code: ${err}`, color: 'red' })
        );

      setSecret(data.secret.toString());
    },
    onError: (err) => setError(err.message)
  });

  const { mutate: verifyTwoFa, isPending: isVerifyLoading } = useVerifyTwoFa({
    onSuccess: () => showNotification({ title: 'Success', message: 'Two-Factor Authentication setup successful' }),
    onError: (err) => setError(err.message)
  });

  useEffect(() => {
    if (!hasInitialized.current) {
      setupTwoFa();
      hasInitialized.current = true;
    }
  }, [setupTwoFa]);

  const handleSubmit = (values: { code: string }) => {
    setError(null);
    verifyTwoFa({ code: values.code });
  };

  return (
    <Box p={0}>
      <Center w="100%" h="80dvh">
        <Container size={'xs'} w={420}>
          <Title order={4} component="h1" fw={700} ta="center">
            Set up Two-Factor Authentication
          </Title>
          <Space my="lg" />
          <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
            <Paper mt="lg" shadow="md" radius="md" p="xl" withBorder>
              <Stack>
                {qrCodeDataUrl && secret ? (
                  <>
                    <Stack w="100%" h="100%">
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
                  <Center p="xl">
                    <Loader size="lg" />
                  </Center>
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
                <SubmitButton
                  label="Verify"
                  loading={isVerifyLoading}
                  disabled={!isSetupSuccess || form.values.code.length < 6}
                />
              </Stack>
            </Paper>
          </form>
        </Container>
      </Center>
    </Box>
  );
};
