import type {
  ActionEvaluationParams,
  CreateEvaluationByProductParams,
  CreateEvaluationParams,
  EvaluationExtended,
  EvaluationsStats,
  GetEvaluationsByPatientParams,
  GetEvaluationsParams,
  GetFilteredEvaluationsParams,
  PagedResponse,
  SearchEvaluationsParams,
  StartEvaluationByProductParams,
  UpdateEvaluationParams
} from '@hike/types';
import { addHeaders } from '@hike/utils';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const createEvaluation = async (params: CreateEvaluationParams): Promise<EvaluationExtended> => {
  try {
    const response = await backendApi.post('evaluation', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateEvaluation = async (
  evaluationId: string,
  params: UpdateEvaluationParams
): Promise<EvaluationExtended> => {
  try {
    const response = await backendApi.patch(`evaluation/${evaluationId}`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const createEvaluationByProduct = async (
  params: CreateEvaluationByProductParams,
  companyId?: string
): Promise<EvaluationExtended> => {
  try {
    const response = await backendApi.post(
      'evaluation/create/product',
      params,
      companyId
        ? {
            headers: { 'x-company-id': companyId }
          }
        : undefined
    );

    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const startEvaluationByProduct = async (params: StartEvaluationByProductParams): Promise<EvaluationExtended> => {
  try {
    const response = await backendApi.post('evaluation/start/product', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const cancelEvaluation = async (params: ActionEvaluationParams): Promise<EvaluationExtended> => {
  try {
    const response = await backendApi.post(`evaluation/${params.evaluationId}/cancel`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const editEvaluation = async (params: ActionEvaluationParams): Promise<EvaluationExtended> => {
  try {
    const response = await backendApi.post(
      `evaluation/${params.evaluationId}/edit`,
      {},
      { headers: addHeaders(params.companyIds) }
    );
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const remakeEvaluation = async (params: ActionEvaluationParams): Promise<EvaluationExtended> => {
  try {
    const response = await backendApi.post(
      `evaluation/${params.evaluationId}/remake`,
      {},
      { headers: addHeaders(params.companyIds) }
    );
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const reorderEvaluation = async (params: ActionEvaluationParams): Promise<EvaluationExtended> => {
  try {
    const response = await backendApi.post(
      `evaluation/${params.evaluationId}/reorder`,
      {},
      { headers: addHeaders(params.companyIds) }
    );
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const adjustmentEvaluation = async (params: ActionEvaluationParams): Promise<EvaluationExtended> => {
  try {
    const response = await backendApi.post(
      `evaluation/${params.evaluationId}/adjustment`,
      { notes: params.notes },
      { headers: addHeaders(params.companyIds) }
    );
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findEvaluationById = async (evaluationId: string): Promise<EvaluationExtended> => {
  try {
    const response = await backendApi.get(`evaluation/${evaluationId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findEvaluationsByPatientId = async (
  patientId: string,
  params?: GetEvaluationsByPatientParams
): Promise<PagedResponse<EvaluationExtended[]>> => {
  try {
    const response = await backendApi.get(`evaluation/patient/${patientId}`, { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findEvaluationByWorkbenchId = async (workbenchId: string): Promise<EvaluationExtended> => {
  try {
    const response = await backendApi.get(`evaluation/workbench/${workbenchId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findEvaluations = async (params: GetEvaluationsParams): Promise<PagedResponse<EvaluationExtended[]>> => {
  try {
    const response = await backendApi.get('evaluation', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const searchEvaluations = async (
  params: SearchEvaluationsParams
): Promise<PagedResponse<EvaluationExtended[]>> => {
  try {
    const response = await backendApi.get('evaluation/search', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findFilteredEvaluations = async (
  params: GetFilteredEvaluationsParams
): Promise<PagedResponse<EvaluationExtended[]>> => {
  try {
    const response = await backendApi.get('evaluation/filtered', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

/**
 * Retrieves the statistics for evaluations.
 */
export const statsForEvaluations = async (assignedOnly?: boolean): Promise<EvaluationsStats> => {
  try {
    const response = await backendApi.get('evaluation/stats', { params: { assignedOnly } });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
