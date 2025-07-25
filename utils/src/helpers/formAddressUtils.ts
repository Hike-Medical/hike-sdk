import { ContactAddress, isEmpty } from '@hike/types';

/**
 * Validates if all required address fields for a given type are non-empty strings.
 *
 * @param type - The prefix type for the address fields (e.g., 'shippingAddress', 'billingAddress').
 * @param state - The state object containing the address fields.
 * @returns `true` if all required fields are valid; otherwise, `false`.
 */
export const isAddressFieldValid = (type: string, state: Record<string, unknown>): boolean =>
  ['Address1', 'City', 'State', 'Zipcode'].every((field) => !isEmpty(state[`${type}${field}`]));

/**
 * Extract the address fields into a `ContactAddress` object.
 */
export const fromAddressField = (name: string, state: Record<string, unknown>): ContactAddress => ({
  addressLine1: state[`${name}Address1`] as string,
  addressLine2: (state[`${name}Address2`] as string | null) || null,
  city: state[`${name}City`] as string,
  stateOrProvince: state[`${name}State`] as string,
  postalCode: state[`${name}Zipcode`] as string
});

/**
 * Extracts and formats address components from Google Places into a structured `ContactAddress` object.
 */
export const fromGoogleAddress = (
  addressComponents: { long_name: string; short_name: string; types: string[] }[]
): ContactAddress => {
  const address: ContactAddress = {
    addressLine1: '',
    addressLine2: null,
    city: '',
    stateOrProvince: '',
    postalCode: ''
  };

  let streetNumber = '';
  let route = '';

  addressComponents.forEach((component) => {
    const { long_name, short_name, types } = component;

    if (types.includes('street_number')) {
      streetNumber = long_name;
    }

    if (types.includes('route')) {
      route = long_name;
    }

    if (types.includes('subpremise')) {
      address.addressLine2 = long_name || null;
    }

    if (types.includes('locality')) {
      address.city = long_name;
    }

    if (types.includes('administrative_area_level_1')) {
      address.stateOrProvince = short_name;
    }

    if (types.includes('postal_code')) {
      address.postalCode = long_name;
    }
  });

  // Ensure street_number is before route in addressLine1
  address.addressLine1 = `${streetNumber} ${route}`.trim();

  return address;
};
