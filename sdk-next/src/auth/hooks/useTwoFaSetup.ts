import { useSetupTwoFa, useSignInWith2fa, useVerifyTwoFa } from '@hike/ui';
import QRCode from 'qrcode';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface TwoFaSetupFormValues {
  code: string;
}

export interface UseTwoFaSetupParams {
  onVerified?: () => Promise<void>;
  onQrCodeGenerated?: (dataUrl: string) => void;
  onSecretGenerated?: (secret: string) => void;
  onError?: (error: string) => void;
}

export interface UseTwoFaSetupReturn {
  handleSubmit: (values: TwoFaSetupFormValues) => void;
  handleCodeChange: () => void;
  isPending: boolean;
  qrCodeDataUrl: string;
  secret: string;
  error: string | null;
  validateCodeField: (value: string) => string | null;
}

/**
 * Headless hook for two-factor authentication setup
 */
export const useTwoFaSetup = ({
  onVerified,
  onQrCodeGenerated,
  onSecretGenerated,
  onError
}: UseTwoFaSetupParams = {}): UseTwoFaSetupReturn => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
  const [secret, setSecret] = useState('');
  const [error, setError] = useState<string | null>(null);
  const hasInitialized = useRef(false);

  const { mutate: setupTwoFa } = useSetupTwoFa({
    onSuccess: (data) => {
      QRCode.toDataURL(data.otpauthUrl, { width: 400, margin: 0 })
        .then((dataUrl) => {
          setQrCodeDataUrl(dataUrl);
          onQrCodeGenerated?.(dataUrl);
        })
        .catch((err) => {
          const errorMessage = `Failed to generate QR code: ${err}`;
          setError(errorMessage);
          onError?.(errorMessage);
        });

      setSecret(data.secret.toString());
      onSecretGenerated?.(data.secret.toString());
    },
    onError: (err) => {
      setError(err.message);
      onError?.(err.message);
    }
  });

  const { mutate: verifyTwoFa, isPending: isVerifyLoading } = useVerifyTwoFa({
    onSuccess: (_, variables) => signInWith2fa(variables.code),
    onError: (err) => {
      setError(err.message);
      onError?.(err.message);
    }
  });

  const { mutate: signInWith2fa, isPending: isSignInLoading } = useSignInWith2fa({
    onSuccess: async () => {
      await onVerified?.();
    },
    onError: (err) => {
      setError(err.message);
      onError?.(err.message);
    }
  });

  const handleSubmit = (values: TwoFaSetupFormValues) => {
    setError(null);
    verifyTwoFa({ code: values.code, enable: true });
  };

  const handleCodeChange = () => {
    setError(null);
  };

  const validateCodeField = (value: string) => (value.length === 6 ? null : 'Code must be 6 digits');

  useEffect(() => {
    if (!hasInitialized.current) {
      setupTwoFa();
      hasInitialized.current = true;
    }
  }, [setupTwoFa]);

  return {
    handleSubmit,
    handleCodeChange,
    isPending: isVerifyLoading || isSignInLoading,
    qrCodeDataUrl,
    secret,
    error,
    validateCodeField
  };
};
