import { PatientExtended, UpsertContactParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { upsertContact } from '../../api/patient.service';
import { HikeError } from '../../errors/HikeError';

interface UpsertContactContext {
  body: UpsertContactParams;
  patientId: string;
}

export const useUpsertContact = (
  mutationOptions?: UseMutationOptions<PatientExtended, HikeError<null>, UpsertContactContext>
) => {
  return useMutation({
    mutationKey: ['upsertContact'],
    mutationFn: async ({ body, patientId }: UpsertContactContext) => await upsertContact(patientId, body),
    ...mutationOptions
  });
};