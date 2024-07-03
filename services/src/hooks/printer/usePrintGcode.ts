import { SendGcodeToPrinterParams } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { printGcode } from '../../api/printer.service';
import { ResponseError } from '../../errors/ResponseError';

interface PrintGcodeContext {
  body: SendGcodeToPrinterParams;
}

export const usePrintGcode = (options?: UseMutationOptions<void, ResponseError<null>, PrintGcodeContext>) => {
  return useMutation({
    mutationKey: ['printGcode'],
    mutationFn: async ({ body }: PrintGcodeContext) => await printGcode(body),
    ...options
  });
};
