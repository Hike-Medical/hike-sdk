import { Workbench } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { generateWorkbenchForm } from '../../api/workbench.service';
import { HikeError } from '../../errors/HikeError';

interface GenerateWorkbenchFormContext {
  workbenchId: string;
}

export const useGenerateWorkbenchForm = (
  options?: UseMutationOptions<Workbench, HikeError<null>, GenerateWorkbenchFormContext>
) =>
  useMutation({
    mutationKey: ['generateWorkbenchForm'],
    mutationFn: async ({ workbenchId }) => await generateWorkbenchForm(workbenchId),
    ...options
  });
