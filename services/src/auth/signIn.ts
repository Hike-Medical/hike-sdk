import { backendApi } from '../utils/backendApi';

export const signIn = async () => {
  console.log('Signing in with email and password', backendApi.getUri());
};
