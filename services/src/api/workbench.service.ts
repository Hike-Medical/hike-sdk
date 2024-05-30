import { Asset, Foot } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export type FootWithAssets = Foot & { assets: Asset[] };

export const getActiveFeet = async (workbenchId: string): Promise<FootWithAssets[]> => {
  const response = await backendApi.get(`workbench/${workbenchId}/feet`);
  return response.data;
};
