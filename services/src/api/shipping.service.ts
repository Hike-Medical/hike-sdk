import {
  GetShipengineLabelsParams,
  GetShipengineLabelsResponse,
  GetShipengineShipmentsParams,
  GetShipengineShipmentsResponse,
  LabelsResponse,
  SaveTrackingInfoParams,
  ShippingLabel,
  ShippingLabelResponseByShipmentId,
  ShippingPackage,
  ValidateAddressBody
} from '@hike/types';
import { toHikeError } from '../errors/HikeError';
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
  address?: ValidateAddressBody;
  addressId?: string;
  billRecipient?: boolean;
}

export const fetchCompanyPackages = async (): Promise<ShippingPackage[]> => {
  try {
    const response = await backendApi.get('shipping/packageTypes');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const validateAddress = async (address: ValidateAddressBody): Promise<boolean> => {
  try {
    const response = await backendApi.post('shipping/address/validate', {
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      city: address.city,
      stateOrProvince: address.stateOrProvince,
      postalCode: address.postalCode,
      countryCode: 'US'
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getRateEstimates = async ({ packages, shipDate, address, addressId, billRecipient }: GetRatesOrLabels) => {
  try {
    const response = await backendApi.post('shipping/rates', {
      packages,
      shipDate,
      address,
      addressId,
      billRecipient
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const purchaseLabelByRateId = async (rateId: string) => {
  try {
    const response = await backendApi.post(`shipping/labels/${rateId}`);
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

export const fetchOrdersByLabelId = async (labelId: string): Promise<ShippingLabelResponseByShipmentId> => {
  try {
    const response = await backendApi.get(`shipping/orders/${labelId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
