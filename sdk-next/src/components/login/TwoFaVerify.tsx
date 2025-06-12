'use client';

import { useSignInWith2fa } from '@hike/ui';
import { Center, Paper, PinInput, Stack, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useTransitionRouter } from 'next-view-transitions';
import { useParams, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export const TwoFaVerify = () => {
  const [input2fa, setInput2fa] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useTransitionRouter();
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const slugPath = slug ? `/${slug}` : '';
  const redirectUrl = searchParams.get('redirect');

  const { mutate: signInWith2fa, isPending } = useSignInWith2fa({
    onSuccess: () => router.replace(redirectUrl || `${slugPath}/`),
    onError: (err) => {
      showNotification({ title: 'Error', message: err.message, color: 'red' });
      setError('Invalid code, please try again');
    }
  });

  return (
    <Center p="xl">
      <Paper radius="md" p="xl" miw={300} maw={400} withBorder>
        <Text size="lg" fw={500}>
          Two-Factor Authentication
        </Text>
        <Text size="sm" c="dimmed" ta="center">
          Enter the code from your authenticator app.
        </Text>
        <Stack ta="center" mt="lg">
          <PinInput
            value={input2fa ?? ''}
            onChange={(value) => {
              setError(null);
              setInput2fa(value);

              if (value.length === 6) {
                signInWith2fa(value);
              }
            }}
            length={6}
            inputMode="numeric"
            placeholder=""
            radius="md"
            aria-label="Authenticator code"
            oneTimeCode
            autoFocus
            error={!!error}
            disabled={isPending}
          />
          {error && (
            <Text fz="12" fw="bold" fs="italic" c="red" ta="center">
              {error}
            </Text>
          )}
        </Stack>
      </Paper>
    </Center>
  );
};
