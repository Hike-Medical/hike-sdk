import { createPatient } from '@hike/services';
import { CreatePatientParams, HikeError, PatientExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCreatePatient = (options?: UseMutationOptions<PatientExtended, HikeError<null>, CreatePatientParams>) =>
  useMutation({
    mutationKey: ['createPatient'],
    mutationFn: async (body) => await createPatient(body),
    ...options
  });
