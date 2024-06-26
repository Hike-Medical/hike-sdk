import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { voidLabel } from '../../api/shipping.service';
import { ResponseError } from '../../errors/ResponseError';

export const useVoidLabel = (mutationOptions?: UseMutationOptions<void, ResponseError<null>, string>) =>
  useMutation({
    mutationKey: ['voidLabel'],
    mutationFn: async (labelId: string) => await voidLabel(labelId),
    ...mutationOptions
  });
