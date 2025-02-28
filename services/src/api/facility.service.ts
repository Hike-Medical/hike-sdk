import { FacilityExtended, PagedResponse, SearchFacilityParams } from '@hike/types';
import { addHeaders } from '@hike/utils';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const fetchCompanyFacilitiesAndAddresses = async (): Promise<FacilityExtended[]> => {
  try {
    const response = await backendApi.get('facility');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const searchCompanyFacilityAndAddresses = async (
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
