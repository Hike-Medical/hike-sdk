import { EnrollPatientsParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { enrollPatients } from '../../api/notification.service';
import { HikeError } from '../../errors/HikeError';

interface EnrollPatientsOptions {
  notificationId: string;
  params: EnrollPatientsParams;
}

export const useEnrollPatients = (
  options?: UseMutationOptions<{ jobId?: string }, HikeError<null>, EnrollPatientsOptions>
) =>
  useMutation({
    mutationKey: ['enrollPatients'],
    mutationFn: async ({ notificationId, params }) => await enrollPatients(notificationId, params),
    ...options
  });
