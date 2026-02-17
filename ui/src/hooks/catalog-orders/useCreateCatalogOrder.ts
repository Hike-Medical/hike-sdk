import { createCatalogOrder } from '@hike/services';
import type { CreateCatalogOrderParams, CreateCatalogOrderResponse, HikeError } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

interface UseCreateCatalogOrderOptions
  extends Omit<
    UseMutationOptions<CreateCatalogOrderResponse, HikeError<null>, CreateCatalogOrderParams>,
    'mutationFn'
  > {}

export const useCreateCatalogOrder = (options?: UseCreateCatalogOrderOptions) =>
  useMutation({
    mutationFn: async (params: CreateCatalogOrderParams) => await createCatalogOrder(params),
    ...options
  });
