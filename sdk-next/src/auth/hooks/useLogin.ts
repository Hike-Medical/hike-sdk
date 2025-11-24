import { AppId } from '@hike/sdk';
import { useSignIn } from '@hike/ui';

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface UseLoginParams {
  appId?: AppId;
  onSuccess?: () => void | Promise<void>;
  onError?: (error: any, statusCode?: number) => void;
}

export interface UseLoginReturn {
  handleSubmit: (values: LoginFormValues) => void;
  isPending: boolean;
}

/**
 * Headless hook for login
 */
export const useLogin = ({ onSuccess, onError }: UseLoginParams = {}): UseLoginReturn => {
  const { mutate: signIn, isPending } = useSignIn({
    onSuccess: async () => {
      await onSuccess?.();
    },
    onError: (error) => {
      onError?.(error, error.statusCode);
    }
  });

  const handleSubmit = (values: LoginFormValues) => {
    signIn({ credentials: values });
  };

  return {
    handleSubmit,
    isPending
  };
};
