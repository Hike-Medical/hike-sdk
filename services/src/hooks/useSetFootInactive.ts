import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { setInactive } from '../api/foot.service';
import { SetFootInactive, Foot } from '@hike/types';

interface SetFootInactiveParams extends SetFootInactive {
  footId: string;
}

export const useSetFootInactive = (
  mutationOptions?: Omit<UseMutationOptions<Foot, Error, SetFootInactiveParams>, 'mutationKey' | 'mutationFn'>
) => {
  return useMutation({
    mutationKey: ['setInactive'],
    mutationFn: async (body: SetFootInactiveParams) => await setInactive(body.footId, body),
    ...mutationOptions
  });
};