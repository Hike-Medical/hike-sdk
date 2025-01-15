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
import { toHikeError } from '../errors/HikeError';
import { backendApi } from '../utils/backendApi';

export const createOrder = async (params: CreateOrderParams, companyIds: string[]): Promise<Order> => {
  try {
    let headers: {
      [key: string]: string;
    } = {};

    if (companyIds?.length) {
      headers = { ...headers, 'x-company-id': companyIds.join(',') };
    }
    const response = await backendApi.post('order', params, { headers });
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
  let headers: {
    [key: string]: string;
  } = {};

  if (companyIds?.length) {
    headers = { ...headers, 'x-company-id': companyIds.join(',') };
  }

  if (jwtToken) {
    headers = { ...headers, Authorization: `Bearer ${jwtToken}` };
  }

  try {
    const response = await backendApi.patch(`order/${orderId}`, params, { headers });
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const modifyOrderAuthorization = async (
  orderId: string,
  authorizationStatus: OrderAuthorizationStatus,
  companyIds?: string[],
  jwtToken?: string
): Promise<OrderExtended> => {
  let headers: {
    [key: string]: string;
  } = {};

  if (companyIds?.length) {
    headers = { ...headers, 'x-company-id': companyIds.join(',') };
  }

  if (jwtToken) {
    headers = { ...headers, Authorization: `Bearer ${jwtToken}` };
  }

  try {
    const response = await backendApi.post(
      `order/${orderId}/modify-authorization`,
      { authorizationStatus },
      { headers }
    );
    return response.data;
  } catch (error) {
    throw toHikeError(error);
  }
};

export const manuallyCompleteFabricatedDeviceOrder = async (orderId: string): Promise<OrderExtended> => {
  try {
    const response = await backendApi.post(`order/${orderId}/manually-complete-fabricated-device`);
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
