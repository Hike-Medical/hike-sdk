import { setActive } from '@hike/services';
import { Foot, HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface SetFootActiveParams {
  footId: string;
}

export const useSetFootActive = (
  mutationOptions?: Omit<UseMutationOptions<Foot, HikeError<null>, SetFootActiveParams>, 'mutationKey' | 'mutationFn'>
) =>
  useMutation({
    mutationKey: ['setActive'],
    mutationFn: async (params) => await setActive(params.footId),
    ...mutationOptions
  });
