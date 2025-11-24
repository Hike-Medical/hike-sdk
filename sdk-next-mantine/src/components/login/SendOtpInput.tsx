'use client';

import { ContactType, HikeErrorCode, toErrorMessage, VerifyInvitationResponse } from '@hike/sdk';
import { useSendOtp } from '@hike/sdk-next';
import { Alert, Anchor, Button, PinInput, Stack, Text, ThemeIcon } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconExclamationCircleFilled } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { ComponentType, PropsWithChildren, ReactNode } from 'react';

export interface SendOtpInputProps {
  contact: string;
  contactType: ContactType;
  onVerified: (response: VerifyInvitationResponse, token: string) => Promise<void>;
  onSkipped?: () => void;
  onGoBack?: () => void;
  onContactSupport?: () => void;
  HikeShell: {
    Main: ComponentType<PropsWithChildren<{ title: string; description: ReactNode }>>;
    Footer: ComponentType<PropsWithChildren<{ vertical?: boolean }>>;
  };
}

export const SendOtpInput = ({
  contact,
  contactType,
  onVerified,
  onSkipped,
  onGoBack,
  onContactSupport,
  HikeShell
}: SendOtpInputProps) => {
  const tShared = useTranslations('shared');
  const t = useTranslations('shared.login.otp');

  const { handleOtpChange, handleResendOtp, state, isSending, isVerifying } = useSendOtp({
    contact,
    contactType,
    onVerified,
    onError: (error) => {
      const message = toErrorMessage(error, t('error.couldNotSend'));
      showNotification({ title: tShared('error.title'), message, color: 'red' });
    }
  });

  switch (state.unrecoverableError) {
    case HikeErrorCode.ERR_PATIENT_SIGNUP_NOT_ALLOWED:
      return (
        <>
          <HikeShell.Main
            title={t('error.notAllowed.title')}
            description={
              <Stack gap="md" align="center">
                <ThemeIcon variant="light" color="red" size={80} radius="xl">
                  <IconExclamationCircleFilled size={50} />
                </ThemeIcon>
              </Stack>
            }
          >
            <Stack gap="lg" align="center">
              <Text size="md" ta="center" c="hike-dimmed">
                {t('error.notAllowed.description')}
              </Text>
              <Alert color="orange" variant="light" w="100%">
                {onContactSupport ? (
                  <Text size="sm" ta="center">
                    Please <Anchor onClick={onContactSupport}>click here</Anchor> to contact support for assistance.
                  </Text>
                ) : (
                  <Text size="sm" ta="center">
                    {t('error.notAllowed.suggestion')}
                  </Text>
                )}
              </Alert>
            </Stack>
          </HikeShell.Main>
          {onGoBack && (
            <HikeShell.Footer>
              <Button variant="footer" onClick={onGoBack} fullWidth>
                {t('error.notAllowed.goBack')}
              </Button>
            </HikeShell.Footer>
          )}
        </>
      );
    case HikeErrorCode.ERR_AUTH_FORBIDDEN:
      return (
        <>
          <HikeShell.Main
            title={t('error.oidcRequired.title')}
            description={
              <Stack gap="md" align="center">
                <ThemeIcon variant="light" color="orange" size={80} radius="xl">
                  <IconExclamationCircleFilled size={50} />
                </ThemeIcon>
              </Stack>
            }
          >
            <Stack gap="lg" align="center">
              <Text size="md" ta="center" c="hike-dimmed">
                {t('error.oidcRequired.description')}
              </Text>
              <Alert color="blue" variant="light" w="100%">
                <Text size="sm" ta="center">
                  {t('error.oidcRequired.suggestion')}
                </Text>
              </Alert>
            </Stack>
          </HikeShell.Main>
          {onGoBack && (
            <HikeShell.Footer>
              <Button variant="footer" onClick={onGoBack} fullWidth>
                {t('error.oidcRequired.goBack')}
              </Button>
            </HikeShell.Footer>
          )}
        </>
      );
    default:
      break;
  }

  return (
    <>
      <HikeShell.Main
        title={t('title')}
        description={t.rich('description', {
          contact,
          type: contactType.toLowerCase(),
          strong: (chunks) => (
            <Text component="span" fw="bold" c="hike-dimmed" inherit>
              {chunks}
            </Text>
          )
        })}
      >
        <PinInput
          value={state.inputOtp ?? ''}
          onChange={handleOtpChange}
          length={6}
          inputMode="numeric"
          placeholder=""
          radius="md"
          mx="auto"
          my="lg"
          aria-label="One time code"
          oneTimeCode
          autoFocus
          error={state.isInvalidOtp}
          disabled={isVerifying || state.isVerified}
        />
        {state.isInvalidOtp && (
          <Text fz="12" fw="bold" fs="italic" c="hike-danger" mx="auto">
            {t('invalidCode')}
          </Text>
        )}
      </HikeShell.Main>
      <HikeShell.Footer vertical>
        {state.countdown > 0 && state.isCountdownShown ? (
          <Text fz="11" c="hike-danger" mx="auto">
            {t('waitMessage', { seconds: state.countdown })}
          </Text>
        ) : (
          onSkipped &&
          !isSending &&
          !isVerifying && (
            <Button variant="subtle" onClick={onSkipped}>
              {tShared('action.skip')}
            </Button>
          )
        )}
        <Button variant="footer" onClick={handleResendOtp} loading={isSending || isVerifying || state.isVerified}>
          {t('resendButton')}
        </Button>
      </HikeShell.Footer>
    </>
  );
};
