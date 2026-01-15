import type {
  CascadeAvailabilityResponse,
  CascadeOrderHistoryResponse,
  CascadeOrderRequest,
  CascadeOrderResponse,
  CascadePriceResponse,
  CatalogProductExtended,
  CatalogSupplier,
  GetCascadeItemPricesParams,
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

// Cascade

export const fetchCascadeItemInventory = async (itemIds: (string | number)[]): Promise<CascadeAvailabilityResponse> => {
  try {
    const response = await backendApi.get('supplier/cascade/inventory', {
      params: { itemIds: itemIds.join(',') }
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchCascadeItemPrices = async (params: GetCascadeItemPricesParams): Promise<CascadePriceResponse> => {
  try {
    const response = await backendApi.post('supplier/cascade/prices', {
      itemIds: params.itemIds,
      quantity: params.quantity ?? 1
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const createCascadeOrder = async (body: CascadeOrderRequest): Promise<CascadeOrderResponse> => {
  try {
    const response = await backendApi.post('supplier/cascade/order', body);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchCascadeOrderHistory = async (orderNumber: string): Promise<CascadeOrderHistoryResponse> => {
  try {
    const response = await backendApi.get(`supplier/cascade/order/history/${orderNumber}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
