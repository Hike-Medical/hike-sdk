export interface AcceptInvitationParams {
  token: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  /**
   * Skip automatic approval and consolidation logic
   * Use for v2 enrollment flow where these are handled explicitly
   */
  skipApproval?: boolean;
}
