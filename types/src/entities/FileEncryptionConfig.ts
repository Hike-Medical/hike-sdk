export type EncryptionMethod = 'gpg';

export interface FileEncryptionConfig {
  /**
   * The encryption method to use (e.g. 'gpg').
   */
  method: EncryptionMethod;
  /**
   * The secret ARN of the key used for decryption.
   * If this is omitted, then files inbound to our system will not be decrypted.
   */
  decryptionKeySecretArn?: string;
  /**
   * The secret ARN of the key used for encryption.
   * If this is omitted, then files outbound from our system will not be encrypted.
   */
  encryptionKeySecretArn?: string;
  /**
   * Passphrase ARN for the private key (optional)
   */
  passphraseSecretArn?: string;
}
