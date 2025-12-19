import {
  GetMachinesParams,
  GetOeeMetricsParams,
  Lane,
  Machine,
  OeeMetricsResponse,
  PrintJob,
  QueuePrintJobsParams,
  ShippingStationConfiguration,
  SoleforgeDashboard,
  UpdateMachineStatusParams
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

export const getSoleforgeDashboard = async (): Promise<SoleforgeDashboard> => {
  try {
    const response = await backendApi.get('soleforge/dashboard');
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

export const getOeeMetrics = async (params: GetOeeMetricsParams): Promise<OeeMetricsResponse> => {
  try {
    const response = await backendApi.get('soleforge/oee', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateMachineStatus = async (params: UpdateMachineStatusParams): Promise<Machine> => {
  try {
    const response = await backendApi.patch(`soleforge/machines/${params.machineId}/status`, {
      status: params.status
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
