import { accountRecovery, HikeError } from '@hike/services';
import { AccountRecoveryParams } from '@hike/types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

interface AccountRecoveryOptions {
  params: AccountRecoveryParams;
  companyId?: string;
}

export const useAccountRecovery = (
  mutationOptions?: UseMutationOptions<void, HikeError<null>, AccountRecoveryOptions>
) =>
  useMutation({
    mutationKey: ['accountRecovery'],
    mutationFn: async ({ params, companyId }) => await accountRecovery(params, companyId),
    ...mutationOptions
  });
