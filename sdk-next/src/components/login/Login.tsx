'use client';

import { signIn, validateEmail, validatePassword } from '@hike/sdk';
import { SessionContext } from '@hike/ui';
import { Anchor, Box, Center, Container, Paper, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useRouter, useSearchParams } from 'next/navigation';
import { use } from 'react';
import { SubmitButton } from '../SubmitButton';

interface LoginParams {
  company?: {
    id: string;
    name: string;
    slug: string;
  };
}

export const Login = ({ company }: LoginParams) => {
  const { update } = use(SessionContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');
  const slug = company?.slug ?? '';
  const slugPath = slug ? `/${slug}` : '';

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
      password: '',
      name: '',
      company: ''
    },
    validate: {
      email: (value) => (validateEmail(value) ? null : 'Invalid email'),
      password: validatePassword
    }
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await signIn(values);
      await update();
      router.replace(redirectUrl || `${slugPath}/`);
    } catch {
      showNotification({
        title: 'Error',
        message: 'Failed to login',
        color: 'red'
      });
    }
  };

  return (
    <Box p={0}>
      <Center w="100%" h="80dvh">
        <Container size={'xs'} w={420}>
          <Title order={4} component="h1" fw={700} ta="center">
            Welcome to {company?.name || 'Insoles.ai'}, login with
          </Title>
          <Paper mt="lg" shadow="md" radius="md" p="xl" withBorder>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack>
                <TextInput
                  {...form.getInputProps('email')}
                  label="Email"
                  type="email"
                  placeholder="hello@insoles.ai"
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  required
                />
                <PasswordInput
                  {...form.getInputProps('password')}
                  key="password"
                  label="Password"
                  placeholder="Your password"
                  autoComplete="current-password"
                  radius="md"
                  required
                />
                <Stack my="md">
                  {!!company && (
                    <Anchor href={`${slugPath}/register/clinician`} component="a" c="dimmed" size="xs">
                      Don&apos;t have an account? Register
                    </Anchor>
                  )}
                  <Anchor href={`${slugPath}/login/recovery`} component="a" c="dimmed" size="xs">
                    Forgot your password?
                  </Anchor>
                </Stack>
                <SubmitButton label="Login" />
              </Stack>
            </form>
          </Paper>
        </Container>
      </Center>
    </Box>
  );
};
