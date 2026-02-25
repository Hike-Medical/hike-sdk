import { printConsumerShippingDocuments } from '@hike/services';
import { HikeError, PrintShippingParams, PrintShippingResult } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface PrintConsumerShippingDocumentsContext {
  workbenchId: string;
  params: PrintShippingParams;
}

export const usePrintConsumerShippingDocuments = (
  options?: UseMutationOptions<PrintShippingResult, HikeError<null>, PrintConsumerShippingDocumentsContext>
) =>
  useMutation({
    mutationKey: ['printConsumerShippingDocuments'],
    mutationFn: async ({ workbenchId, params }) => await printConsumerShippingDocuments(workbenchId, params),
    ...options
  });
