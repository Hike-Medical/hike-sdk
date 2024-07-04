import { SendGcodeToPrinterParams } from '@hike/types';
import { toResponseError } from '../errors/ResponseError';
import { backendApi } from '../utils/backendApi';

export const printGcode = async (body: SendGcodeToPrinterParams, companyIds: string[]) => {
  try {
    const response = await backendApi.post(`printer/send-gcode`, body, {
      headers: companyIds?.length ? { 'x-company-id': companyIds.join(',') } : undefined
    });
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};

export const getPrinters = async () => {
  try {
    const response = await backendApi.get(`printer`);
    return response.data;
  } catch (error) {
    throw toResponseError(error);
  }
};
