import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { voidLabel } from '../../api/shipping.service';

export const useVoidLabel = (mutationOptions?: UseMutationOptions<void, Error, string>) => {
  return useMutation({
    mutationKey: ['voidLabel'],
    mutationFn: async (labelId: string) => await voidLabel(labelId),
    ...mutationOptions
  });
};
