import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { voidLabel } from '../../api/shipping.service';
import { HikeError } from '../../errors/HikeError';

export const useVoidLabel = (
  mutationOptions?: UseMutationOptions<void, HikeError<null>, { labelId: string; voidShippedLabel?: boolean }>
) =>
  useMutation({
    mutationKey: ['voidLabel'],
    mutationFn: async ({ labelId, voidShippedLabel }) => await voidLabel(labelId, voidShippedLabel),
    ...mutationOptions
  });
