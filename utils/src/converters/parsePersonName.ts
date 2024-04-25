/**
 * Parses a person's full name and returns the individual parts.
 * @returns An object containing the parsed parts of the name: `firstName`, `middleName`, and `lastName`.
 *
 * @example
 * parsePersonName('John Doe');
 * // { firstName: 'John', middleName: null, lastName: 'Doe' }
 *
 * parsePersonName('Doe, John');
 * // { firstName: 'John', middleName: null, lastName: 'Doe' }
 *
 * parsePersonName('Jane Marie Smith');
 * // { firstName: 'Jane', middleName: 'Marie', lastName: 'Smith' }
 */
export const parsePersonName = (fullName: string) => {
  const scrubbedName = fullName.trim().replace(/\s+/g, ' ');

  if (!scrubbedName) {
    return { firstName: '', middleName: null, lastName: '' };
  }

  let parts = scrubbedName.includes(',') ? scrubbedName.split(/,\s*/) : scrubbedName.split(/\s+/);
  let firstName: string;
  let middleName: string | null = null;
  let lastName: string;

  if (scrubbedName.includes(',')) {
    // Format: Last, First Middle
    lastName = parts[0] ?? '';
    parts = parts[1]?.split(' ') ?? [];
    firstName = parts.shift() || '';
  } else {
    // Format: First Middle Last
    firstName = parts.shift() || '';
    lastName = parts.pop() || '';
  }

  if (parts.length > 0) {
    middleName = parts.join(' ');
  }

  // Special handling for suffixes without commas and single-word names
  if (!scrubbedName.includes(',') && lastName && !firstName) {
    firstName = lastName;
    lastName = '';
  }

  return { firstName, middleName, lastName };
};
