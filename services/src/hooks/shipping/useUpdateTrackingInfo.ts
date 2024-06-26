import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { updateTrackingInfo } from '../../api/shipping.service';
import { ResponseError } from '../../errors/ResponseError';

interface SaveTrackingInfo {
  labelId: string;
  items: string[];
}

export const useUpdateTrackingInfo = (
  mutationOptions?: UseMutationOptions<void, ResponseError<null>, SaveTrackingInfo>
) => {
  return useMutation({
    mutationKey: ['updateTrackingInfo'],
    mutationFn: async ({ labelId, items }: SaveTrackingInfo) => await updateTrackingInfo({ labelId, items }),
    ...mutationOptions
  });
};
