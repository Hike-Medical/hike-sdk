import { AddCompanyParams, CompanyExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { addCompany } from '../../api/company.service';
import { HikeError } from '../../errors/HikeError';

interface AddCompanyContext {
  body: AddCompanyParams;
}

export const useAddCompany = (options?: UseMutationOptions<CompanyExtended, HikeError<null>, AddCompanyContext>) => {
  return useMutation({
    mutationKey: ['addCompany'],
    mutationFn: async ({ body }: AddCompanyContext) => await addCompany(body),
    ...options
  });
};
