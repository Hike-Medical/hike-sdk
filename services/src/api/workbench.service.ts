import { Asset, Foot, SubmitOrderBody, Workbench } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export type FootWithAssets = Foot & { assets: Asset[] };

export const getActiveFeet = async (workbenchId: string): Promise<FootWithAssets[]> => {
  const response = await backendApi.get(`workbench/${workbenchId}/feet`);
  return response.data;
};

export const submitOrder = async (workbenchId: string, body: SubmitOrderBody): Promise<Workbench> => {
  const response = await backendApi.post(`workbench/${workbenchId}/submit`, body);
  return response.data;
};
