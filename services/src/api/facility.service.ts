import {
  CreateFacilityParams,
  Facility,
  FacilityExtended,
  GetFacilitiesParams,
  PagedResponse,
  SearchFacilityParams,
  UpdateFacilityParams
} from '@hike/types';
import { addHeaders } from '@hike/utils';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const fetchFacilities = async (params?: GetFacilitiesParams): Promise<FacilityExtended[]> => {
  try {
    const response = await backendApi.get('facility', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const searchFacilities = async (
  params: SearchFacilityParams,
  companyIds?: string[]
): Promise<PagedResponse<FacilityExtended[]>> => {
  try {
    const response = await backendApi.get('facility/search', { params, headers: addHeaders(companyIds) });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getFacilityById = async (facilityId: string): Promise<FacilityExtended> => {
  try {
    const response = await backendApi.get(`facility/${facilityId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const createFacility = async (facility: CreateFacilityParams): Promise<Facility> => {
  try {
    const response = await backendApi.post('facility', facility);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateFacility = async (facilityId: string, facility: UpdateFacilityParams): Promise<FacilityExtended> => {
  try {
    const response = await backendApi.patch(`facility/${facilityId}`, facility);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const activateFacility = async (facilityId: string): Promise<void> => {
  try {
    await backendApi.post(`facility/${facilityId}/activate`);
  } catch (error) {
    throw toHikeError(error);
  }
};

export const deactivateFacility = async (facilityId: string): Promise<void> => {
  try {
    await backendApi.post(`facility/${facilityId}/deactivate`);
  } catch (error) {
    throw toHikeError(error);
  }
};

export const deleteFacility = async (facilityId: string): Promise<void> => {
  try {
    await backendApi.delete(`facility/${facilityId}`);
  } catch (error) {
    throw toHikeError(error);
  }
};
