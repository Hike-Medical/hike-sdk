import { upsertPrimaryPhysician } from '@hike/services';
import { HikeError, PatientExtended, UpsertPrimaryPhysicianParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UseUpsertPrimaryPhysicianOptions
  extends Omit<
    UseMutationOptions<PatientExtended, HikeError<null>, UpsertPrimaryPhysicianParams>,
    'mutationKey' | 'mutationFn'
  > {
  patientId: string;
}

export const useUpsertPrimaryPhysician = ({ patientId, ...options }: UseUpsertPrimaryPhysicianOptions) =>
  useMutation({
    mutationKey: ['upsertPrimaryPhysician', patientId],
    mutationFn: async (body) => await upsertPrimaryPhysician(patientId, body),
    ...options
  });
