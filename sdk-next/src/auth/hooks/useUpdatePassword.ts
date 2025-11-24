import { useUpdateUserPassword } from '@hike/ui';

export interface UpdatePasswordFormValues {
  password: string;
  confirmPassword: string;
}

export interface UseUpdatePasswordParams {
  onSuccess?: () => void | Promise<void>;
  onError?: (error: any) => void;
}

export interface UseUpdatePasswordReturn {
  handleSubmit: (values: UpdatePasswordFormValues) => void;
  isPending: boolean;
}

/**
 * Headless hook for update password
 */
export const useUpdatePassword = ({
  onSuccess,
  onError
}: UseUpdatePasswordParams = {}): UseUpdatePasswordReturn => {
  const { mutate: updatePassword, isPending } = useUpdateUserPassword({
    onSuccess: async () => {
      await onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    }
  });

  const handleSubmit = (values: UpdatePasswordFormValues) => {
    updatePassword({ password: values.password });
  };

  return {
    handleSubmit,
    isPending
  };
};
