import { FootStatus, SetFootInactive, Foot } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const getClinicalFootStatus = async (footId: string): Promise<FootStatus> => {
  const response = await backendApi.get(`foot/${footId}/clinicalStatus`);
  return response.data;
};

export const setInactive = async (footId: string, body: SetFootInactive): Promise<Foot> => {
  const response = await backendApi.post(`foot/${footId}/inactive`, body);
  return response.data;
};

export const setActive = async (footId: string): Promise<Foot> => {
  const response = await backendApi.post(`foot/${footId}/active`);
  return response.data;
};
