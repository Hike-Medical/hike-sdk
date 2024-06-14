import { backendApi } from '../utils/backendApi';

export const healthCheck = async () => {
  const response = await backendApi.get('health');
  return response.data;
};
