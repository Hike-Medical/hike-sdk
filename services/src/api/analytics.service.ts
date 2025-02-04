import { GetStuckOrdersByStatuses, OrderStatus } from '@hike/types';
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
        headers: {
          'x-company-id': companyIds.join(',')
        }
      }
    );

    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const getOrdersStuck = async (body: GetStuckOrdersByStatuses, companyIds: string[]) => {
  try {
    const response = await backendApi.post('analytics/orders/stuck', body, {
      headers: {
        'x-company-id': companyIds.join(',')
      }
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
