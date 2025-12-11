import {
  GetMachinesParams,
  Lane,
  Machine,
  PrintJob,
  QueuePrintJobsParams,
  ShippingStationConfiguration
} from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const getLanes = async (): Promise<Lane[]> => {
  try {
    const response = await backendApi.get('soleforge/lanes');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getMachines = async (params: GetMachinesParams): Promise<Machine[]> => {
  try {
    const response = await backendApi.get('soleforge/machines', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getShippingStationConfigurations = async (): Promise<ShippingStationConfiguration[]> => {
  try {
    const response = await backendApi.get('soleforge/shipping-station-configurations');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const queuePrintJobs = async (params: QueuePrintJobsParams): Promise<PrintJob | null> => {
  try {
    const response = await backendApi.post('soleforge/queue-print-jobs', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
