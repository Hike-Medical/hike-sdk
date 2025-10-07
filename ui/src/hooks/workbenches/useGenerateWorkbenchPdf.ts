import { generateWorkbenchPdf } from '@hike/services';
import { GenerateWorkbenchPdfParams, HikeError, Workbench } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface GenerateWorkbenchPdfContext {
  workbenchId: string;
  params: GenerateWorkbenchPdfParams;
  companyIds?: string[];
}

export const useGenerateWorkbenchPdf = (
  options?: UseMutationOptions<Workbench, HikeError<null>, GenerateWorkbenchPdfContext>
) =>
  useMutation({
    mutationKey: ['generateWorkbenchPdf'],
    mutationFn: async ({ workbenchId, params, companyIds }) =>
      await generateWorkbenchPdf(workbenchId, params, companyIds),
    ...options
  });
