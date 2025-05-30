'use client';

import { AppId, appName, validateEmail } from '@hike/sdk';
import { SessionContext, useSignIn } from '@hike/ui';
import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Space,
  Stack,
  TextInput,
  Title
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconMailFast } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, use } from 'react';
import { SubmitButton } from '../SubmitButton';
import { GoogleLoginButton } from './GoogleLoginButton';

interface LoginParams {
  company?: {
    id: string;
    name: string;
    slug: string;
  };
  registerPath?: string;
  enableSocial?: boolean;
  appId?: AppId;
}

export const Login = ({ company, registerPath, enableSocial, appId = '@hike/admin-web' }: LoginParams) => {
  const { update } = use(SessionContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');
  const slug = company?.slug ?? '';
  const slugPath = slug ? `/${slug}` : '';
  const tShared = useTranslations('shared');
  const t = useTranslations('login.page');

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
      password: ''
    },
    validate: {
      email: (value) => (validateEmail(value) ? null : tShared('fields.emailInvalid')),
      password: isNotEmpty(tShared('fields.passwordRequired'))
    }
  });

  const { mutate: signIn, isPending } = useSignIn({
    onSuccess: async () => {
      await update();
      router.replace(redirectUrl || `${slugPath}/`);
    },
    onError: (error) => {
      if (error.statusCode === 429) {
        showNotification({
          variant: 'error',
          title: tShared('error.title'),
          message: tShared('error.tooManyRequests'),
          color: 'red'
        });

        return;
      }

      showNotification({
        variant: 'error',
        title: tShared('error.title'),
        message: tShared('error.incorrectCredentials'),
        color: 'red'
      });
    }
  });

  const handleSubmit = async (values: typeof form.values) => {
    signIn({ credentials: values });
  };

  const handleMagicLinkLogin = () => {
    const queryParams = new URLSearchParams();
    const { email } = form.getValues();

    if (email) {
      queryParams.set('contact', email);
    }

    if (redirectUrl) {
      queryParams.set('redirect', redirectUrl);
    }

    router.push(`${slugPath}/login/magic-link?${queryParams.toString()}`);
  };

  return (
    <Box p={0}>
      <Center w="100%" h="80dvh">
        <Container size={'xs'} w={420}>
          <Title order={4} component="h1" fw={700} ta="center">
            {t('title', { companyName: company?.name || appName(appId) })}
          </Title>
          {company ? (
            <>
              <Group grow mb="md" mt="md">
                {enableSocial && (
                  <Suspense>
                    <GoogleLoginButton company={company} />
                  </Suspense>
                )}
                <Button
                  leftSection={<IconMailFast />}
                  variant="default"
                  radius="xl"
                  onClick={() => handleMagicLinkLogin()}
                >
                  {t('magicLink')}
                </Button>
              </Group>
              <Divider label={t('orContinue')} labelPosition="center" my="lg" />
            </>
          ) : (
            <Space my="lg" />
          )}
          <Paper mt="lg" shadow="md" radius="md" p="xl" withBorder>
            <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
              <Stack>
                <TextInput
                  {...form.getInputProps('email')}
                  label={tShared('fields.email')}
                  type="email"
                  placeholder={tShared('fields.emailPlaceholder')}
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  required
                />
                <PasswordInput
                  {...form.getInputProps('password')}
                  key="password"
                  label={tShared('fields.password')}
                  placeholder={tShared('fields.passwordPlaceholder')}
                  autoComplete="current-password"
                  required
                />
                <Stack my="md">
                  {registerPath && (
                    <Anchor href={registerPath} component="a" c="dimmed" size="xs">
                      {t('register')}
                    </Anchor>
                  )}
                  <Anchor href={`${slugPath}/login/recovery`} component="a" c="dimmed" size="xs">
                    {t('forgotPassword')}
                  </Anchor>
                </Stack>
                <SubmitButton label={t('actionButton')} loading={isPending} />
              </Stack>
            </form>
          </Paper>
        </Container>
      </Center>
    </Box>
  );
};
