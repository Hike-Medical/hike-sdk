import {
  AddCompanyParams,
  Company,
  CompanyExtended,
  FindCompaniesParams,
  PagedResponse,
  SafeCompany
} from '@hike/types';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const findCompanies = async (params?: FindCompaniesParams): Promise<PagedResponse<Company[]>> => {
  try {
    const response = await backendApi.get('company', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findCompanyPreferences = async (): Promise<CompanyExtended['preferences']> => {
  try {
    const response = await backendApi.get('company/preferences');
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

export const findCompanyById = async (companyId: string): Promise<SafeCompany> => {
  const response = await backendApi.get(`auth/company/${companyId}`);
  return response.data;
};

export const findCompanyBySlug = async (slug: string): Promise<SafeCompany> => {
  const response = await backendApi.get(`auth/company/slug/${slug}`);
  return response.data;
};

export const findCompanyByName = async (name: string): Promise<{ name: string; slug: string }[]> => {
  const response = await backendApi.get(`auth/company/name/${name}`);
  return response.data;
};
