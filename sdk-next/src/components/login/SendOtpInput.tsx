'use client';

import { ContactType, HikeErrorCode, toErrorMessage, VerifyInvitationResponse } from '@hike/sdk';
import { useSendOtp, useVerifyInvitation } from '@hike/ui';
import { Alert, Anchor, Button, PinInput, Stack, Text, ThemeIcon } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconExclamationCircleFilled } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { ComponentType, PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';

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
  const [inputOtp, setInputOtp] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [isCountdownShown, setIsCountdownShown] = useState(false);
  const [isInvalidOtp, setIsInvalidOtp] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [unrecoverableError, setUnrecoverableError] = useState<HikeErrorCode | null>(null);
  const hasSentInitialOtpRef = useRef(false);
  const tShared = useTranslations('shared');
  const t = useTranslations('shared.login.otp');

  const { mutate: sendOtp, isPending: isSendingOtp } = useSendOtp({
    onMutate: () => setIsInvalidOtp(false),
    onSuccess: () => {
      setInputOtp(null);
      setIsCountdownShown(false);
      setCountdown(30);
    },
    onError: (error) => {
      switch (error.errorCode) {
        case HikeErrorCode.ERR_PATIENT_SIGNUP_NOT_ALLOWED:
          setUnrecoverableError(error.errorCode);
          return;
        default: {
          const message = toErrorMessage(error, t('error.couldNotSend'));
          showNotification({ title: tShared('error.title'), message, color: 'red' });
          setIsInvalidOtp(true);
        }
      }
    }
  });

  const { mutate: verifyInvitation, isPending: isVerifyingOtp } = useVerifyInvitation({
    onMutate: () => setIsInvalidOtp(false),
    onSuccess: async (response) => {
      setCountdown(0);
      setIsVerified(true);
      await onVerified(response, inputOtp ?? '');
    },
    onError: () => setIsInvalidOtp(true)
  });

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }

    return () => {};
  }, [countdown]);

  useEffect(() => {
    if (!contact || !contactType || hasSentInitialOtpRef.current) {
      return;
    }

    hasSentInitialOtpRef.current = true;

    // Must execute on next runloop or stuck in pending state
    setTimeout(() => sendOtp({ contact, contactType }), 0);
  }, [contact, contactType, sendOtp]);

  switch (unrecoverableError) {
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
          value={inputOtp ?? ''}
          onChange={(value) => {
            setIsInvalidOtp(false);
            setInputOtp(value);

            if (value.length === 6) {
              verifyInvitation(value);
            }
          }}
          length={6}
          inputMode="numeric"
          placeholder=""
          radius="md"
          mx="auto"
          my="lg"
          aria-label="One time code"
          oneTimeCode
          autoFocus
          error={isInvalidOtp}
          disabled={isVerifyingOtp || isVerified}
        />
        {isInvalidOtp && (
          <Text fz="12" fw="bold" fs="italic" c="hike-danger" mx="auto">
            {t('invalidCode')}
          </Text>
        )}
      </HikeShell.Main>
      <HikeShell.Footer vertical>
        {countdown > 0 && isCountdownShown ? (
          <Text fz="11" c="hike-danger" mx="auto">
            {t('waitMessage', { seconds: countdown })}
          </Text>
        ) : (
          onSkipped &&
          !isSendingOtp &&
          !isVerifyingOtp && (
            <Button variant="subtle" onClick={onSkipped}>
              {tShared('action.skip')}
            </Button>
          )
        )}
        <Button
          variant="footer"
          onClick={() => (countdown > 0 ? setIsCountdownShown(true) : sendOtp({ contact, contactType }))}
          loading={isSendingOtp || isVerifyingOtp || isVerified}
        >
          {t('resendButton')}
        </Button>
      </HikeShell.Footer>
    </>
  );
};
