import { Foot } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { setActive } from '../../api/foot.service';
import { HikeError } from '../../errors/HikeError';

interface SetFootActiveParams {
  footId: string;
}

export const useSetFootActive = (
  mutationOptions?: Omit<UseMutationOptions<Foot, HikeError<null>, SetFootActiveParams>, 'mutationKey' | 'mutationFn'>
) => {
  return useMutation({
    mutationKey: ['setActive'],
    mutationFn: async (params: SetFootActiveParams) => await setActive(params.footId),
    ...mutationOptions
  });
};
