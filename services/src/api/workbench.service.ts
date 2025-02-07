import {
  ActionMultipleWorkbenchIdsParams,
  Asset,
  DetectionStatusResponse,
  FlattenedWorkbench,
  Foot,
  GenerateWorkbenchPdfParams,
  GetAggregatedParams,
  Order,
  PagedResponse,
  PrintShippingParams,
  ResetWorkbenchParams,
  SearchWorkbenchParams,
  ShippingLabel,
  SubmitOrderParams,
  UpdateInactiveFootBody,
  Workbench,
  WorkbenchExtended,
  WorkbenchStatus
} from '@hike/types';
import { toHikeError } from '../errors/HikeError';
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
    throw toHikeError(error);
  }
};

export const getFeet = async (workbenchId: string): Promise<FootWithAssets[]> => {
  try {
    const response = await backendApi.get(`workbench/${workbenchId}/feet`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getWorkbench = async (workbenchId: string): Promise<WorkbenchExtended> => {
  try {
    const response = await backendApi.get(`workbench/${workbenchId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const submitOrder = async (workbenchId: string, body: SubmitOrderParams): Promise<Workbench> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/clinical/submit`, body);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const submitConsumerOrder = async (workbenchId: string): Promise<Workbench> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/consumer/submit`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const validateConsumerSubmission = async (workbenchId: string): Promise<Workbench> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/consumer/validate`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
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
    throw toHikeError(error);
  }
};

export const printShippingInfo = async (
  workbenchId: string,
  data: PrintShippingParams
): Promise<ShippingLabel | null> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/print/shipping`, data);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const processWorkbench = async (workbenchId: string): Promise<Workbench & { orders: Order[] }> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/process`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const approveWorkbench = async (workbenchId: string): Promise<Asset[]> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/approve`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const rushWorkbench = async (workbenchId: string): Promise<Asset[]> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/rush`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const resetScans = async (workbenchId: string, params: ResetWorkbenchParams): Promise<Workbench> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/reset`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
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
    throw toHikeError(error);
  }
};

export const getAggregatedWorkbenches = async (
  params?: GetAggregatedParams,
  companyIds?: string[]
): Promise<PagedResponse<FlattenedWorkbench[]>> => {
  try {
    const response = await backendApi.get('workbench/aggregate', {
      headers: companyIds?.length ? { 'x-company-id': companyIds.join(',') } : undefined,
      params
    });

    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getFilesFromWorkbenches = async (
  params: ActionMultipleWorkbenchIdsParams,
  companyIds?: string[]
): Promise<Blob> => {
  try {
    const response = await backendApi.post('workbench/files', params, {
      headers: companyIds?.length ? { 'x-company-id': companyIds.join(',') } : undefined,
      responseType: 'arraybuffer'
    });

    return response.data;
  } catch (error) {
    throw toHikeError(error);
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
    throw toHikeError(error);
  }
};

export const getDetectionStatusForWorkbench = async (workbenchId: string): Promise<DetectionStatusResponse> => {
  try {
    const response = await backendApi.get(`workbench/${workbenchId}/detection`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const generateWorkbenchEvaluationPdf = async (
  workbenchId: string,
  body: GenerateWorkbenchPdfParams
): Promise<Workbench> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/generate-evaluation-pdf`, body);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
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
    throw toHikeError(error);
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
    throw toHikeError(error);
  }
};

export const uploadFiles = async (workbenchId: string, formData: FormData): Promise<{ key: string; url: string }[]> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    return response.data;
  } catch (error) {
    throw toHikeError(error);
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
    throw toHikeError(error);
  }
};

/**
 * Retrieves the statistics for workbenches.
 */
export const statsForWorkbenches = async (
  companyIds?: string[]
): Promise<{ status: WorkbenchStatus; count: number }[]> => {
  try {
    const response = await backendApi.get('workbench/stats', {
      headers: companyIds?.length ? { 'x-company-id': companyIds.join(',') } : undefined
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
