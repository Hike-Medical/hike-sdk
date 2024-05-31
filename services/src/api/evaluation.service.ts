import type {
  ActionEvaluationParams,
  CreateEvaluationByProductParams,
  CreateEvaluationParams,
  EvaluationExtended,
  EvaluationsStats,
  EvaluationsUploadResult,
  GetEvaluationsParams,
  PagedResponse,
  SearchEvaluationsParams,
  StartEvaluationByProductParams,
  UpdateEvaluationParams
} from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const createEvaluation = async (params: CreateEvaluationParams): Promise<EvaluationExtended> => {
  const response = await backendApi.post('evaluation', params);
  return response.data;
};

export const updateEvaluation = async (
  evaluationId: string,
  params: UpdateEvaluationParams
): Promise<EvaluationExtended> => {
  const response = await backendApi.patch(`evaluation/${evaluationId}`, params);
  return response.data;
};

export const createEvaluationByProduct = async (
  params: CreateEvaluationByProductParams
): Promise<EvaluationExtended> => {
  const response = await backendApi.post('evaluation/create/product', params);
  return response.data;
};

export const startEvaluationByProduct = async (params: StartEvaluationByProductParams): Promise<EvaluationExtended> => {
  const response = await backendApi.post('evaluation/start/product', params);
  return response.data;
};

export const cancelEvaluation = async (params: ActionEvaluationParams): Promise<EvaluationExtended> => {
  const response = await backendApi.post(`evaluation/${params.evaluationId}/cancel`);
  return response.data;
};

export const editEvaluation = async (params: ActionEvaluationParams): Promise<EvaluationExtended> => {
  const response = await backendApi.post(`evaluation/${params.evaluationId}/edit`);
  return response.data;
};

export const remakeEvaluation = async (params: ActionEvaluationParams): Promise<EvaluationExtended> => {
  const response = await backendApi.post(`evaluation/${params.evaluationId}/remake`);
  return response.data;
};

export const findEvaluationById = async (evaluationId: string): Promise<EvaluationExtended> => {
  const response = await backendApi.get(`evaluation/${evaluationId}`);
  return response.data;
};

export const findEvaluationByWorkbenchId = async (workbenchId: string): Promise<EvaluationExtended> => {
  const response = await backendApi.get(`evaluation/${workbenchId}/workbench`);
  return response.data;
};

export const findEvaluations = async (params: GetEvaluationsParams): Promise<PagedResponse<EvaluationExtended[]>> => {
  const response = await backendApi.get('evaluation', { params });
  return response.data;
};

export const searchEvaluations = async (
  params: SearchEvaluationsParams
): Promise<PagedResponse<EvaluationExtended[]>> => {
  const response = await backendApi.get('evaluation/search', { params });
  return response.data;
};

/**
 * Retrieves the statistics for evaluations.
 */
export const statsForEvaluations = async (assignedOnly?: boolean): Promise<EvaluationsStats> => {
  const response = await backendApi.get('evaluation/stats', { params: { assignedOnly } });
  return response.data;
};

export const uploadEvaluations = async (file: File): Promise<EvaluationsUploadResult> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await backendApi.post('evaluation/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

  return response.data;
};
