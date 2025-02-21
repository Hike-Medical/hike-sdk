import { OrderStatus } from '@hike/types';
import { addHeaders } from '@hike/utils';
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const getOrderStatusesPerHour = async (
  orderStatuses: OrderStatus[],
  {
    startDate,
    endDate
  }: {
    startDate: string;
    endDate: string;
  },
  companyIds: string[]
) => {
  try {
    const response = await backendApi.post(
      'analytics/orders/statuses/hourly',
      {
        orderStatuses,
        startDate,
        endDate
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
