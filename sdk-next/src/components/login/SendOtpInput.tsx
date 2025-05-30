'use client';

import { ContactType, toErrorMessage, VerifyInvitationResponse } from '@hike/sdk';
import { SessionContext, useSendOtp, useVerifyInvitation } from '@hike/ui';
import { Button, PinInput, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useTranslations } from 'next-intl';
import { ComponentType, PropsWithChildren, ReactNode, use, useEffect, useRef, useState } from 'react';

interface SendOtpInputProps {
  contact: string;
  contactType: ContactType;
  onVerified: (response: VerifyInvitationResponse, token: string) => Promise<void>;
  HikeShell: {
    Main: ComponentType<PropsWithChildren<{ title: string; description: ReactNode }>>;
    Footer: ComponentType<PropsWithChildren<{ vertical?: boolean }>>;
  };
}

export const SendOtpInput = ({ contact, contactType, onVerified, HikeShell }: SendOtpInputProps) => {
  const [inputOtp, setInputOtp] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [isCountdownShown, setIsCountdownShown] = useState(false);
  const [isInvalidOtp, setIsInvalidOtp] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { update } = use(SessionContext);
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
      const message = toErrorMessage(error, t('error.couldNotSend'));
      showNotification({ title: tShared('error.title'), message, color: 'red' });
      setIsInvalidOtp(true);
    }
  });

  const { mutate: verifyInvitation, isPending: isVerifyingOtp } = useVerifyInvitation({
    onMutate: () => setIsInvalidOtp(false),
    onSuccess: async (response) => {
      await update();
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

  return (
    <>
      <HikeShell.Main
        title={t('title')}
        description={t.rich('description', {
          contact,
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
        {countdown > 0 && isCountdownShown && (
          <Text fz="11" c="hike-danger" mx="auto">
            {t('waitMessage', { seconds: countdown })}
          </Text>
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
