import type {
  CatalogProductExtended,
  CatalogSupplier,
  GetOrthofeetFiltersParams,
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

export const fetchOrthofeetInventoryBySkus = async (skus: string[]): Promise<GetOrthofeetInventoryResponse> => {
  try {
    const response = await backendApi.get(`supplier/orthofeet/inventory`, { params: { skus } });
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

export const fetchOrthofeetFilters = async (params: GetOrthofeetFiltersParams): Promise<OrthofeetFiltersResponse> => {
  try {
    const response = await backendApi.get('supplier/orthofeet/filters', { params });
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
    const response = await backendApi.get(`supplier/orthofeet/product/style/${encodeURIComponent(params.style)}`, {
      params: {
        supplierId: params.supplierId
      }
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
