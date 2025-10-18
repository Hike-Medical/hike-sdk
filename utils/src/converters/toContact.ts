import { TransformedContact } from '@hike/types';
import { normalizeGeography } from '../geography/utils/normalizeGeography';

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

  const normalized = normalizeGeography({
    stateOrProvince,
    country: countryCode
  });

  return {
    addressLine1,
    addressLine2,
    city,
    stateOrProvince: normalized.stateOrProvince,
    postalCode,
    countryCode: normalized.country
  };
};
