import { upsertContact } from '@hike/services';
import { HikeError, PatientExtended, UpsertContactParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface UpsertContactContext {
  body: UpsertContactParams;
  patientId: string;
}

export const useUpsertContact = (
  options?: UseMutationOptions<PatientExtended, HikeError<null>, UpsertContactContext>
) =>
  useMutation({
    mutationKey: ['upsertContact'],
    mutationFn: async ({ body, patientId }) => await upsertContact(patientId, body),
    ...options
  });
