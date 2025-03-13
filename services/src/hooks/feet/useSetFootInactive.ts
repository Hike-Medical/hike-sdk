import { Foot, SetFootInactive } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { setInactive } from '../../api/foot.service';
import { HikeError } from '../../errors/HikeError';

interface SetFootInactiveParams extends SetFootInactive {
  footId: string;
}

export const useSetFootInactive = (
  mutationOptions?: Omit<UseMutationOptions<Foot, HikeError<null>, SetFootInactiveParams>, 'mutationKey' | 'mutationFn'>
) =>
  useMutation({
    mutationKey: ['setInactive'],
    mutationFn: async (body) => await setInactive(body.footId, body),
    ...mutationOptions
  });
