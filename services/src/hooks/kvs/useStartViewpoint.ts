import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { HikeError } from '../../errors/HikeError';
import { startViewpoint } from '../../api/kvs.service';

export const useStartViewpoint = (
  mutationOptions?: Omit<UseMutationOptions<void, HikeError<null>, string>, 'mutationKey' | 'mutationFn'>
) => {
  return useMutation({
    mutationKey: ['startViewpoint'],
    mutationFn: async (assetId: string) => await startViewpoint(assetId),
    ...mutationOptions
  });
};
