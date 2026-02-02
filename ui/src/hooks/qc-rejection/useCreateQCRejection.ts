import { createQCRejection } from '@hike/services';
import type { CreateQCRejectionParams, HikeError, QCRejection } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useCreateQCRejection = (
  options?: UseMutationOptions<QCRejection, HikeError<null>, CreateQCRejectionParams>
) =>
  useMutation({
    mutationKey: ['createQCRejection'],
    mutationFn: async (params) => await createQCRejection(params),
    ...options
  });
