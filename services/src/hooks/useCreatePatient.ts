import { CreatePatientParams, PatientExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { createPatient } from '../api/patient.service';

export const useCreatePatient = (mutationOptions?: UseMutationOptions<PatientExtended, Error, CreatePatientParams>) => {
  return useMutation({
    mutationKey: ['createPatient'],
    mutationFn: async (body: CreatePatientParams) => await createPatient(body),
    ...mutationOptions
  });
};
