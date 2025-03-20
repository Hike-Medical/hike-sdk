import { PatientExtended, UpdatePatientParams } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { HikeError } from '../../errors/HikeError';
import { updatePatient } from '../../api/patient.service';

interface UpdatePatientById {
  patientId: string;
  body: UpdatePatientParams;
}

export const useUpdatePatientById = (
  mutationOptions?: UseMutationOptions<PatientExtended, HikeError<null>, UpdatePatientById>
) =>
  useMutation({
    mutationKey: ['updatePatient'],
    mutationFn: async ({ patientId, body }) => await updatePatient(patientId, body),
    ...mutationOptions
  });
