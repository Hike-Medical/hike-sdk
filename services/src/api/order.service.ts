import type {
  CreateOrderParams,
  GetOrdersParams,
  Order,
  OrderAuthorizationStatus,
  OrderExtended,
  OrderType,
  OrdersStats,
  PagedParams,
  PagedResponse
} from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const createOrder = async (params: CreateOrderParams): Promise<Order> => {
  const response = await backendApi.post('order', params);
  return response.data;
};

export const findOrderById = async (orderId: string): Promise<OrderExtended> => {
  const response = await backendApi.get(`order/${orderId}`);
  return response.data;
};

export const fetchOrders = async (params?: GetOrdersParams): Promise<PagedResponse<OrderExtended[]>> => {
  const response = await backendApi.get('order', { params });
  return response.data;
};

export const fetchOrdersByType = async (
  type: OrderType,
  params?: PagedParams
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
    default:
      throw new Error('Invalid order type');
  }

  const response = await backendApi.get(`order/${route}`, { params });
  return response.data;
};

/**
 * Retrieves the statistics for orders.
 */
export const statsForOrders = async (): Promise<OrdersStats> => {
  const response = await backendApi.get('order/stats');
  return response.data;
};

export const modifyOrderAuthorization = async (
  orderId: string,
  authorizationStatus: OrderAuthorizationStatus
): Promise<OrderExtended> => {
  const response = await backendApi.post(`order/${orderId}/modify-authorization`, { authorizationStatus });
  return response.data;
};
