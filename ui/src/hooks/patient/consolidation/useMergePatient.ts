import { mergePatient } from '@hike/services';
import { HikeError, PatientConsolidationResponse } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

interface MergePatientParams {
  patientId: string;
  candidatePatientId: string;
}

export const useMergePatient = (
  options?: UseMutationOptions<PatientConsolidationResponse, HikeError<null>, MergePatientParams>
) =>
  useMutation({
    mutationKey: ['mergePatient'],
    mutationFn: async ({ patientId, candidatePatientId }) => await mergePatient(patientId, candidatePatientId),
    ...options
  });
