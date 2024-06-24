import { SignInWithPinBody } from '../../dto/auth/SignInWithPinBody';

export interface CreatePinDto {
  pin: SignInWithPinBody['pin'];
}
