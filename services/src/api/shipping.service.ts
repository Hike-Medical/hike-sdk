import {
  GetShipengineShipmentsParams,
  GetShipengineShipmentsResponse,
  ShippingLabelResponseByShipmentId,
  ShippingPackage,
  ValidateAddressBody
} from '@hike/types';
import { toResponseError } from '../errors/ResponseError';
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

interface SaveTrackingInfo {
  labelId: string;
  items: string[];
}

export const fetchCompanyPackages = async (): Promise<ShippingPackage[]> => {
  try {
    const response = await backendApi.get('shipping/packageTypes');
    return response.data;
  } catch (error) {
    throw toResponseError(error);
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
    throw toResponseError(error);
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
    throw toResponseError(error);
  }
};

export const purchaseLabelByRateId = async (rateId: string) => {
  try {
    const response = await backendApi.post(`shipping/labels/${rateId}`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const voidLabel = async (labelId: string) => {
  try {
    await backendApi.put(`shipping/labels/${labelId}/void`);
  } catch (error) {
    throw toResponseError(error);
  }
};

export const updateTrackingInfo = async ({ labelId, items }: SaveTrackingInfo) => {
  try {
    await backendApi.post(`shipping/labels/${labelId}/tracking`, { items });
  } catch (error) {
    throw toResponseError(error);
  }
};

export const fetchShipments = async (params: GetShipengineShipmentsParams): Promise<GetShipengineShipmentsResponse> => {
  try {
    const response = await backendApi.get(`shipping/shipments`, { params });
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const fetchOrdersByShipmentId = async (shipmentId: string): Promise<ShippingLabelResponseByShipmentId> => {
  try {
    const response = await backendApi.get(`shipping/orders/${shipmentId}`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
