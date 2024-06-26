import type {
  CatalogCategory,
  CatalogProductExtended,
  CatalogVendor,
  GetCategoriesParams,
  GetProductsParams,
  GetVendorsParams,
  PagedResponse
} from '@hike/types';
import { toResponseError } from '../errors/ResponseError';
import { backendApi } from '../utils/backendApi';

export const findProductById = async (productId: string): Promise<CatalogProductExtended> => {
  try {
    const response = await backendApi.get(`catalog/product/${productId}`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const findProductBySku = async (sku: string): Promise<CatalogProductExtended> => {
  try {
    const response = await backendApi.get(`catalog/product/sku/${sku}`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const fetchProducts = async (params?: GetProductsParams): Promise<PagedResponse<CatalogProductExtended[]>> => {
  try {
    const response = await backendApi.get('catalog/product', { params });
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const fetchCategories = async (params?: GetCategoriesParams): Promise<PagedResponse<CatalogCategory[]>> => {
  try {
    const response = await backendApi.get('catalog/category', { params });
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const fetchVendors = async (params?: GetVendorsParams): Promise<PagedResponse<CatalogVendor[]>> => {
  try {
    const response = await backendApi.get('catalog/vendor', { params });
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
