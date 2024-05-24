import type {
  CatalogCategory,
  CatalogProductExtended,
  CatalogVendor,
  GetProductsParams,
  PagedParams,
  PagedResponse,
  SearchProductsParams
} from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const findProductById = async (productId: string): Promise<CatalogProductExtended> => {
  const response = await backendApi.get(`catalog/product/${productId}`);
  return response.data;
};

export const findProductBySku = async (sku: string): Promise<CatalogProductExtended> => {
  const response = await backendApi.get(`catalog/product/sku/${sku}`);
  return response.data;
};

export const fetchProducts = async (params?: GetProductsParams): Promise<PagedResponse<CatalogProductExtended[]>> => {
  const response = await backendApi.get('catalog/product', { params });
  return response.data;
};

export const searchProducts = async (
  params?: SearchProductsParams
): Promise<PagedResponse<CatalogProductExtended[]>> => {
  const response = await backendApi.get('catalog/product/search', { params });
  return response.data;
};

export const fetchCatagories = async (params?: PagedParams): Promise<PagedResponse<CatalogCategory[]>> => {
  const response = await backendApi.get('catalog/category', { params });
  return response.data;
};

export const fetchCatagoryProducts = async (
  categoryId: string,
  params?: GetProductsParams
): Promise<PagedResponse<CatalogProductExtended[]>> => {
  const response = await backendApi.get(`catalog/category/${categoryId}`, { params });
  return response.data;
};

export const fetchVendors = async (params?: PagedParams): Promise<PagedResponse<CatalogVendor[]>> => {
  const response = await backendApi.get('catalog/vendor', { params });
  return response.data;
};

export const fetchVendorProducts = async (
  vendorId: string,
  params?: GetProductsParams
): Promise<PagedResponse<CatalogProductExtended[]>> => {
  const response = await backendApi.get(`catalog/vendor/${vendorId}`, { params });
  return response.data;
};
