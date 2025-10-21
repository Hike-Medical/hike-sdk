import type {
  CatalogProductExtended,
  CatalogSupplier,
  GetOrthofeetFiltersParams,
  GetOrthofeetStyleProductsParams,
  GetOrthofeetStyleVariantsParams,
  GetSuppliersParams,
  OrthofeetFiltersResponse,
  PagedResponse
} from '@hike/types';
import { GetOrthofeetInventoryResponse } from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const fetchOrthofeetInventoryBySkus = async (skus: string[]): Promise<GetOrthofeetInventoryResponse> => {
  try {
    const response = await backendApi.get(`supplier/orthofeet/inventory`, {
      params: {
        skus
      }
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchOrthofeetInventoryBySku = async (sku: string): Promise<GetOrthofeetInventoryResponse> => {
  try {
    const response = await backendApi.get(`supplier/orthofeet/inventory/sku/${encodeURIComponent(sku)}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchOrthofeetInventoryByProduct = async (productId: string): Promise<GetOrthofeetInventoryResponse> => {
  try {
    const response = await backendApi.get(`supplier/orthofeet/inventory/product/${encodeURIComponent(productId)}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchSuppliers = async (params?: GetSuppliersParams): Promise<PagedResponse<CatalogSupplier[]>> => {
  try {
    const response = await backendApi.get('supplier', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchOrthofeetFilters = async (params: GetOrthofeetFiltersParams): Promise<OrthofeetFiltersResponse> => {
  try {
    const response = await backendApi.get('supplier/orthofeet/filters', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchOrthofeetStyleProducts = async (
  params: GetOrthofeetStyleProductsParams
): Promise<PagedResponse<CatalogProductExtended[]>> => {
  try {
    const response = await backendApi.get('supplier/orthofeet/style-products', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchOrthofeetStyleVariants = async (
  params: GetOrthofeetStyleVariantsParams
): Promise<CatalogProductExtended[]> => {
  try {
    const response = await backendApi.get('supplier/orthofeet/style-variants', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
