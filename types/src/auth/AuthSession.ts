import { AuthUser } from './AuthUser';

export interface AuthSession {
  email: string;
  sessionUser: AuthUser;
  accessToken: string;
  refreshToken: string;
}
