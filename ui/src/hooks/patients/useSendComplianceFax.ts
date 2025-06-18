import { sendComplianceFax } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UseSendComplianceFaxOptions
  extends Omit<UseMutationOptions<void, HikeError<null>, string>, 'mutationKey' | 'mutationFn'> {
  patientId: string;
}

export const useSendComplianceFax = ({ patientId, ...options }: UseSendComplianceFaxOptions) =>
  useMutation({
    mutationKey: ['sendComplianceFax'],
    mutationFn: async () => await sendComplianceFax(patientId),
    ...options
  });
