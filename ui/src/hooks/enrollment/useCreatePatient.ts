import { createEnrollmentPatient } from '@hike/services';
import type { CreateEnrollmentPatientParams, HikeError } from '@hike/types';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

export const useCreateEnrollmentPatient = (
  options?: Omit<
    UseMutationOptions<{ patientId: string }, HikeError<null>, CreateEnrollmentPatientParams>,
    'mutationFn'
  >
) =>
  useMutation<{ patientId: string }, HikeError<null>, CreateEnrollmentPatientParams>({
    mutationFn: createEnrollmentPatient,
    ...options
  });
