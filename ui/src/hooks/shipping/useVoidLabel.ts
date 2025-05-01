import { HikeError, voidLabel } from '@hike/services';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useVoidLabel = (
  mutationOptions?: UseMutationOptions<void, HikeError<null>, { labelId: string; voidShippedLabel?: boolean }>
) =>
  useMutation({
    mutationKey: ['voidLabel'],
    mutationFn: async ({ labelId, voidShippedLabel }) => await voidLabel(labelId, voidShippedLabel),
    ...mutationOptions
  });
