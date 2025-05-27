import { sendPrinterLabel } from '@hike/services';
import { HikeError } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface SendPrinterToLabelContext {
  workbenchId: string;
  companyIds: string[];
}

export const useSendPrinterToLabel = (options?: UseMutationOptions<void, HikeError<null>, SendPrinterToLabelContext>) =>
  useMutation({
    mutationKey: ['sendPrinterToLabel'],
    mutationFn: async ({ workbenchId, companyIds }) => await sendPrinterLabel(workbenchId, companyIds),
    ...options
  });
