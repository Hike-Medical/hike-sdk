import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { updateTrackingInfo } from '../api/shipping.service';

interface SaveTrackingInfo {
  labelId: string;
  items: string[];
}

export const useUpdateTrackingInfo = (mutationOptions?: UseMutationOptions<void, Error, SaveTrackingInfo>) => {
  return useMutation({
    mutationKey: ['updateTrackingInfo'],
    mutationFn: async ({ labelId, items }: SaveTrackingInfo) => updateTrackingInfo({ labelId, items }),
    ...mutationOptions
  });
};
