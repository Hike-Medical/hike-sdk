import { DateFilter, HourlyOptions } from '@hike/types';
import { addHeaders } from '@hike/utils';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const getOrderStatusesPerHour = async (body: HourlyOptions, companyIds: string[]) => {
  try {
    const response = await backendApi.post(
      'analytics/orders/statuses/hourly',
      {
        ...body,
        startDate: body.dateFilters.startDate,
        endDate: body.dateFilters.endDate
      },
      {
        headers: addHeaders(companyIds)
      }
    );

    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getSolemateStats = async (companyIds: string[]) => {
  try {
    const response = await backendApi.get('analytics/solemate-stats', {
      headers: addHeaders(companyIds)
    });

    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getOrdersByCompanies = async (body: DateFilter, companyIds: string[]) => {
  try {
    const response = await backendApi.post(
      'analytics/orders',
      {
        ...body,
        startDate: body.startDate,
        endDate: body.endDate
      },
      {
        headers: addHeaders(companyIds)
      }
    );

    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
