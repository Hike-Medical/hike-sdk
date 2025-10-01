import type {
  CatalogCategory,
  CatalogProductExtended,
  GetCategoriesParams,
  GetProductsParams,
  PagedResponse
} from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const findProductById = async (productId: string): Promise<CatalogProductExtended> => {
  try {
    const response = await backendApi.get(`catalog/product/${productId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findProductBySku = async (sku: string): Promise<CatalogProductExtended> => {
  try {
    const response = await backendApi.get(`catalog/product/sku/${encodeURIComponent(sku)}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findProductByBarcode = async (barcode: string): Promise<CatalogProductExtended> => {
  try {
    const response = await backendApi.get(`catalog/product/barcode/${encodeURIComponent(barcode)}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchProducts = async (params?: GetProductsParams): Promise<PagedResponse<CatalogProductExtended[]>> => {
  try {
    const response = await backendApi.get('catalog/product', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchCategories = async (params?: GetCategoriesParams): Promise<PagedResponse<CatalogCategory[]>> => {
  try {
    const response = await backendApi.get('catalog/category', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
