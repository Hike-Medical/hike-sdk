import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { setInactive } from '../api/feet.service';
import { SetFootInactive, Foot } from '@hike/types';

export const useSetFootInactive = (
  footId: string,
  mutationOptions?: UseMutationOptions<Foot, unknown, SetFootInactive>
) => {
  return useMutation({
    mutationKey: ['setInactive', footId],
    mutationFn: async (body: SetFootInactive) => await setInactive(footId, body),
    ...mutationOptions
  });
};
