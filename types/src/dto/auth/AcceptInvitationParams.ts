export interface AcceptInvitationParams {
  token: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
}

/**
 * V2: Accept invitation without patient creation
 * Will replace AcceptInvitationParams in the future
 */
export interface AcceptInvitationV2Params {
  token: string;
  password?: string;
}
