import { Facility, FacilityAddress, PagedResponse, SearchFacilityParams } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const fetchCompanyFacilitiesAndAddresses = async (): Promise<(Facility & { address: FacilityAddress })[]> => {
  const response = await backendApi.get('facility');
  return response.data;
};

export const searchCompanyFacilityAndAddresses = async (
  params: SearchFacilityParams
): Promise<PagedResponse<(Facility & { address: FacilityAddress })[]>> => {
  const response = await backendApi.get('facility/search', { params });
  return response.data;
};
