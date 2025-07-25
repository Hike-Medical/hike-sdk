import type { DeviceType, PagedParams, PagedResponse } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const findDeviceTypeById = async (deviceTypeId: string): Promise<DeviceType> => {
  try {
    const response = await backendApi.get(`device-type/${deviceTypeId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchDeviceTypes = async (params?: PagedParams): Promise<PagedResponse<DeviceType[]>> => {
  try {
    const response = await backendApi.get('device-type', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const searchDeviceTypes = async (term: string, params?: PagedParams): Promise<PagedResponse<DeviceType[]>> => {
  try {
    const response = await backendApi.get('device-type/search', { params: { term, ...params } });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
