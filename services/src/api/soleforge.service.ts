import {
  AddLabelPrinterParams,
  AddPrinter3DParams,
  AssignMachineToLaneParams,
  BulkAddPrinter3DParams,
  CompatiblePrinter,
  CompatibleSoleforgeOrder,
  Configuration,
  CreateConfigurationParams,
  CreateLaneParams,
  GetCompatibleOrdersParams,
  GetCompatiblePrintersParams,
  GetMachinesParams,
  GetPrinterHistoryParams,
  GetValidMachineStateTransitionsParams,
  Lane,
  Machine,
  Printer3D,
  PrintJob,
  QueuePrintJobsParams,
  ShippingStationConfiguration,
  SoleforgeDashboard,
  SoleforgePrintJobWithAsset,
  UpdateLaneParams,
  UpdateMachineConfigurationParams,
  UpdateMachineStatusParams,
  ValidMachineStateTransitions
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

export const getConfigurations = async (): Promise<Configuration[]> => {
  try {
    const response = await backendApi.get('soleforge/configurations');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const createConfiguration = async (params: CreateConfigurationParams): Promise<Configuration> => {
  try {
    const response = await backendApi.post('soleforge/configurations', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const createLane = async (params: CreateLaneParams): Promise<Lane> => {
  try {
    const response = await backendApi.post('soleforge/lanes', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateLane = async (params: UpdateLaneParams): Promise<Lane> => {
  try {
    const { laneId, ...body } = params;
    const response = await backendApi.patch(`soleforge/lanes/${laneId}`, body);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const deleteLane = async (laneId: string): Promise<void> => {
  try {
    await backendApi.delete(`soleforge/lanes/${laneId}`);
  } catch (error) {
    throw toHikeError(error);
  }
};

export const addPrinter3D = async (params: AddPrinter3DParams): Promise<Machine & { printer3Ds: Printer3D[] }> => {
  try {
    const response = await backendApi.post('soleforge/printers-3d', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const bulkAddPrinter3D = async (
  params: BulkAddPrinter3DParams
): Promise<(Machine & { printer3Ds: Printer3D[] })[]> => {
  try {
    const response = await backendApi.post('soleforge/printers-3d/bulk', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const addLabelPrinter = async (params: AddLabelPrinterParams): Promise<Machine> => {
  try {
    const response = await backendApi.post('soleforge/label-printers', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const assignMachineToLane = async (params: AssignMachineToLaneParams): Promise<Machine> => {
  try {
    const { machineId, laneId } = params;
    const response = await backendApi.patch(`soleforge/machines/${machineId}/lane`, { laneId });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateMachineConfiguration = async (params: UpdateMachineConfigurationParams): Promise<Machine> => {
  try {
    const { machineId, configurationId } = params;
    const response = await backendApi.patch(`soleforge/machines/${machineId}/configuration`, { configurationId });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getCompatibleOrders = async (params?: GetCompatibleOrdersParams): Promise<CompatibleSoleforgeOrder[]> => {
  try {
    const response = await backendApi.get('soleforge/compatible-orders', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getCompatiblePrinters = async (params: GetCompatiblePrintersParams): Promise<CompatiblePrinter[]> => {
  try {
    const { orderId, ...queryParams } = params;
    const response = await backendApi.get(`soleforge/orders/${orderId}/compatible-printers`, { params: queryParams });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getValidMachineStateTransitions = async (
  params: GetValidMachineStateTransitionsParams
): Promise<ValidMachineStateTransitions> => {
  try {
    const { machineId, ...queryParams } = params;
    const response = await backendApi.get(`soleforge/machines/${machineId}/valid-state-transitions`, {
      params: queryParams
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateMachineStatus = async (params: UpdateMachineStatusParams): Promise<Machine> => {
  try {
    const { machineId, status } = params;
    const response = await backendApi.patch(`soleforge/machines/${machineId}/status`, { status });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getPrinterHistory = async (params: GetPrinterHistoryParams): Promise<SoleforgePrintJobWithAsset[]> => {
  try {
    const { printerId, ...queryParams } = params;
    const response = await backendApi.get(`soleforge/printers/${printerId}/history`, { params: queryParams });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
