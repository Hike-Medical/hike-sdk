export const formatPhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber) {
    return '';
  }

  const digitsOnly = phoneNumber.replace(/\D/g, '');

  if (digitsOnly.startsWith('1') && digitsOnly.length === 11) {
    return `+${digitsOnly}`;
  }

  if (digitsOnly.length === 10) {
    return `+1${digitsOnly}`;
  }

  return phoneNumber;
};
