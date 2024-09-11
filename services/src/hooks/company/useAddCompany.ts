import { AddCompanyParams, CompanyExtended } from '@hike/types';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { addCompany } from '../../api/company.service';
import { ResponseError } from '../../errors/ResponseError';

interface AddCompanyContext {
  body: AddCompanyParams;
}

export const useAddCompany = (
  options?: UseMutationOptions<CompanyExtended, ResponseError<null>, AddCompanyContext>
) => {
  return useMutation({
    mutationKey: ['addCompany'],
    mutationFn: async ({ body }: AddCompanyContext) => await addCompany(body),
    ...options
  });
};
