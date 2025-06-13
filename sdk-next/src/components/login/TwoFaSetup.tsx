'use client';

import { SessionContext, useSetupTwoFa, useSignInWith2fa, useVerifyTwoFa } from '@hike/ui';
import { Box, Center, Image, Loader, PinInput, Stack, Text } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import QRCode from 'qrcode';
import { use, useEffect, useRef, useState } from 'react';
import { CopyButton } from '../../components/CopyButton';
import { SubmitButton } from '../../components/SubmitButton';

interface TwoFaSetupProps {
  onVerified?: () => Promise<void>;
}

export const TwoFaSetup = ({ onVerified }: TwoFaSetupProps) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [secret, setSecret] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { update } = use(SessionContext);
  const hasInitialized = useRef(false);

  const form = useForm({
    initialValues: { code: '' },
    onValuesChange: () => setError(null),
    validate: {
      code: hasLength(6, 'Code must be 6 digits')
    }
  });

  const { mutate: setupTwoFa } = useSetupTwoFa({
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
    onSuccess: () => signInWith2fa(form.values.code),
    onError: (err) => setError(err.message)
  });

  const { mutate: signInWith2fa, isPending: isSignInLoading } = useSignInWith2fa({
    onSuccess: async (data) => {
      showNotification({ title: 'Success', message: 'Two-Factor Authentication setup successful' });
      await update(data.tokens); // Refresh with verified session
      await onVerified?.();
    },
    onError: (err) => setError(err.message)
  });

  const handleSubmit = (values: { code: string }) => {
    setError(null);
    verifyTwoFa({ code: values.code, enable: true });
  };

  useEffect(() => {
    if (!hasInitialized.current) {
      setupTwoFa();
      hasInitialized.current = true;
    }
  }, [setupTwoFa]);

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
        <SubmitButton label="Enable" loading={isVerifyLoading || isSignInLoading} disabled={!secret} />
      </Stack>
    </form>
  );
};
