import { updateProduct } from '@hike/services';
import type { CatalogProductExtended, HikeError, UpdateProductParams } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

interface UseUpdateProductOptions
  extends Omit<
    UseMutationOptions<CatalogProductExtended, HikeError<null>, { productId: string; params: UpdateProductParams }>,
    'mutationFn'
  > {}

export const useUpdateProduct = (options?: UseUpdateProductOptions) =>
  useMutation({
    mutationFn: async ({ productId, params }: { productId: string; params: UpdateProductParams }) =>
      await updateProduct(productId, params),
    ...options
  });
