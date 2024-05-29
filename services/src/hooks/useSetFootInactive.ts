import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { setInactive } from '../api/feet.service';
import { SetFootInactive, Foot } from '@hike/types';

interface SetFootInactiveParams extends SetFootInactive {
  footId: string;
}

export const useSetFootInactive = (mutationOptions?: UseMutationOptions<Foot, unknown, SetFootInactiveParams>) => {
  return useMutation({
    mutationKey: ['setInactive'],
    mutationFn: async (body: SetFootInactiveParams) => await setInactive(body.footId, body),
    ...mutationOptions
  });
};
