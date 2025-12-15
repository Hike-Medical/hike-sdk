import { saveEnrollmentDetails } from '@hike/services';
import type { HikeError, SaveEnrollmentDetailsParams } from '@hike/types';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

export const useSaveEnrollmentDetails = (
  options?: Omit<UseMutationOptions<{ patientId: string }, HikeError<null>, SaveEnrollmentDetailsParams>, 'mutationFn'>
) =>
  useMutation({
    mutationKey: ['saveEnrollmentDetails'],
    mutationFn: async (params) => await saveEnrollmentDetails(params),
    ...options
  });
