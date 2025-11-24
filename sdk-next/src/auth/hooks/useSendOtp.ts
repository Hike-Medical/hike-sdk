import { ContactType, HikeErrorCode, VerifyInvitationResponse } from '@hike/sdk';
import { useSendOtp as useSendOtpMutation, useVerifyInvitation } from '@hike/ui';
import { useEffect, useRef, useState } from 'react';
import { OtpState } from '../types';

export interface UseSendOtpParams {
  contact: string;
  contactType: ContactType;
  onVerified: (response: VerifyInvitationResponse, token: string) => Promise<void>;
  onError?: (error: any) => void;
  onUnrecoverableError?: (errorCode: HikeErrorCode) => void;
}

export interface UseSendOtpReturn {
  handleOtpChange: (value: string) => void;
  handleResendOtp: () => void;
  state: OtpState;
  isSending: boolean;
  isVerifying: boolean;
}

/**
 * Headless hook for OTP sending and verification
 */
export const useSendOtp = ({
  contact,
  contactType,
  onVerified,
  onError,
  onUnrecoverableError
}: UseSendOtpParams): UseSendOtpReturn => {
  const [state, setState] = useState<OtpState>({
    inputOtp: null,
    countdown: 0,
    isCountdownShown: false,
    isInvalidOtp: false,
    isVerified: false,
    unrecoverableError: null
  });

  const hasSentInitialOtpRef = useRef(false);

  const { mutate: sendOtp, isPending: isSendingOtp } = useSendOtpMutation({
    onMutate: () => {
      setState((prev) => ({ ...prev, isInvalidOtp: false }));
    },
    onSuccess: () => {
      setState((prev) => ({
        ...prev,
        inputOtp: null,
        isCountdownShown: false,
        countdown: 30
      }));
    },
    onError: (error) => {
      switch (error.errorCode) {
        case HikeErrorCode.ERR_PATIENT_SIGNUP_NOT_ALLOWED:
        case HikeErrorCode.ERR_AUTH_FORBIDDEN:
          if (error.errorCode) {
            setState((prev) => ({ ...prev, unrecoverableError: error.errorCode! }));
            onUnrecoverableError?.(error.errorCode);
          }
          return;
        default:
          setState((prev) => ({ ...prev, isInvalidOtp: true }));
          onError?.(error);
      }
    }
  });

  const { mutate: verifyInvitation, isPending: isVerifyingOtp } = useVerifyInvitation({
    onMutate: () => {
      setState((prev) => ({ ...prev, isInvalidOtp: false }));
    },
    onSuccess: async (response) => {
      setState((prev) => ({ ...prev, countdown: 0, isVerified: true }));
      await onVerified(response, state.inputOtp ?? '');
    },
    onError: () => {
      setState((prev) => ({ ...prev, isInvalidOtp: true }));
    }
  });

  const handleOtpChange = (value: string) => {
    setState((prev) => ({ ...prev, isInvalidOtp: false, inputOtp: value }));

    if (value.length === 6) {
      verifyInvitation(value);
    }
  };

  const handleResendOtp = () => {
    if (state.countdown > 0) {
      setState((prev) => ({ ...prev, isCountdownShown: true }));
    } else {
      sendOtp({ contact, contactType });
    }
  };

  // Countdown timer
  useEffect(() => {
    if (state.countdown > 0) {
      const timer = setTimeout(() => {
        setState((prev) => ({ ...prev, countdown: prev.countdown - 1 }));
      }, 1000);
      return () => clearTimeout(timer);
    }

    return () => {};
  }, [state.countdown]);

  // Send initial OTP
  useEffect(() => {
    if (!contact || !contactType || hasSentInitialOtpRef.current) {
      return;
    }

    hasSentInitialOtpRef.current = true;

    // Must execute on next runloop or stuck in pending state
    setTimeout(() => sendOtp({ contact, contactType }), 0);
  }, [contact, contactType, sendOtp]);

  return {
    handleOtpChange,
    handleResendOtp,
    state,
    isSending: isSendingOtp,
    isVerifying: isVerifyingOtp
  };
};
