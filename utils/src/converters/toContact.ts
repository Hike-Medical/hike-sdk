import { TransformedContact } from '@hike/types';

export const toContact = (
  addressLine1: string | null,
  addressLine2: string | null,
  city: string | null,
  stateOrProvince: string | null,
  postalCode: string | null,
  countryCode?: string
): TransformedContact | undefined => {
  if (!addressLine1 || !city || !stateOrProvince || !postalCode) {
    return undefined;
  }

  return {
    addressLine1,
    addressLine2,
    city,
    stateOrProvince,
    postalCode,
    countryCode
  };
};
