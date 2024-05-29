import type {
  CatalogCategory,
  CatalogProductExtended,
  CatalogVendor,
  GetCategoriesParams,
  GetProductsParams,
  GetVendorsParams,
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

export const fetchCategories = async (params?: GetCategoriesParams): Promise<PagedResponse<CatalogCategory[]>> => {
  const response = await backendApi.get('catalog/category', { params });
  return response.data;
};

export const fetchProductsByCategory = async (
  categoryId: string,
  params?: GetProductsParams
): Promise<PagedResponse<CatalogProductExtended[]>> => {
  const response = await backendApi.get(`catalog/product/category/${categoryId}`, { params });
  return response.data;
};

export const fetchVendors = async (params?: GetVendorsParams): Promise<PagedResponse<CatalogVendor[]>> => {
  const response = await backendApi.get('catalog/vendor', { params });
  return response.data;
};

export const fetchProductsByVendor = async (
  vendorId: string,
  params?: GetProductsParams
): Promise<PagedResponse<CatalogProductExtended[]>> => {
  const response = await backendApi.get(`catalog/vendor/${vendorId}`, { params });
  return response.data;
};
