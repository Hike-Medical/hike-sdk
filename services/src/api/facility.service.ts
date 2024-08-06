import { FacilityExtended, PagedResponse, SearchFacilityParams } from '@hike/types';
import { toResponseError } from '../errors/ResponseError';
import { backendApi } from '../utils/backendApi';

export const fetchCompanyFacilitiesAndAddresses = async (): Promise<FacilityExtended[]> => {
  try {
    const response = await backendApi.get('facility');
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const searchCompanyFacilityAndAddresses = async (
  params: SearchFacilityParams
): Promise<PagedResponse<FacilityExtended[]>> => {
  try {
    const response = await backendApi.get('facility/search', { params });
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

// New function to fetch facilities for a specific user
export const fetchUserFacilities = async (userId: string): Promise<FacilityExtended[]> => {
  try {
    const response = await backendApi.get(`facility/user/${userId}`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
