import type {
  AcceptInvitationParams,
  AuthSession,
  SendOtpParams,
  UserExtended,
  VerifyInvitationResponse
} from '@hike/types';
import {
  AccountRecoveryParams,
  CreateUserParams,
  InviteUserParams,
  PasswordResetParams,
  SignInWithPinBody,
  SignInWithTokenParams
} from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const signIn = async (
  credentials: { email: string; password: string },
  excludeCookie?: boolean
): Promise<AuthSession | null> => {
  try {
    const queryString = excludeCookie === true ? '?exclude-cookie=true' : '';
    const response = await backendApi.post(`auth/login${queryString}`, credentials);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const signInWithToken = async (credentials: SignInWithTokenParams): Promise<AuthSession> => {
  const response = await backendApi.post('auth/magic-link', credentials);
  return response.data;
};

export const signInWithPin = async (credentials: SignInWithPinBody): Promise<AuthSession> => {
  const response = await backendApi.post('auth/pin', credentials);
  return response.data;
};

export const signUp = async (credentials: CreateUserParams) => {
  const response = await backendApi.post('auth/signup', credentials);
  return response.data;
};

export const sendSignInOtp = async (params: SendOtpParams) => {
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

export const inviteUserEmail = async (params: InviteUserParams): Promise<boolean> => {
  try {
    const response = await backendApi.post('auth/invite', params);
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
