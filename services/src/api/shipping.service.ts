import { ShippingPackage, ValidateAddressBody } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const fetchCompanyPackages = async (): Promise<ShippingPackage[]> => {
  const response = await backendApi.get('shipping/packageTypes');
  return response.data;
};

export const validateAddress = async (address: ValidateAddressBody): Promise<boolean> => {
  const response = await backendApi.post('shipping/address/validate', {
    addressLine1: address.addressLine1,
    addressLine2: address.addressLine2,
    city: address.city,
    stateOrProvince: address.stateOrProvince,
    zipOrPostalCode: address.zipOrPostalCode,
    countryCode: 'US'
  });
  return response.data;
};

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
  address: ValidateAddressBody;
}

export const getRateEstimates = async ({ packages, shipDate, address }: GetRatesOrLabels) => {
  const response = await backendApi.post('shipping/rates', {
    packages,
    shipDate,
    address
  });
  return response.data;
};

export const purchaseLabelByRateId = async (rateId: string) => {
  const response = await backendApi.post(`shipping/labels/${rateId}`);
  return response.data;
};

export const voidLabel = async (labelId: string) => {
  await backendApi.put(`shipping/labels/${labelId}/void`);
};

interface SaveTrackingInfo {
  labelId: string;
  items: string[];
}

export const updateTrackingInfo = async ({ labelId, items }: SaveTrackingInfo) => {
  await backendApi.post(`shipping/labels/${labelId}/tracking`, { items });
};