import { SendGcodeToPrinterParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { printGcode } from '../../api/printer.service';
import { HikeError } from '../../errors/HikeError';

interface PrintGcodeContext {
  body: SendGcodeToPrinterParams;
  companyIds: string[];
}

export const usePrintGcode = (options?: UseMutationOptions<void, HikeError<null>, PrintGcodeContext>) =>
  useMutation({
    mutationKey: ['printGcode'],
    mutationFn: async ({ body, companyIds }) => await printGcode(body, companyIds),
    ...options
  });
