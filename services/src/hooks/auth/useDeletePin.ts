import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { deletePin } from '../../api/pin.service';
import { HikeError } from '../../errors/HikeError';

export const useDeletePin = (options?: UseMutationOptions<void, HikeError<null>, void, unknown>) => {
  return useMutation({
    mutationKey: ['deletePin'],
    mutationFn: async () => await deletePin(),
    ...options
  });
};
