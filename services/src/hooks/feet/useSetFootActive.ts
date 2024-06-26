import { Foot } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { setActive } from '../../api/foot.service';
import { ResponseError } from '../../errors/ResponseError';

interface SetFootActiveParams {
  footId: string;
}

export const useSetFootActive = (
  mutationOptions?: Omit<
    UseMutationOptions<Foot, ResponseError<null>, SetFootActiveParams>,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation({
    mutationKey: ['setActive'],
    mutationFn: async (params: SetFootActiveParams) => await setActive(params.footId),
    ...mutationOptions
  });
};
