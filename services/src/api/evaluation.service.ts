import type {
  ActionEvaluationParams,
  CreateEvaluationByProductParams,
  CreateEvaluationParams,
  EvaluationExtended,
  EvaluationsStats,
  EvaluationsUploadResult,
  GetEvaluationsParams,
  PagedResponse,
  PrimaryPhysiciansUploadResult,
  SearchEvaluationsParams,
  StartEvaluationByProductParams,
  UpdateEvaluationParams
} from '@hike/types';
import { toHikeError } from '../errors/HikeError';
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
  params: CreateEvaluationByProductParams
): Promise<EvaluationExtended> => {
  try {
    const response = await backendApi.post('evaluation/create/product', params);
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
    const response = await backendApi.post(`evaluation/${params.evaluationId}/edit`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const remakeEvaluation = async (params: ActionEvaluationParams): Promise<EvaluationExtended> => {
  try {
    const response = await backendApi.post(`evaluation/${params.evaluationId}/remake`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const reorderEvaluation = async (params: ActionEvaluationParams): Promise<EvaluationExtended> => {
  try {
    const response = await backendApi.post(`evaluation/${params.evaluationId}/reorder`);
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

export const findEvaluationByWorkbenchId = async (workbenchId: string): Promise<EvaluationExtended> => {
  try {
    const response = await backendApi.get(`evaluation/${workbenchId}/workbench`);
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

export const uploadEvaluations = async (
  file: File
): Promise<EvaluationsUploadResult | PrimaryPhysiciansUploadResult> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await backendApi.post('evaluation/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
