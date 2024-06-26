import type {
  CreateOrderParams,
  DeliverOrderParams,
  GetOrdersByTypeParams,
  GetOrdersParams,
  Order,
  OrderAuthorizationStatus,
  OrderExtended,
  OrderType,
  OrdersStats,
  PagedResponse,
  UpdateOrderParams
} from '@hike/types';
import { toResponseError } from '../errors/ResponseError';
import { backendApi } from '../utils/backendApi';

export const createOrder = async (params: CreateOrderParams): Promise<Order> => {
  try {
    const response = await backendApi.post('order', params);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const findOrderById = async (orderId: string): Promise<OrderExtended> => {
  try {
    const response = await backendApi.get(`order/${orderId}`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const fetchOrders = async (params?: GetOrdersParams): Promise<PagedResponse<OrderExtended[]>> => {
  try {
    const response = await backendApi.get('order', { params });
    return response.data;
  } catch (error) {
    throw toResponseError(error);
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
    default:
      throw new Error('Invalid order type');
  }

  try {
    const response = await backendApi.get(`order/${route}`, { params });
    return response.data;
  } catch (error) {
    throw toResponseError(error);
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
    throw toResponseError(error);
  }
};

export const updateOrder = async (
  orderId: string,
  params: UpdateOrderParams,
  jwtToken?: string
): Promise<OrderExtended> => {
  const headers = jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {};

  try {
    const response = await backendApi.patch(`order/${orderId}`, params, { headers });
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const modifyOrderAuthorization = async (
  orderId: string,
  authorizationStatus: OrderAuthorizationStatus,
  jwtToken?: string
): Promise<OrderExtended> => {
  const headers = jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {};

  try {
    const response = await backendApi.post(
      `order/${orderId}/modify-authorization`,
      { authorizationStatus },
      { headers }
    );
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const deliverOrder = async (params: DeliverOrderParams): Promise<Order> => {
  try {
    const response = await backendApi.post('order/deliver', params);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
