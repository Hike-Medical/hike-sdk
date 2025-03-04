export type EncryptionMethod = 'gpg';

export interface FileEncryptionConfig {
  /**
   * The encryption method to use (e.g. 'gpg').
   */
  method: EncryptionMethod;
  /**
   * The secret ARN of the key used for decryption.
   */
  decryptionKeySecretArn: string;
  /**
   * The secret ARN of the key used for encryption.
   */
  encryptionKeySecretArn: string;
  /**
   * Passphrase ARN for the private key (optional)
   */
  passphraseSecretArn?: string;
  /**
   * Indicates if inbound files are encrypted and require decryption (default false).
   */
  inboundEncrypted?: boolean;
  /**
   * Indicates if outbound files are encrypted and require encryption (default false).
   */
  outboundEncrypted?: boolean;
}
