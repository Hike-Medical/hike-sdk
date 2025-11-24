import { useResetPassword as useResetPasswordMutation } from '@hike/ui';
import { useEffect, useState } from 'react';

export interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

export interface UseResetPasswordParams {
  token?: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export interface UseResetPasswordReturn {
  handleSubmit: (values: ResetPasswordFormValues) => void;
  isPending: boolean;
  submitted: boolean;
  tokenValid: boolean;
}

/**
 * Headless hook for reset password flow
 */
export const useResetPassword = ({
  token,
  onSuccess,
  onError
}: UseResetPasswordParams): UseResetPasswordReturn => {
  const [submitted, setSubmitted] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);

  const { mutate: resetPassword, isPending: isResetPasswordLoading } = useResetPasswordMutation({
    onSuccess: () => {
      setSubmitted(true);
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    }
  });

  const { mutate: verifyToken, isPending: isVerifyTokenLoading } = useResetPasswordMutation({
    onSuccess: () => setTokenValid(true),
    onError: () => setTokenValid(false)
  });

  const handleSubmit = (values: ResetPasswordFormValues) => {
    if (!token) {
      onError?.(new Error('Token is required'));
      return;
    }

    resetPassword({ token, password: values.password });
  };

  // Verify token on mount
  useEffect(() => {
    if (!token) {
      return;
    }

    verifyToken({ token });
  }, [token, verifyToken]);

  return {
    handleSubmit,
    isPending: isResetPasswordLoading || isVerifyTokenLoading,
    submitted,
    tokenValid
  };
};
