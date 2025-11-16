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
    mutationKey: ['setFootActive'],
    mutationFn: async (params) => await setFootActive(params.footId),
    onSuccess: (data, variables, context) => {
      // Invalidate detection status queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ['detectionStatus'] });
      queryClient.invalidateQueries({ queryKey: ['feet'] });
      
      // Call the user-provided onSuccess if it exists
      options?.onSuccess?.(data, variables, context);
    },
    ...options
  });
};
