import { backendApi } from '../utils/backendApi';

export const submitWorkbench = async (workbenchId: string) => {
  const response = await backendApi.post(`workbench/${workbenchId}/submit`);
  return response.data;
};
