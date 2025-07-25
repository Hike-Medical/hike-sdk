import { setFootActive } from '@hike/services';
import { Foot, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface SetFootActiveParams {
  footId: string;
}

export const useSetFootActive = (
  options?: Omit<UseMutationOptions<Foot, HikeError<null>, SetFootActiveParams>, 'mutationKey' | 'mutationFn'>
) =>
  useMutation({
    mutationKey: ['setFootActive'],
    mutationFn: async (params) => await setFootActive(params.footId),
    ...options
  });
