import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { setActive } from '../api/feet.service';
import { Foot } from '@hike/types';

interface SetFootActiveParams {
  footId: string;
}

export const useSetFootActive = (
  mutationOptions?: Omit<UseMutationOptions<Foot, Error, SetFootActiveParams>, 'mutationKey' | 'mutationFn'>
) => {
  return useMutation({
    mutationKey: ['setActive'],
    mutationFn: async (params: SetFootActiveParams) => await setActive(params.footId),
    ...mutationOptions
  });
};
