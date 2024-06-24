import { CreatePinDto } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const getPinStatus = async (): Promise<boolean> => {
  const response = await backendApi.get('pin');
  return response.data;
};

export const deletePin = async (): Promise<void> => {
  await backendApi.delete('pin');
};

export const createPin = async (body: CreatePinDto): Promise<void> => {
  const response = await backendApi.post('pin', body);
  return response.data;
};
