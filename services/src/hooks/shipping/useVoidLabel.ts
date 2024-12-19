import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { voidLabel } from '../../api/shipping.service';
import { HikeError } from '../../errors/HikeError';

export const useVoidLabel = (mutationOptions?: UseMutationOptions<void, HikeError<null>, string>) =>
  useMutation({
    mutationKey: ['voidLabel'],
    mutationFn: async (labelId: string, onlySetLabelVoid?: boolean) => await voidLabel(labelId, onlySetLabelVoid),
    ...mutationOptions
  });
