import { setFootActive } from '@hike/services';
import { Foot, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';

interface SetFootActiveParams {
  footId: string;
}

export const useSetFootActive = (
  options?: Omit<UseMutationOptions<Foot, HikeError<null>, SetFootActiveParams>, 'mutationKey' | 'mutationFn'>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationKey: ['setFootActive'],
    mutationFn: async (params) => await setFootActive(params.footId),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ['detectionStatus'] });
      queryClient.invalidateQueries({ queryKey: ['feet'] });
      options?.onSuccess?.(...args);
    }
  });
};
