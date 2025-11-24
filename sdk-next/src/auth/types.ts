import { AppId, ContactType, HikeErrorCode, VerifyInvitationResponse } from '@hike/sdk';

/**
 * Common auth component props
 */
export interface AuthComponentBaseProps {
  onSuccess?: () => void | Promise<void>;
  onError?: (error: Error) => void;
}

/**
 * Login component props
 */
export interface LoginProps {
  company?: {
    id: string;
    name: string;
    slug: string;
  };
  registerPath?: string;
  enableSocial?: boolean;
  appId?: AppId;
}

/**
 * Account recovery props
 */
export interface AccountRecoveryProps {
  params: Promise<{ slug: string }>;
}

/**
 * Magic link props
 */
export interface MagicLinkProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    token: string;
    contact: string;
    redirect: string;
  }>;
}

/**
 * Reset password props
 */
export interface ResetPasswordProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ token: string }>;
}

/**
 * Update password props
 */
export interface UpdatePasswordProps {
  onSuccess?: () => Promise<void>;
}

/**
 * Two-factor setup props
 */
export interface TwoFaSetupProps {
  onVerified?: () => Promise<void>;
}

/**
 * OTP input props - requires a shell component for layout
 */
export interface SendOtpInputProps<TShell = any> {
  contact: string;
  contactType: ContactType;
  onVerified: (response: VerifyInvitationResponse, token: string) => Promise<void>;
  onSkipped?: () => void;
  onGoBack?: () => void;
  onContactSupport?: () => void;
  HikeShell: TShell;
}

/**
 * Google login button props
 */
export interface GoogleLoginButtonProps {
  company: {
    id: string;
    slug: string;
  };
}

/**
 * Password criteria check result
 */
export interface PasswordCriteriaState {
  hasMinLength: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  isValid: boolean;
}

/**
 * OTP state management
 */
export interface OtpState {
  inputOtp: string | null;
  countdown: number;
  isCountdownShown: boolean;
  isInvalidOtp: boolean;
  isVerified: boolean;
  unrecoverableError: HikeErrorCode | null;
}
