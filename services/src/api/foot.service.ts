import { Foot, FootStatus, SetFootInactive, UpdateFootFromWorkbenchId } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const getClinicalFootStatus = async (footId: string): Promise<FootStatus> => {
  try {
    const response = await backendApi.get(`foot/${footId}/clinicalStatus`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const setFootInactive = async (footId: string, body: SetFootInactive): Promise<Foot> => {
  try {
    const response = await backendApi.post(`foot/${footId}/inactive`, body);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const setFootActive = async (footId: string): Promise<Foot> => {
  try {
    const response = await backendApi.post(`foot/${footId}/active`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateFootByWorkbenchId = async (
  workbenchId: string,
  body: UpdateFootFromWorkbenchId
): Promise<Foot | null> => {
  try {
    const response = await backendApi.post(`foot/${workbenchId}/update`, body);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
