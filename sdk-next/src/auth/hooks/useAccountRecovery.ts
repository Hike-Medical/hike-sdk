import { useAccountRecovery as useAccountRecoveryMutation } from '@hike/ui';
import { useState } from 'react';

export interface AccountRecoveryFormValues {
  email: string;
}

export interface UseAccountRecoveryParams {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export interface UseAccountRecoveryReturn {
  handleSubmit: (values: AccountRecoveryFormValues) => void;
  isPending: boolean;
  submitted: boolean;
}

/**
 * Headless hook for account recovery flow
 */
export const useAccountRecovery = ({
  onSuccess,
  onError
}: UseAccountRecoveryParams = {}): UseAccountRecoveryReturn => {
  const [submitted, setSubmitted] = useState(false);

  const { mutate: accountRecovery, isPending } = useAccountRecoveryMutation({
    onSuccess: () => {
      setSubmitted(true);
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    }
  });

  const handleSubmit = (values: AccountRecoveryFormValues) => {
    accountRecovery({
      params: {
        contact: values.email,
        contactType: 'EMAIL',
        type: 'RESET_PASSWORD'
      }
    });
  };

  return {
    handleSubmit,
    isPending,
    submitted
  };
};
