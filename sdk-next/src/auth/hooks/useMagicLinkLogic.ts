import { useAccountRecovery, useSignInWithToken } from '@hike/ui';
import { useEffect, useState } from 'react';

export interface MagicLinkFormValues {
  emailOrPhone: string;
}

export interface UseMagicLinkParams {
  token?: string;
  contact?: string;
  companyId?: string;
  redirectUrl?: string;
  isAuthenticated?: boolean;
  onSuccess?: () => void | Promise<void>;
  onError?: (error: any) => void;
  onTokenInvalid?: () => void;
}

export interface UseMagicLinkReturn {
  handleSubmit: (values: MagicLinkFormValues) => void;
  isPending: boolean;
  submitted: boolean;
  tokenValid: boolean;
}

/**
 * Headless hook for magic link authentication
 */
export const useMagicLink = ({
  token,
  contact,
  companyId,
  redirectUrl,
  isAuthenticated = false,
  onSuccess,
  onError,
  onTokenInvalid
}: UseMagicLinkParams): UseMagicLinkReturn => {
  const [submitted, setSubmitted] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);

  const { mutate: accountRecovery, isPending: isAccountRecoveryLoading } = useAccountRecovery({
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: (error) => {
      onError?.(error);
    }
  });

  const { mutate: signInWithToken, isPending: isSignInWithTokenLoading } = useSignInWithToken({
    onSuccess: async () => {
      setTokenValid(true);
      await onSuccess?.();
    },
    onError: () => {
      setTokenValid(false);
      onTokenInvalid?.();
    }
  });

  const handleSubmit = (values: MagicLinkFormValues) => {
    accountRecovery({
      params: {
        contact: values.emailOrPhone,
        contactType: values.emailOrPhone.includes('@') ? 'EMAIL' : 'SMS',
        type: 'INVITATION',
        redirectUrl: redirectUrl ?? undefined
      },
      companyId
    });
  };

  // Check if token is valid on first load
  useEffect(() => {
    if (!token || !contact) {
      return;
    }

    if (isAuthenticated) {
      onSuccess?.();
      return;
    }

    signInWithToken({ contact, token });
  }, [contact, token, signInWithToken, isAuthenticated, onSuccess]);

  return {
    handleSubmit,
    isPending: isAccountRecoveryLoading || isSignInWithTokenLoading,
    submitted,
    tokenValid
  };
};
