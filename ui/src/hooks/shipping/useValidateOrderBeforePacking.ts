import { validateOrderBeforePacking } from '@hike/services';
import { HikeError, ValidateOrderBeforePackingResponse } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useValidateOrderBeforePacking = (
  options?: UseMutationOptions<ValidateOrderBeforePackingResponse, HikeError<null>, string>
) =>
  useMutation({
    mutationKey: ['validateOrderBeforePacking'],
    mutationFn: async (poNumber) => await validateOrderBeforePacking(poNumber),
    ...options
  });
