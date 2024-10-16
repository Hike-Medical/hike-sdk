import { EnrollPatientsParams, NotificationHistory } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { enrollPatients } from '../../api/notify.service';
import { HikeError } from '../../errors/HikeError';

interface EnrollPatientsContext {
  body: EnrollPatientsParams;
}

export const useEnrollPatients = (
  options?: UseMutationOptions<(NotificationHistory | null)[], HikeError<null>, EnrollPatientsContext>
) => {
  return useMutation({
    mutationKey: ['enrollPatients'],
    mutationFn: async ({ body }: EnrollPatientsContext) => await enrollPatients(body),
    ...options
  });
};
