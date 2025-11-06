import type {
  CreateOrderParams,
  DeliverOrderParams,
  GetOrdersByTypeParams,
  GetOrdersExtendedParams,
  GetOrdersParams,
  ModifyOrderAuthorizationParams,
  Order,
  OrderExtended,
  OrderType,
  OrdersStats,
  PagedResponse,
  UpdateOrderParams
} from '@hike/types';
import { addHeaders } from '@hike/utils';
import { toHikeError } from '../errors/toHikeError';
import { backendApi } from '../utils/backendApi';

export const createOrder = async (params: CreateOrderParams, companyIds: string[]): Promise<Order> => {
  try {
    const response = await backendApi.post('order', params, { headers: addHeaders(companyIds) });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const findOrderById = async (orderId: string): Promise<OrderExtended> => {
  try {
    const response = await backendApi.get(`order/${orderId}`);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchOrders = async (params?: GetOrdersParams): Promise<PagedResponse<OrderExtended[]>> => {
  try {
    const response = await backendApi.get('order', { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const fetchOrdersByType = async (
  type: OrderType,
  params?: GetOrdersByTypeParams
): Promise<PagedResponse<OrderExtended[]>> => {
  let route: string;

  switch (type) {
    case 'authorized':
      route = 'authorized';
      break;
    case 'onHold':
      route = 'hold';
      break;
    case 'ready':
      route = 'ready';
      break;
    case 'completed':
      route = 'completed';
      break;
    default:
      throw new Error('Invalid order type');
  }

  try {
    const response = await backendApi.get(`order/${route}`, { params });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

/**
 * Retrieves the statistics for orders.
 */
export const statsForOrders = async (): Promise<OrdersStats> => {
  try {
    const response = await backendApi.get('order/stats');
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const updateOrder = async (
  orderId: string,
  params: UpdateOrderParams,
  jwtToken?: string,
  companyIds?: string[]
): Promise<OrderExtended> => {
  try {
    const response = await backendApi.patch(`order/${orderId}`, params, {
      headers: addHeaders(companyIds, { Authorization: jwtToken && `Bearer ${jwtToken}` })
    });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const modifyOrderAuthorization = async ({
  orderId,
  authorizationStatus,
  companyIds,
  jwtToken
}: ModifyOrderAuthorizationParams): Promise<OrderExtended> => {
  try {
    const response = await backendApi.post(
      `order/${orderId}/modify-authorization`,
      { authorizationStatus },
      { headers: addHeaders(companyIds, { Authorization: jwtToken && `Bearer ${jwtToken}` }) }
    );
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const deliverOrder = async (params: DeliverOrderParams): Promise<Order> => {
  try {
    const response = await backendApi.post('order/deliver', params);
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

/**
 * Fetches orders with full extended data using optimized direct Prisma queries.
 * Includes statusEvents timeline data.
 */
export const getOrdersExtended = async (
  params?: GetOrdersExtendedParams,
  companyIds?: string[]
): Promise<PagedResponse<OrderExtended[]>> => {
  try {
    const response = await backendApi.get('order/extended', { params, headers: addHeaders(companyIds) });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};
