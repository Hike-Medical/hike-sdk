import {
  AcceptInvitationParams,
  AccountVerification,
  CreateInvitationsParams,
  DeleteInvitationsParams,
  FindInvitationsParams,
  PagedResponse,
  UpdateInvitationsParams,
  UserExtended,
  VerifyInvitationResponse
} from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const findInvitations = async (
  params?: FindInvitationsParams
): Promise<PagedResponse<Omit<AccountVerification, 'token'>[]>> => {
  try {
    const response = await backendApi.get('invitation', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const createInvitations = async (
  params: CreateInvitationsParams
): Promise<Omit<AccountVerification, 'token'>[]> => {
  try {
    const response = await backendApi.post('invitation', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateInvitations = async (
  params: UpdateInvitationsParams
): Promise<Omit<AccountVerification, 'token'>[]> => {
  try {
    const response = await backendApi.patch('invitation', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const revokeInvitations = async (params: DeleteInvitationsParams): Promise<{ count: number }> => {
  try {
    const response = await backendApi.patch(`invitation/revoke`, params);
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
