import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { sendPrinterLabel } from '../../api/printer.service';
import { HikeError } from '../../errors/HikeError';

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
