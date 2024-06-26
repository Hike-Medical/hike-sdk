import { Foot, FootStatus, SetFootInactive } from '@hike/types';
import { toResponseError } from '../errors/ResponseError';
import { backendApi } from '../utils/backendApi';

export const getClinicalFootStatus = async (footId: string): Promise<FootStatus> => {
  try {
    const response = await backendApi.get(`foot/${footId}/clinicalStatus`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const setInactive = async (footId: string, body: SetFootInactive): Promise<Foot> => {
  try {
    const response = await backendApi.post(`foot/${footId}/inactive`, body);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const setActive = async (footId: string): Promise<Foot> => {
  try {
    const response = await backendApi.post(`foot/${footId}/active`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
