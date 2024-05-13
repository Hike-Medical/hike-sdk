import { Facility, FacilityAddress } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const fetchCompanyFacilitiesAndAddresses = async (): Promise<Facility & { address: FacilityAddress }[]> => {
  const response = await backendApi.get('facility');
  return response.data;
};
