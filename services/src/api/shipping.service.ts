import {
  CompletePackingJobBody,
  CompletePackingJobResponse,
  GetShipengineLabelsParams,
  GetShipengineLabelsResponse,
  GetShipengineShipmentsParams,
  GetShipengineShipmentsResponse,
  LabelsResponse,
  PackingJobsResponse,
  SaveTrackingInfoParams,
  ShipEngineValidateAddressResponse,
  ShippingAddressBody,
  ShippingLabel,
  ShippingLabelResponseByShipmentId,
  ShippingPackage,
  ValidateAddressBody
} from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

interface Package {
  items: string[];
  weight: number;
  length: number;
  width: number;
  height: number;
}

export interface GetRatesOrLabels {
  packages: Package[];
  shipDate: string;
  address?: ShippingAddressBody;
  addressId?: string;
}

export const fetchCompanyPackages = async (): Promise<ShippingPackage[]> => {
  try {
    const response = await backendApi.get('shipping/packageTypes');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchPackagesForOrders = async (orderIds: string[]): Promise<ShippingPackage[]> => {
  try {
    const response = await backendApi.post('shipping/packages-for-orders', { orderIds });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const validateAddress = async (address: ValidateAddressBody): Promise<ShipEngineValidateAddressResponse[]> => {
  try {
    const response = await backendApi.post('shipping/address/validate', address);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getRateEstimates = async (params: GetRatesOrLabels) => {
  try {
    const response = await backendApi.post('shipping/rates', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const purchaseLabelByRateId = async (rateId: string, addressId?: string) => {
  try {
    const response = await backendApi.post(`shipping/labels/${rateId}`, addressId ? { addressId } : {});
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const voidLabel = async (labelId: string, voidShippedLabel?: boolean) => {
  try {
    await backendApi.put(`shipping/labels/${labelId}/void`, { voidShippedLabel });
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateTrackingInfo = async (labelId: string, params: SaveTrackingInfoParams) => {
  try {
    await backendApi.post(`shipping/labels/${labelId}/tracking`, params);
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchShipments = async (params: GetShipengineShipmentsParams): Promise<GetShipengineShipmentsResponse> => {
  try {
    const response = await backendApi.get(`shipping/shipments`, { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchLabels = async (params: GetShipengineLabelsParams): Promise<GetShipengineLabelsResponse> => {
  try {
    const response = await backendApi.get(`shipping/labels`, { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchLabelByShippingId = async (shippingId: string): Promise<LabelsResponse> => {
  try {
    const response = await backendApi.post(`shipping/label/${shippingId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getPackingSlip = async (shipmentId: string): Promise<string> => {
  try {
    const response = await backendApi.post(`shipping/label/packing-slip/${shipmentId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchPendingShippingLabels = async (): Promise<ShippingLabel[]> => {
  try {
    const response = await backendApi.get(`shipping/labels/pending`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findShippingLabels = async (query: string): Promise<ShippingLabel[]> => {
  try {
    const response = await backendApi.get(`shipping/labels/search`, { params: { query } });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchOrdersByLabelId = async (labelId: string): Promise<ShippingLabelResponseByShipmentId> => {
  try {
    const response = await backendApi.get(`shipping/orders/${labelId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchPackingJobs = async (): Promise<PackingJobsResponse> => {
  try {
    const response = await backendApi.get('shipping/packing-jobs');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const completePackingJob = async (body: CompletePackingJobBody): Promise<CompletePackingJobResponse> => {
  try {
    const response = await backendApi.post('shipping/packing-jobs/complete', body);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
