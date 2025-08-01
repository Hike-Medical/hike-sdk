import { AuthUser } from './AuthUser';

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export interface AuthSession {
  user: AuthUser;
  tokens: Tokens;
}
