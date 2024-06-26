import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { deletePin } from '../../api/pin.service';
import { ResponseError } from '../../errors/ResponseError';

export const useDeletePin = (options?: UseMutationOptions<void, ResponseError<null>, void, unknown>) => {
  return useMutation({
    mutationKey: ['deletePin'],
    mutationFn: async () => await deletePin(),
    ...options
  });
};
