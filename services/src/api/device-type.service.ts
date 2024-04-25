import type { DeviceType, PagedParams, PagedResponse } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const findDeviceTypeById = async (deviceTypeId: string): Promise<DeviceType> => {
  const response = await backendApi.get(`device-type/${deviceTypeId}`);
  return response.data;
};

export const fetchDeviceTypes = async (params?: PagedParams): Promise<PagedResponse<DeviceType[]>> => {
  const response = await backendApi.get('device-type', { params });
  return response.data;
};

export const searchDeviceTypes = async (term: string, params?: PagedParams): Promise<PagedResponse<DeviceType[]>> => {
  const response = await backendApi.get('device-type/search', { params: { term, ...params } });
  return response.data;
};
