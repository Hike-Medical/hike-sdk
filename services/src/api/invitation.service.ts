import {
  AccountVerification,
  CreateInvitationParams,
  DeleteInvitationsParams,
  FindInvitationsParams,
  PagedResponse,
  SendOtpParams,
  UpdateInvitationsParams
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

export const createInvitation = async (params: CreateInvitationParams): Promise<Omit<AccountVerification, 'token'>> => {
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

export const sendOtp = async (params: SendOtpParams) => {
  try {
    const response = await backendApi.post('invitation/otp', params);
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
