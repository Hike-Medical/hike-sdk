import type { EvaluationExtended, GetSearchParams, PagedResponse, PatientExtended, SqlQueryParams } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const globalSearch = async (
  params: GetSearchParams
): Promise<{ patients: PagedResponse<PatientExtended[]>; evaluations: PagedResponse<EvaluationExtended[]> }> => {
  try {
    const response = await backendApi.get('search', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const sqlSearchQuery = async (body: SqlQueryParams): Promise<unknown> => {
  try {
    const response = await backendApi.post('search/sql', body);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export interface SchemaInfo {
  fields: string[];
  columnTypes: Record<string, string>;
}

export const getSchemaInfo = async (): Promise<SchemaInfo> => {
  try {
    const response = await backendApi.get(`search/schema/flattened-workbench`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getEnumValues = async (): Promise<Record<string, string[]>> => {
  try {
    const response = await backendApi.get('search/enum-values');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
