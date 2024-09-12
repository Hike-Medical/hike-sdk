import { InviteUserParams } from '@hike/types';
import { toResponseError } from '../errors/ResponseError';
import { backendApi } from '../utils/backendApi';

export const inviteUserEmail = async (params: InviteUserParams): Promise<boolean> => {
  try {
    const response = await backendApi.post('auth/invite', params);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
