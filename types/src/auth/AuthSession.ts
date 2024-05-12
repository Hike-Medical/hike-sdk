import { AuthUser } from './AuthUser';

export interface AuthSession {
  sessionUser: AuthUser;
  accessToken: string;
  refreshToken: string;
}
