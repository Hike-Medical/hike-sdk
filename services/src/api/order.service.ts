import type { CreateOrderParams, GetOrdersParams, Order, PagedResponse } from '@hike/types';
import { backendApi } from '../utils/backendApi';

export const createOrder = async (params: CreateOrderParams): Promise<Order> => {
  const response = await backendApi.post('order', params);
  return response.data;
};

export const findOrderById = async (orderId: string): Promise<Order> => {
  const response = await backendApi.get(`order/${orderId}`);
  return response.data;
};

export const fetchOrders = async (params?: GetOrdersParams): Promise<PagedResponse<Order[]>> => {
  const response = await backendApi.get('order', { params });
  return response.data;
};
