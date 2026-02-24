import {
  ActionMultipleWorkbenchIdsParams,
  Asset,
  DetectionStatusResponse,
  FlattenedWorkbench,
  Foot,
  GenerateWorkbenchPdfParams,
  GetAggregatedParams,
  GetCompletedStationParams,
  GetCompleteWorkbenchParams,
  GetManufacturingWorkbenchParams,
  GetPastTenseStationsParams,
  GetPrintFarmWorkbenchParams,
  GetProjectMidnightHammerWorkbenchParams,
  GetStationsParams,
  GetWorkbenchDevSummaryParams,
  GetWorkbenchSummaryParams,
  ManufacturingWorkbench,
  Order,
  PagedResponse,
  PatientWorkbenchResponse,
  PrintFarmWorkbench,
  PrintShippingParams,
  PrintShippingResult,
  ResetWorkbenchParams,
  SearchWorkbenchParams,
  StationWorkbench,
  SubmitDeliveryParams,
  SubmitOrderParams,
  UpdateInactiveFootBody,
  Workbench,
  WorkbenchCreatedReason,
  WorkbenchDevSummary,
  WorkbenchExtended,
  WorkbenchPdfs,
  WorkbenchPdfType,
  WorkbenchStatus,
  WorkbenchSummary,
  WorkbenchValidationResultsMap
} from '@hike/types';
import { addHeaders } from '@hike/utils';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export type FootWithAssets = Foot & { assets: Asset[] };

export const searchWorkbenches = async (
  params: SearchWorkbenchParams,
  companyIds?: string[]
): Promise<PagedResponse<WorkbenchExtended[]>> => {
  try {
    const response = await backendApi.get('workbench/search', { params, headers: addHeaders(companyIds) });
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

export const getWorkbench = async (workbenchId: string, companyIds?: string[]): Promise<WorkbenchExtended> => {
  try {
    const response = await backendApi.get(`workbench/${workbenchId}`, { headers: addHeaders(companyIds) });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getWorkbenchComplete = async (
  workbenchId: string,
  params?: GetCompleteWorkbenchParams
): Promise<WorkbenchExtended> => {
  try {
    const response = await backendApi.get(`workbench/${workbenchId}/complete`, { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const submitClinicalOrder = async (workbenchId: string, body: SubmitOrderParams): Promise<Workbench> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/clinical/submit`, body);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const submitConsumerOrder = async (workbenchId: string, couponCode?: string): Promise<Workbench> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/consumer/submit`, { couponCode });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const submitSimplrOrder = async (workbenchId: string): Promise<Workbench & { orders: Order[] }> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/simplr/submit`);
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
      headers: addHeaders(companyIds)
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const printConsumerShippingDocuments = async (
  workbenchId: string,
  data: PrintShippingParams
): Promise<PrintShippingResult> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/print/shipping`, data);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const downloadPamphletPdf = async (workbenchId: string): Promise<string> => {
  try {
    const response = await backendApi.get(`workbench/${workbenchId}/pamphlet/download`);
    return response.data.pdfBase64;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const patientWorkbenchInformation = async (patientId: string): Promise<(PatientWorkbenchResponse | null)[]> => {
  try {
    const response = await backendApi.get(`workbench/patient/${patientId}`);
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

export const updateWorkbenchStatus = async (
  workbenchId: string,
  status: WorkbenchStatus,
  companyIds?: string[]
): Promise<Workbench> => {
  try {
    const response = await backendApi.post(
      `workbench/${workbenchId}/status`,
      { status },
      { headers: addHeaders(companyIds) }
    );
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const reconcileRemake = async (workbenchId: string, companyIds?: string[]): Promise<Workbench> => {
  try {
    const response = await backendApi.post(
      `workbench/${workbenchId}/reconcile-remake`,
      {},
      { headers: addHeaders(companyIds) }
    );
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

export const rushWorkbenchByCompany = async (workbenchId: string): Promise<Asset[]> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/rush/company`);
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

export const setWorkbenchCreatedReason = async (
  workbenchId: string,

  createdReason: WorkbenchCreatedReason
): Promise<Workbench> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/set-created-reason/${createdReason}`);
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
    const response = await backendApi.get('workbench/aggregate', { params, headers: addHeaders(companyIds) });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getStationWorkbenches = async (
  params?: GetStationsParams,
  companyIds?: string[]
): Promise<PagedResponse<StationWorkbench[]>> => {
  try {
    const response = await backendApi.get('workbench/stations', {
      params,
      headers: addHeaders(companyIds)
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getPastTenseStations = async (
  params: GetPastTenseStationsParams,
  companyIds?: string[]
): Promise<PagedResponse<StationWorkbench[]>> => {
  try {
    const response = await backendApi.get('workbench/past-tense-stations', {
      params,
      headers: addHeaders(companyIds)
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getCompletedStation = async (
  params: GetCompletedStationParams,
  companyIds: string[]
): Promise<PagedResponse<StationWorkbench[]>> => {
  try {
    const response = await backendApi.get('workbench/completed-station', {
      params,
      headers: addHeaders(companyIds)
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getWorkbenchPdfs = async (
  workbenchId: string,
  companyIds: string[],
  pdfType?: WorkbenchPdfType
): Promise<WorkbenchPdfs> => {
  try {
    const response = await backendApi.get(`workbench/${workbenchId}/pdfs`, {
      params: pdfType ? { type: pdfType } : undefined,
      headers: addHeaders(companyIds)
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
      headers: addHeaders(companyIds),
      responseType: 'arraybuffer'
    });

    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const generateWorkbenchPdf = async (
  workbenchId: string,
  body: GenerateWorkbenchPdfParams,
  companyIds?: string[]
): Promise<Workbench> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/generate-pdf`, body, {
      headers: addHeaders(companyIds)
    });
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

export const submitDelivery = async (workbenchId: string, body: SubmitDeliveryParams): Promise<Workbench> => {
  try {
    const response = await backendApi.post(`workbench/${workbenchId}/delivery/submit`, body);
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

export const uploadFiles = async (
  workbenchId: string,
  formData: FormData,
  { retainName }: { retainName?: boolean } = {}
): Promise<{ key: string; url: string }[]> => {
  try {
    const queryParams = retainName != null ? `?retainName=${retainName}` : '';
    const response = await backendApi.post(`workbench/${workbenchId}/upload${queryParams}`, formData, {
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
      { headers: addHeaders(companyIds) }
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
    const response = await backendApi.get('workbench/stats', { headers: addHeaders(companyIds) });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const generateWorkbenchForm = async (workbenchId: string, companyIds?: string[]): Promise<Workbench> => {
  try {
    const response = await backendApi.post(
      `workbench/${workbenchId}/generate-pdf`,
      {},
      { headers: addHeaders(companyIds) }
    );
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getWorkbenchSummary = async (
  params?: GetWorkbenchSummaryParams,
  companyIds?: string[]
): Promise<PagedResponse<WorkbenchSummary[]>> => {
  try {
    const response = await backendApi.get('workbench/summary', {
      params,
      headers: addHeaders(companyIds)
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getWorkbenchDevSummary = async (
  params?: GetWorkbenchDevSummaryParams,
  companyIds?: string[]
): Promise<PagedResponse<WorkbenchDevSummary[]>> => {
  try {
    const response = await backendApi.get('workbench/dev-summary', {
      params,
      headers: addHeaders(companyIds)
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getPrintFarmWorkbenches = async (
  params?: GetPrintFarmWorkbenchParams,
  companyIds?: string[]
): Promise<PagedResponse<PrintFarmWorkbench[]>> => {
  try {
    const response = await backendApi.get('workbench/print-farm', {
      params,
      headers: addHeaders(companyIds)
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getManufacturingWorkbenches = async (
  params?: GetManufacturingWorkbenchParams,
  companyIds?: string[]
): Promise<PagedResponse<ManufacturingWorkbench[]>> => {
  try {
    const response = await backendApi.get('workbench/manufacturing', {
      params,
      headers: addHeaders(companyIds)
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

/**
 * Fetches workbenches that have Project Midnight Hammer files available.
 */
export const getProjectMidnightHammerWorkbenches = async (
  params?: GetProjectMidnightHammerWorkbenchParams,
  companyIds?: string[]
): Promise<PagedResponse<ManufacturingWorkbench[]>> => {
  try {
    const response = await backendApi.get('workbench/midnight-hammer', {
      params,
      headers: addHeaders(companyIds)
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const printProjectMidnightHammer = async (workbenchId: string, companyIds?: string[]): Promise<void> => {
  try {
    await backendApi.post(`workbench/${workbenchId}/midnight-hammer/print`, {}, { headers: addHeaders(companyIds) });
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getValidationResults = async (
  workbenchIds: string[],
  companyIds?: string[]
): Promise<WorkbenchValidationResultsMap> => {
  try {
    const response = await backendApi.get('workbench/validation-results', {
      params: { workbenchIds },
      headers: addHeaders(companyIds)
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
