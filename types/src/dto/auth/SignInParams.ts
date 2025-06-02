export interface SignInParams {
  credentials: {
    email: string;
    password: string;
  };
  excludeCookie?: boolean;
}
