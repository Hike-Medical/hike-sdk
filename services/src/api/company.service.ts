import {
  AcceptCompanyInvitationParams,
  AddCompanyParams,
  Company,
  CompanyExtended,
  CompanyInvitation,
  CreateCompanyInvitationsParams,
  DeleteCompanyInvitationsParams,
  FindCompaniesParams,
  FindCompanyInvitationsParams,
  PagedResponse,
  SafeCompany,
  UpdateCompanyInvitationsParams
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

export const findInvitations = async (
  params?: FindCompanyInvitationsParams
): Promise<PagedResponse<Omit<CompanyInvitation, 'token'>[]>> => {
  try {
    const response = await backendApi.get('company/invite', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const createInvitations = async (
  params: CreateCompanyInvitationsParams
): Promise<Omit<CompanyInvitation, 'token'>[]> => {
  try {
    const response = await backendApi.post('company/invite', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateInvitations = async (
  params: UpdateCompanyInvitationsParams
): Promise<Omit<CompanyInvitation, 'token'>[]> => {
  try {
    const response = await backendApi.patch('company/invite', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const revokeInvitations = async (params: DeleteCompanyInvitationsParams): Promise<{ count: number }> => {
  try {
    const response = await backendApi.patch(`company/invite/revoke`, params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const verifyInvitation = async (token: string): Promise<Omit<CompanyInvitation, 'token'>> => {
  try {
    const response = await backendApi.get(`auth/company/invite/${token}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const acceptInvitation = async (params: AcceptCompanyInvitationParams) => {
  try {
    const response = await backendApi.post('auth/company/invite', params);
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
