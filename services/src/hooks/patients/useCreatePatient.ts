import { CreatePatientParams, PatientExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createPatient } from '../../api/patient.service';
import { HikeError } from '../../errors/HikeError';

export const useCreatePatient = (
  mutationOptions?: UseMutationOptions<PatientExtended, HikeError<null>, CreatePatientParams>
) =>
  useMutation({
    mutationKey: ['createPatient'],
    mutationFn: async (body) => await createPatient(body),
    ...mutationOptions
  });
