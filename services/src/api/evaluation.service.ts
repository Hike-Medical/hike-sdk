import type {
  CreateEvaluationParams,
  EvaluationExtended,
  EvaluationsStats,
  EvaluationsUploadResult,
  GetEvaluationsParams,
  PagedResponse,
  SearchEvaluationsParams
} from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const createEvaluation = async (params: CreateEvaluationParams): Promise<EvaluationExtended> => {
  const response = await backendApi.post('evaluation', params);
  return response.data;
};

export const findEvaluationById = async (evaluationId: string): Promise<EvaluationExtended> => {
  const response = await backendApi.get(`evaluation/${evaluationId}`);
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
export const statsForEvaluations = async (clinicianId?: string): Promise<EvaluationsStats> => {
  const response = await backendApi.get('evaluation/stats', { params: { clinicianId } });
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
