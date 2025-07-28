import { SchemaInfo } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const getSchemaInfo = async (): Promise<SchemaInfo> => {
  try {
    const response = await backendApi.get(`schema/schema/flattened-workbench`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getEnumValues = async (): Promise<Record<string, string[]>> => {
  try {
    const response = await backendApi.get('schema/enum-values');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
