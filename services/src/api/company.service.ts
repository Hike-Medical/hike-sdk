import {
  AddCompanyParams,
  Company,
  CompanyExtended,
  CompanyPreferences,
  CompanyTheme,
  CompanyWorkbenchWebhook,
  FindCompaniesParams,
  GetCompanyByNameParams,
  GetWorkbenchWebhooksParams,
  PagedResponse,
  SafeCompany,
  UpdateCompanyParams
} from '@hike/types';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const findCompanies = async (params?: FindCompaniesParams): Promise<PagedResponse<Company[]>> => {
  try {
    const response = await backendApi.get('company', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findCompanyPreferences = async (): Promise<CompanyPreferences> => {
  try {
    const response = await backendApi.get('company/preferences');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findCompanyTheme = async (): Promise<{ theme: CompanyTheme | null }> => {
  try {
    const response = await backendApi.get('auth/company/theme');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const isFreeTrial = async (): Promise<boolean> => {
  try {
    const response = await backendApi.get('auth/isFreeTrial');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const addCompany = async (params: AddCompanyParams): Promise<CompanyExtended> => {
  try {
    const response = await backendApi.post('company', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateCompany = async (companyId: string, params: UpdateCompanyParams): Promise<CompanyExtended> => {
  try {
    const response = await backendApi.patch(`company/${companyId}`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getCompany = async (companyId: string): Promise<CompanyExtended> => {
  try {
    const response = await backendApi.get(`company/${companyId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findCompanyById = async (companyId: string): Promise<SafeCompany> => {
  const response = await backendApi.get(`auth/company/${companyId}`);
  return response.data;
};

export const findCompanyBySlug = async (slug: string): Promise<SafeCompany> => {
  const response = await backendApi.get(`auth/company/slug/${slug}`);
  return response.data;
};

export const findCompanyByName = async (
  name: string,
  params?: GetCompanyByNameParams
): Promise<{ name: string; slug: string }[]> => {
  const response = await backendApi.get(`auth/company/name/${name}`, { params });
  return response.data;
};

export const findCompanyWorkbenchWebhooks = async (
  params?: GetWorkbenchWebhooksParams
): Promise<CompanyWorkbenchWebhook[]> => {
  try {
    const response = await backendApi.get('company/workbench/webhook', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
