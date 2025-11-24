import { useSignInWith2fa } from '@hike/ui';
import { useState } from 'react';

export interface UseTwoFaVerifyParams {
  onSuccess?: () => void | Promise<void>;
  onError?: (error: any) => void;
}

export interface UseTwoFaVerifyReturn {
  handleCodeChange: (code: string) => void;
  handleCodeComplete: (code: string) => void;
  isPending: boolean;
  error: string | null;
  code: string | null;
}

/**
 * Headless hook for two-factor authentication verification
 */
export const useTwoFaVerify = ({
  onSuccess,
  onError
}: UseTwoFaVerifyParams = {}): UseTwoFaVerifyReturn => {
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { mutate: signInWith2fa, isPending } = useSignInWith2fa({
    onSuccess: async () => {
      await onSuccess?.();
    },
    onError: (err) => {
      setError('Invalid code, please try again');
      onError?.(err);
    }
  });

  const handleCodeChange = (value: string) => {
    setError(null);
    setCode(value);
  };

  const handleCodeComplete = (value: string) => {
    if (value.length === 6) {
      signInWith2fa(value);
    }
  };

  return {
    handleCodeChange,
    handleCodeComplete,
    isPending,
    error,
    code
  };
};
