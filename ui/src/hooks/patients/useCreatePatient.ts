import { HikeError, createPatient } from '@hike/services';
import { CreatePatientParams, PatientExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export const useCreatePatient = (
  mutationOptions?: UseMutationOptions<PatientExtended, HikeError<null>, CreatePatientParams>
) =>
  useMutation({
    mutationKey: ['createPatient'],
    mutationFn: async (body) => await createPatient(body),
    ...mutationOptions
  });
