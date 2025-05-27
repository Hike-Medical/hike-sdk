import { setInactive } from '@hike/services';
import { Foot, HikeError, SetFootInactive } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface SetFootInactiveParams extends SetFootInactive {
  footId: string;
}

export const useSetFootInactive = (
  options?: Omit<UseMutationOptions<Foot, HikeError<null>, SetFootInactiveParams>, 'mutationKey' | 'mutationFn'>
) =>
  useMutation({
    mutationKey: ['setInactive'],
    mutationFn: async (body) => await setInactive(body.footId, body),
    ...options
  });
