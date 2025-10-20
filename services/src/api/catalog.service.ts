import type {
  CatalogCategory,
  CatalogManufacturer,
  CatalogProductExtended,
  GenerateCatalogUploadLinkParams,
  GetCategoriesParams,
  GetManufacturersParams,
  GetProductsParams,
  ImportCatalogProductsParams,
  ImportCatalogProductsResponse,
  PagedResponse,
  ParseCatalogColumnsParams,
  ParseCatalogColumnsResponse,
  UpdateProductParams
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

export const fetchManufacturers = async (
  params?: GetManufacturersParams
): Promise<PagedResponse<CatalogManufacturer[]>> => {
  try {
    const response = await backendApi.get('catalog/manufacturer', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateProduct = async (
  productId: string,
  params: UpdateProductParams
): Promise<CatalogProductExtended> => {
  try {
    const response = await backendApi.patch(`catalog/product/${productId}`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const importCatalogProducts = async (data: ImportCatalogProductsParams): Promise<{ jobId?: string }> => {
  try {
    const response = await backendApi.post('catalog/import', data);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchCatalogImportStatus = async (
  jobId: string
): Promise<{ progress: number; data?: ImportCatalogProductsResponse }> => {
  try {
    const response = await backendApi.get(`catalog/import/${jobId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const generateCatalogUploadLink = async (
  data: GenerateCatalogUploadLinkParams
): Promise<{ key: string; presignedUrl: string }> => {
  try {
    const response = await backendApi.post('catalog/import/upload-link', data);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const parseCatalogColumns = async (data: ParseCatalogColumnsParams): Promise<ParseCatalogColumnsResponse> => {
  try {
    const response = await backendApi.post('catalog/import/columns', data);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
