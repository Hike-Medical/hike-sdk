import { printGcode } from '@hike/services';
import { HikeError, SendGcodeToPrinterParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

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
