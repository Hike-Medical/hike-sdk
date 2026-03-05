import { acknowledgePackingScan } from '@hike/services';
import { AcknowledgePackingScanBody, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useAcknowledgePackingScan = (
  options?: UseMutationOptions<void, HikeError<null>, AcknowledgePackingScanBody>
) =>
  useMutation({
    mutationKey: ['acknowledgePackingScan'],
    mutationFn: async (body) => await acknowledgePackingScan(body),
    ...options
  });
