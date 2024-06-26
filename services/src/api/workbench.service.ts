import {
  AggregatedWorkbenchResponse,
  Asset,
  Foot,
  GenerateWorkbenchPdfParams,
  GetAggregatedParams,
  MultipleWorkbenchIdsParams,
  Order,
  PagedResponse,
  SearchWorkbenchParams,
  SubmitOrderParams,
  UpdateInactiveFootBody,
  Workbench,
  WorkbenchExtended
} from '@hike/types';

import { backendApi } from '../utils/backendApi';

export type FootWithAssets = Foot & { assets: Asset[] };

export const searchWorkbenches = async (
  params: SearchWorkbenchParams,
  companyIds?: string[]
): Promise<PagedResponse<WorkbenchExtended[]>> => {
  const response = await backendApi.get('workbench/search', {
    headers: companyIds?.length ? { 'x-company-id': companyIds.join(',') } : undefined,
    params
  });

  return response.data;
};

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

export const updateInactiveFootInWorkbench = async (
  workbenchId: string,
  body: UpdateInactiveFootBody
): Promise<Workbench> => {
  const response = await backendApi.post(`workbench/${workbenchId}/set-inactive-foot`, body);
  return response.data;
};

export const getAggregatedWorkbenches = async (
  params?: GetAggregatedParams,
  companyIds?: string[]
): Promise<PagedResponse<AggregatedWorkbenchResponse[]>> => {
  const response = await backendApi.get('workbench/aggregate', {
    headers: companyIds?.length ? { 'x-company-id': companyIds.join(',') } : undefined,
    params
  });

  return response.data;
};

export const getFilesFromWorkbenches = async (body: MultipleWorkbenchIdsParams): Promise<Blob> => {
  const response = await backendApi.post('workbench/files', body, {
    responseType: 'arraybuffer'
  });

  return response.data;
};

export const generateWorkbenchPdf = async (
  workbenchId: string,
  body: GenerateWorkbenchPdfParams
): Promise<Workbench> => {
  const response = await backendApi.post(`/workbench/${workbenchId}/generate-pdf`, body);
  return response.data;
};
