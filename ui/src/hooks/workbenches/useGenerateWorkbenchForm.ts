import { generateWorkbenchForm } from '@hike/services';
import { HikeError, Workbench } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface GenerateWorkbenchFormContext {
  workbenchId: string;
  companyIds?: string[];
}

export const useGenerateWorkbenchForm = (
  options?: UseMutationOptions<Workbench, HikeError<null>, GenerateWorkbenchFormContext>
) =>
  useMutation({
    mutationKey: ['generateWorkbenchForm'],
    mutationFn: async ({ workbenchId, companyIds }) => await generateWorkbenchForm(workbenchId, companyIds),
    ...options
  });
