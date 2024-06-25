import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { deletePin } from '../api/pin.service';

export const useDeletePin = (options?: UseMutationOptions<void, Error, void, unknown>) => {
  return useMutation({
    mutationKey: ['deletePin'],
    mutationFn: async () => await deletePin(),
    ...options
  });
};
