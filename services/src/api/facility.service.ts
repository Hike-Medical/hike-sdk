import { FacilityExtended, PagedResponse, SearchFacilityParams } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const fetchCompanyFacilitiesAndAddresses = async (): Promise<FacilityExtended[]> => {
  const response = await backendApi.get('facility');
  return response.data;
};

export const searchCompanyFacilityAndAddresses = async (
  params: SearchFacilityParams
): Promise<PagedResponse<FacilityExtended[]>> => {
  const response = await backendApi.get('facility/search', { params });
  return response.data;
};
