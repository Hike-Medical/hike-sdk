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
  params: SearchFacilityParams,
  companyIds?: string[]
): Promise<PagedResponse<FacilityExtended[]>> => {
  try {
    let headers: {
      [key: string]: string;
    } = {};

    if (companyIds?.length) {
      headers = { ...headers, 'x-company-id': companyIds.join(',') };
    }
    const response = await backendApi.get('facility/search', { params, headers });
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
