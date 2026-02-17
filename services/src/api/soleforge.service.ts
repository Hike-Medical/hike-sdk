import {
  AddLabelPrinterParams,
  AddPrinter3DParams,
  AdvanceManualReprintOrderToGrindingParams,
  AdvanceManualReprintOrderToGrindingResponse,
  AnomalyOrdersResponse,
  AssignMachineToLaneParams,
  BulkAddPrinter3DParams,
  BulkMarkPrintJobsAsFailedParams,
  BulkMarkPrintJobsAsFailedResponse,
  CancelLaneQueuedJobParams,
  CancelLaneQueuedJobResponse,
  CancelPrintJobParams,
  CancelPrintJobResponse,
  CompatiblePrinter,
  CompatibleSoleforgeOrder,
  Configuration,
  CreateConfigurationParams,
  CreateLaneParams,
  GetAnomalyOrdersParams,
  GetCompatibleOrdersParams,
  GetCompatiblePrintersParams,
  GetLabelPrintersParams,
  GetLanesParams,
  GetMachinesParams,
  GetOrdersByShipByAgeParams,
  GetOrderStatusCountsParams,
  GetOrderThroughputParams,
  GetPrinterHistoryParams,
  GetValidMachineStateTransitionsParams,
  LabelPrinter,
  Lane,
  LaneQueuedJobCountResponse,
  LaneQueueEntry,
  Machine,
  ManualReprintOrdersResponse,
  MarkManualReprintOrderAsPrintingParams,
  MarkManualReprintOrderAsPrintingResponse,
  MarkPrintJobAsFailedParams,
  MarkPrintJobAsFailedResponse,
  OrdersByShipByAgeResponse,
  OrderStatusCount,
  OrderThroughputResponse,
  Printer3D,
  PrintJob,
  PrintOrderLabelParams,
  PrintOrderLabelResponse,
  QueueOrderToLaneParams,
  QueueOrderToLaneResponse,
  QueuePrintJobsParams,
  RejectPrintJobAndReprintParams,
  RejectPrintJobAndReprintResponse,
  RevertGrindingOrderParams,
  RevertGrindingOrderResponse,
  RevertManualReprintOrderParams,
  RevertManualReprintOrderResponse,
  RevertOrderToManufacturingParams,
  RevertOrderToManufacturingResponse,
  RevertOrderToPrintingParams,
  RevertOrderToPrintingResponse,
  ShippingStationConfiguration,
  SoleforgeDashboard,
  SoleforgePrintJobWithAsset,
  TriggerPrinterReadyParams,
  TriggerPrinterReadyResponse,
  UpdateLaneParams,
  UpdateMachineConfigurationParams,
  UpdateMachineStatusParams,
  UpdatePrinterNotesParams,
  ValidMachineStateTransitions
} from '@hike/types';
import { addHeaders } from '@hike/utils';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const getLanes = async (params?: GetLanesParams): Promise<Lane[]> => {
  try {
    const response = await backendApi.get('soleforge/lanes', { params });
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

export const getSoleforgeDashboard = async (params?: GetLanesParams): Promise<SoleforgeDashboard> => {
  try {
    const response = await backendApi.get('soleforge/dashboard', { params });
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

export const getManualReprintOrders = async (
  params?: Pick<GetCompatibleOrdersParams, 'statuses'>
): Promise<ManualReprintOrdersResponse> => {
  try {
    const response = await backendApi.get('soleforge/manual-reprint-orders', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

/**
 * Check if an order requires manual printing (shoe size > 13 or SHELL slicer profile).
 */
export const checkIfManualPrintRequired = async (orderId: string): Promise<{ isManualPrint: boolean }> => {
  try {
    const response = await backendApi.get(`soleforge/orders/${orderId}/check-if-manual-print-required`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getAnomalyOrders = async (params?: GetAnomalyOrdersParams): Promise<AnomalyOrdersResponse> => {
  try {
    const response = await backendApi.get('soleforge/anomaly-orders', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getOrderThroughput = async (params: GetOrderThroughputParams): Promise<OrderThroughputResponse> => {
  try {
    const response = await backendApi.get('soleforge/throughput', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getOrderStatusCounts = async (params?: GetOrderStatusCountsParams): Promise<OrderStatusCount[]> => {
  try {
    const response = await backendApi.get('soleforge/order-status-counts', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getOrdersByShipByAge = async (params?: GetOrdersByShipByAgeParams): Promise<OrdersByShipByAgeResponse> => {
  try {
    const response = await backendApi.get('soleforge/get-orders-by-ship-by-age', { params });
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
    const { machineId, ...body } = params;
    const response = await backendApi.patch(`soleforge/machines/${machineId}/status`, body);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updatePrinterNotes = async (params: UpdatePrinterNotesParams): Promise<Printer3D> => {
  try {
    const { printerId, notes } = params;
    const response = await backendApi.patch(`soleforge/printers-3d/${printerId}/notes`, { notes });
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

export const markPrintJobAsFailed = async (
  params: MarkPrintJobAsFailedParams
): Promise<MarkPrintJobAsFailedResponse> => {
  try {
    const { printJobId, ticketId, failureReason, source, jwtToken } = params;
    const response = await backendApi.post(
      `soleforge/print-jobs/${printJobId}/fail`,
      { ticketId, failureReason, source },
      { headers: addHeaders(undefined, { Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined }) }
    );
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const bulkMarkPrintJobsAsFailed = async (
  params: BulkMarkPrintJobsAsFailedParams
): Promise<BulkMarkPrintJobsAsFailedResponse> => {
  try {
    const { printJobIds, ticketId, failureReason, source, jwtToken } = params;
    const response = await backendApi.post(
      'soleforge/print-jobs/bulk-fail',
      { printJobIds, ticketId, failureReason, source },
      { headers: addHeaders(undefined, { Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined }) }
    );
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const cancelPrintJob = async (params: CancelPrintJobParams): Promise<CancelPrintJobResponse> => {
  try {
    const { printJobId, ticketId, cancellationReason, source, jwtToken } = params;
    const response = await backendApi.post(
      `soleforge/print-jobs/${printJobId}/cancel`,
      { ticketId, cancellationReason, source },
      { headers: addHeaders(undefined, { Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined }) }
    );
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const revertOrderToPrinting = async (
  params: RevertOrderToPrintingParams
): Promise<RevertOrderToPrintingResponse> => {
  try {
    const { orderId, ticketId, revertReason, source, jwtToken } = params;
    const response = await backendApi.post(
      `soleforge/orders/${orderId}/revert-to-printing`,
      { ticketId, revertReason, source },
      { headers: addHeaders(undefined, { Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined }) }
    );
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const markManualReprintOrderAsPrinting = async (
  params: MarkManualReprintOrderAsPrintingParams
): Promise<MarkManualReprintOrderAsPrintingResponse> => {
  try {
    const { orderId, jwtToken } = params;
    const response = await backendApi.post(
      `soleforge/orders/${orderId}/mark-manual-reprint-as-printing`,
      {},
      { headers: addHeaders(undefined, { Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined }) }
    );
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const advanceManualReprintOrderToGrinding = async (
  params: AdvanceManualReprintOrderToGrindingParams
): Promise<AdvanceManualReprintOrderToGrindingResponse> => {
  try {
    const { orderId, ticketId, advanceReason, source, jwtToken } = params;
    const response = await backendApi.post(
      `soleforge/orders/${orderId}/advance-manual-reprint-to-grinding`,
      { ticketId, advanceReason, source },
      { headers: addHeaders(undefined, { Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined }) }
    );
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const revertManualReprintOrderToManufacturing = async (
  params: RevertManualReprintOrderParams
): Promise<RevertManualReprintOrderResponse> => {
  try {
    const { orderId, ticketId, revertReason, source, jwtToken } = params;
    const response = await backendApi.post(
      `soleforge/orders/${orderId}/revert-manual-reprint-to-manufacturing`,
      { ticketId, revertReason, source },
      { headers: addHeaders(undefined, { Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined }) }
    );
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const revertGrindingOrderToManufacturing = async (
  params: RevertGrindingOrderParams
): Promise<RevertGrindingOrderResponse> => {
  try {
    const { orderId, ticketId, revertReason, source, jwtToken } = params;
    const response = await backendApi.post(
      `soleforge/orders/${orderId}/revert-grinding-to-manufacturing`,
      { ticketId, revertReason, source },
      { headers: addHeaders(undefined, { Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined }) }
    );
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const revertOrderToManufacturing = async (
  params: RevertOrderToManufacturingParams
): Promise<RevertOrderToManufacturingResponse> => {
  try {
    const { orderId, ticketId, revertReason, source, jwtToken } = params;
    const response = await backendApi.post(
      `soleforge/orders/${orderId}/revert-to-manufacturing`,
      { ticketId, revertReason, source },
      { headers: addHeaders(undefined, { Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined }) }
    );
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const triggerPrinterReady = async (params: TriggerPrinterReadyParams): Promise<TriggerPrinterReadyResponse> => {
  try {
    const response = await backendApi.post(`soleforge/printers/${params.printerId}/trigger-ready`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getLabelPrinters = async (params?: GetLabelPrintersParams): Promise<LabelPrinter[]> => {
  try {
    const response = await backendApi.get('soleforge/label-printers', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

/**
 * Queue an order to a lane, creating lane-queued print jobs.
 */
export const queueOrderToLane = async (params: QueueOrderToLaneParams): Promise<QueueOrderToLaneResponse> => {
  try {
    const { jwtToken, ...body } = params;
    const response = await backendApi.post('soleforge/queue-order-to-lane', body, {
      headers: addHeaders(undefined, { Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined })
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const printOrderLabel = async (
  orderId: string,
  params: PrintOrderLabelParams
): Promise<PrintOrderLabelResponse> => {
  try {
    const response = await backendApi.post(`soleforge/orders/${orderId}/print-label`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

/**
 * Get the queue of print jobs for a specific lane.
 */
export const getLaneQueue = async (laneId: string): Promise<LaneQueueEntry[]> => {
  try {
    const response = await backendApi.get(`soleforge/lanes/${laneId}/queue`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

/**
 * Cancel a lane-queued job with confirmation details.
 */
export const cancelLaneQueuedJob = async (params: CancelLaneQueuedJobParams): Promise<CancelLaneQueuedJobResponse> => {
  try {
    const { jobId, jwtToken, ...body } = params;
    const response = await backendApi.delete(`soleforge/lane-queued-jobs/${jobId}`, {
      data: body,
      headers: addHeaders(undefined, { Authorization: jwtToken ? `Bearer ${jwtToken}` : undefined })
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

/**
 * Get the count of queued jobs for a specific lane.
 * Useful for displaying warnings when modifying lane configuration.
 */
export const getLaneQueuedJobCount = async (laneId: string): Promise<LaneQueuedJobCountResponse> => {
  try {
    const response = await backendApi.get(`soleforge/lanes/${laneId}/queue/count`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

/**
 * Reject a print job and queue a reprint to a specified lane.
 * Creates a QCRejection record for audit tracking.
 */
export const rejectPrintJobAndReprint = async (
  params: RejectPrintJobAndReprintParams
): Promise<RejectPrintJobAndReprintResponse> => {
  try {
    const { printJobId, ...body } = params;
    const response = await backendApi.post(`soleforge/print-jobs/${printJobId}/reject-and-reprint`, body);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

/**
 * Report a missing INSOLE_RENDER (STL) asset for a manual reprint order.
 * Sends a Slack notification to the printfarm channel.
 */
export const reportMissingStl = async (params: {
  orderId: string;
  poNumber: string;
  workbenchId: string;
}): Promise<{ reported: boolean }> => {
  try {
    const response = await backendApi.post(`soleforge/orders/${params.orderId}/report-missing-stl`, {
      poNumber: params.poNumber,
      workbenchId: params.workbenchId
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
