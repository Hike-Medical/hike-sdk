import type {
  AcceptInvitationCompanyParams,
  AcceptInvitationCompanyResponse,
  AcceptInvitationParams,
  AcceptInvitationV2Params,
  AuthPreferences,
  AuthSession,
  OIDCResponse,
  PylonEmailHashResponse,
  SafeCompany,
  SendOtpParams,
  UserExtended,
  VerifyInvitationResponse
} from '@hike/types';
import {
  AccountRecoveryParams,
  PasswordResetParams,
  SignInParams,
  SignInWithPinBody,
  SignInWithTokenParams,
  SignUpClinicianParams
} from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const signIn = async ({ credentials, excludeCookie }: SignInParams): Promise<AuthSession | null> => {
  try {
    const queryString = excludeCookie === true ? '?exclude-cookie=true' : '';
    const response = await backendApi.post(`auth/login${queryString}`, credentials);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const signInWithToken = async (credentials: SignInWithTokenParams): Promise<AuthSession> => {
  try {
    const response = await backendApi.post('auth/magic-link', credentials);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const signInWithPin = async (credentials: SignInWithPinBody): Promise<{ accessToken: string }> => {
  try {
    const response = await backendApi.post('auth/pin', credentials);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const signInWith2fa = async (code: string): Promise<AuthSession> => {
  try {
    const response = await backendApi.post('auth/2fa', { code });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const signUpClinician = async (data: SignUpClinicianParams): Promise<AuthSession> => {
  try {
    const response = await backendApi.post('auth/signup/clinician', data);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const sendOtp = async (params: SendOtpParams): Promise<void> => {
  try {
    const response = await backendApi.post('auth/account/otp', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getIsCompanyVoluntary = async (): Promise<boolean> => {
  const response = await backendApi.get(`auth/company/is-voluntary`);
  return response.data;
};

export const refreshToken = async (token?: string, excludeCookie?: boolean): Promise<AuthSession> => {
  try {
    const queryString = excludeCookie === true ? '?exclude-cookie=true' : '';
    const response = await backendApi.post(`auth/refresh${queryString}`, { token });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const logout = async (): Promise<void> => {
  try {
    const response = await backendApi.post('auth/logout');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const accountRecovery = async (params: AccountRecoveryParams, companyId?: string): Promise<void> => {
  try {
    const response = await backendApi.post(
      'auth/account/recovery',
      params,
      companyId ? { headers: { 'x-company-id': companyId } } : undefined
    );
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const sendLink = async (params: Omit<AccountRecoveryParams, 'type'>): Promise<void> => {
  try {
    const response = await backendApi.post('auth/send-link', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const resetPassword = async (params: PasswordResetParams): Promise<void> => {
  try {
    const response = await backendApi.post('auth/password/reset', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const verifyInvitation = async (token: string): Promise<VerifyInvitationResponse> => {
  try {
    const response = await backendApi.get(`auth/invitation/${token}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const acceptInvitation = async (params: AcceptInvitationParams): Promise<UserExtended> => {
  try {
    const response = await backendApi.post('auth/invitation', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

/**
 * V2: Accept invitation without patient creation
 * Will replace acceptInvitation in the future
 */
export const acceptInvitationV2 = async (params: AcceptInvitationV2Params): Promise<UserExtended> => {
  try {
    const response = await backendApi.post('auth/invitation/v2', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const acceptInvitationCompany = async (
  params: AcceptInvitationCompanyParams
): Promise<AcceptInvitationCompanyResponse> => {
  try {
    const response = await backendApi.post('auth/invitation/company', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findCompaniesBySession = async (): Promise<SafeCompany[]> => {
  const response = await backendApi.get('auth/session/companies');
  return response.data;
};

export const startOidcConnect = async (): Promise<{ authorizationUrl: string }> => {
  try {
    const response = await backendApi.get(`auth/oidc/start`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

// Pre-exchange the code; returns either AuthSession (auto-login) or a needs-info payload
export const oidcPrecheck = async (code: string, iss?: string, state?: string): Promise<AuthSession | OIDCResponse> => {
  try {
    const params: Record<string, string> = { code };
    if (iss) {
      params.iss = iss;
    }
    if (state) {
      params.state = state;
    }
    const response = await backendApi.post(`auth/oidc/callback`, {}, { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

// Complete enrollment using provider access_token + collected PII
export const oidcCompleteEnrollment = async (data: {
  accessToken: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}): Promise<AuthSession> => {
  try {
    const { accessToken, ...body } = data;
    const response = await backendApi.post(`auth/oidc/complete`, body, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const oidcExchangeAuthCode = async (data: {
  code?: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}) => {
  try {
    const response = await backendApi.post(
      `auth/oidc/callback`,
      {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate
      },
      {
        params: { code: data.code }
      }
    );
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findAuthPreferences = async (companyId?: string): Promise<AuthPreferences> => {
  try {
    const response = await backendApi.get('auth/preferences', {
      headers: companyId ? { 'x-company-id': companyId } : undefined
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

/**
 * Gets the Pylon identity verification email hash for the authenticated user.
 * @see https://docs.usepylon.com/pylon-docs/chat-widget/identity-verification
 */
export const getPylonEmailHash = async (): Promise<PylonEmailHashResponse> => {
  try {
    const response = await backendApi.get('auth/pylon/email-hash');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
