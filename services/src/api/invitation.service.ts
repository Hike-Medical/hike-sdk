import {
  AccountVerification,
  ApprovePatientParams,
  ConsolidationPreview,
  CreateInvitationParams,
  FindInvitationsParams,
  PagedResponse,
  RevokeInvitationsParams,
  UpdateInvitationsParams
} from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
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

export const approveInvitation = async (patientId: string, params?: ApprovePatientParams): Promise<boolean> => {
  try {
    const response = await backendApi.patch(`invitation/approve/patient/${patientId}`, params);
    return response.data.isApproved;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const revokeInvitations = async (params: RevokeInvitationsParams): Promise<{ count: number }> => {
  try {
    const response = await backendApi.patch(`invitation/revoke`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getConsolidationPreview = async (patientId: string): Promise<ConsolidationPreview | null> => {
  try {
    const response = await backendApi.get(`invitation/consolidate/preview/${patientId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
