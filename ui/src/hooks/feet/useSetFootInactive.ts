import { setFootInactive } from '@hike/services';
import { Foot, HikeError, SetFootInactive } from '@hike/types';
import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';

interface SetFootInactiveParams extends SetFootInactive {
  footId: string;
}

export const useSetFootInactive = (
  options?: Omit<UseMutationOptions<Foot, HikeError<null>, SetFootInactiveParams>, 'mutationKey' | 'mutationFn'>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['setFootInactive'],
    mutationFn: async ({ footId, inactiveReason }) => await setFootInactive(footId, { inactiveReason }),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ['detectionStatus'] });
      queryClient.invalidateQueries({ queryKey: ['feet'] });
      options?.onSuccess?.(data, variables, onMutateResult, context);
    },
    ...options
  });
};
