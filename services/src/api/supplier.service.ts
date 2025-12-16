import type {
  CatalogProductExtended,
  CatalogSupplier,
  GetOrthofeetProductStylesParams,
  GetOrthofeetProductStyleVariantsParams,
  GetSuppliersParams,
  OrthofeetFiltersResponse,
  OrthofeetProductStyle,
  PagedResponse
} from '@hike/types';
import { GetOrthofeetInventoryResponse } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const fetchSuppliers = async (params?: GetSuppliersParams): Promise<PagedResponse<CatalogSupplier[]>> => {
  try {
    const response = await backendApi.get('supplier', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

// Orthofeet

export const fetchOrthofeetInventory = async (sku: string | string[]): Promise<GetOrthofeetInventoryResponse> => {
  try {
    const skus = Array.isArray(sku) ? sku : [sku];
    const response = await backendApi.get(`supplier/orthofeet/inventory`, { params: { skus } });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchOrthofeetFilters = async (): Promise<OrthofeetFiltersResponse> => {
  try {
    const response = await backendApi.get('supplier/orthofeet/filters');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchOrthofeetProductStyles = async (
  params: GetOrthofeetProductStylesParams
): Promise<PagedResponse<OrthofeetProductStyle[]>> => {
  try {
    const response = await backendApi.get('supplier/orthofeet/product/style', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchOrthofeetProductStyleVariants = async (
  params: GetOrthofeetProductStyleVariantsParams
): Promise<CatalogProductExtended[]> => {
  try {
    const response = await backendApi.get('supplier/orthofeet/product/style/variants', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
