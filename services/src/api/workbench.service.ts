import {
  AggregatedWorkbenchResponse,
  Asset,
  Foot,
  GetAggregatedParams,
  Order,
  SubmitOrderParams,
  UpdateInactiveFeetBody,
  Workbench
} from '@hike/types';
import { backendApi } from '../utils/backendApi';

export type FootWithAssets = Foot & { assets: Asset[] };

export const getActiveFeet = async (workbenchId: string): Promise<FootWithAssets[]> => {
  const response = await backendApi.get(`workbench/${workbenchId}/feet`);
  return response.data;
};

export const submitOrder = async (workbenchId: string, body: SubmitOrderParams): Promise<Workbench> => {
  const response = await backendApi.post(`workbench/${workbenchId}/submit`, body);
  return response.data;
};

export const processWorkbench = async (workbenchId: string): Promise<Workbench & { orders: Order[] }> => {
  const response = await backendApi.post(`workbench/${workbenchId}/process`);
  return response.data;
};

export const updateInactiveFeetInWorkbench = async (
  workbenchId: string,
  body: UpdateInactiveFeetBody
): Promise<Workbench> => {
  const response = await backendApi.post(`workbench/${workbenchId}/setInactiveFeet`, body);
  return response.data;
};

export const getAggregatedWorkbenches = async (params?: GetAggregatedParams): Promise<AggregatedWorkbenchResponse> => {
  const response = await backendApi.get('workbench/aggregated', { params });
  return response.data;
};
