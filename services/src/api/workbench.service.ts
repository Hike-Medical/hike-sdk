import {
  AggregatedWorkbenchResponse,
  Asset,
  Foot,
  GenerateWorkbenchPdfParams,
  GetAggregatedParams,
  Order,
  PagedResponse,
  SearchWorkbenchParams,
  SubmitOrderParams,
  UpdateInactiveFootBody,
  Workbench,
  WorkbenchExtended
} from '@hike/types';
import { toResponseError } from '../errors/ResponseError';
import { backendApi } from '../utils/backendApi';

export type FootWithAssets = Foot & { assets: Asset[] };

export const searchWorkbenches = async (
  params: SearchWorkbenchParams,
  companyIds?: string[]
): Promise<PagedResponse<WorkbenchExtended[]>> => {
  try {
    const response = await backendApi.get('workbench/search', {
      headers: companyIds?.length ? { 'x-company-id': companyIds.join(',') } : undefined,
      params
    });

    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const getActiveFeet = async (workbenchId: string): Promise<FootWithAssets[]> => {
  try {
    const response = await backendApi.get(`workbench/${workbenchId}/feet`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const submitOrder = async (workbenchId: string, body: SubmitOrderParams): Promise<Workbench> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/submit`, body);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
export const updateRenderType = async (
  workbenchId: string,
  body: { renderType: number },
  companyIds: string[]
): Promise<Workbench> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/update-render-type`, body, {
      headers: companyIds?.length ? { 'x-company-id': companyIds.join(',') } : undefined
    });
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const processWorkbench = async (workbenchId: string): Promise<Workbench & { orders: Order[] }> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/process`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const updateInactiveFootInWorkbench = async (
  workbenchId: string,
  body: UpdateInactiveFootBody
): Promise<Workbench> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/set-inactive-foot`, body);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const getAggregatedWorkbenches = async (
  params?: GetAggregatedParams,
  companyIds?: string[]
): Promise<PagedResponse<AggregatedWorkbenchResponse[]>> => {
  try {
    const response = await backendApi.get('workbench/aggregate', {
      headers: companyIds?.length ? { 'x-company-id': companyIds.join(',') } : undefined,
      params
    });

    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const getFilesFromWorkbenches = async (
  workbenchIds: string[],
  withLabel: boolean,
  companyIds
): Promise<Blob> => {
  try {
    const response = await backendApi.post(
      'workbench/files',
      { workbenchIds, withLabel },
      {
        headers: companyIds?.length ? { 'x-company-id': companyIds.join(',') } : undefined,
        responseType: 'arraybuffer'
      }
    );

    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const generateWorkbenchPdf = async (
  workbenchId: string,
  body: GenerateWorkbenchPdfParams
): Promise<Workbench> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/generate-pdf`, body);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const generateWorkbenchOrderPdf = async (
  workbenchId: string,
  body: GenerateWorkbenchPdfParams
): Promise<Workbench> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/generate-order-pdf`, body);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const generateWorkbenchDeliveryReceiptPdf = async (
  workbenchId: string,
  body: GenerateWorkbenchPdfParams
): Promise<Workbench> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/generate-delivery-receipt-pdf`, body);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const uploadFiles = async (workbenchId: string, formData: FormData): Promise<{ key: string; url: string }[]> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const continueWorkbench = async (workbenchId: string, companyIds: string[]): Promise<Workbench> => {
  try {
    const response = await backendApi.post(
      `workbench/${workbenchId}/continue`,
      {},
      {
        headers: companyIds?.length ? { 'x-company-id': companyIds.join(',') } : undefined
      }
    );
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
