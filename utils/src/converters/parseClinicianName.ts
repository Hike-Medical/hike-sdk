/**
 * Parses a clinician's full name and returns the individual parts.
 * Handles names with or without titles/credentials and supports both "First Middle Last"
 * and "Last, Title, First Middle" formats.
 *
 * @returns An object containing the parsed parts of the name: `firstName`, `middleName`, and `lastName`.
 *
 * @example
 * parseClinicianName('John Doe');
 * // { firstName: 'John', middleName: null, lastName: 'Doe' }
 *
 * parseClinicianName('Jan Jo Doe');
 * // { firstName: 'Jan', middleName: 'Jo', lastName: 'Doe' }
 *
 * parseClinicianName('Doe, CO, LO, CPA, John');
 * // { firstName: 'John', middleName: null, lastName: 'Doe' }
 *
 * parseClinicianName('Doe, LPO, CPO, CPed, John Jay');
 * // { firstName: 'John', middleName: 'Jay', lastName: 'Doe' }
 *
 * parseClinicianName('Doe, CPA, CPO, John A.');
 * // { firstName: 'John', middleName: 'A.', lastName: 'Doe' }
 */
export const parseClinicianName = (fullName: string) => {
  // Step 1: Split the name by spaces or commas, and normalize spaces
  const nameParts = fullName
    .trim()
    .replace(/\s+/g, ' ')
    .split(/[\s,]+/);

  let firstName = '';
  let lastName = '';
  let middleName: string | null = null;

  // Step 2: Handle "First Middle Last" format (no commas)
  if (!fullName.includes(',')) {
    firstName = nameParts.shift() || ''; // First part is first name
    lastName = nameParts.pop() || ''; // Last part is last name

    if (nameParts.length > 0) {
      middleName = nameParts.join(' '); // The remaining parts are the middle name
    }

    return { firstName, middleName, lastName };
  }

  // Step 3: Pop the first and last name parts
  lastName = nameParts.shift() || ''; // First part as last name
  firstName = nameParts.pop() || ''; // Last part as first name

  // Step 4: Process middle parts, checking if they are titles (first two letters are uppercase)
  const isTitle = (part: string) => /^[A-Z]{2}/.test(part);

  const middleParts = nameParts.filter((part) => !isTitle(part)); // Filter out titles

  // Step 5: If there's a middle name, swap first and middle names
  if (middleParts.length > 0) {
    middleName = firstName; // The last part (currently assigned as first name) should be the middle name
    firstName = middleParts.join(' '); // The remaining parts are the actual first name
  }

  return { firstName, middleName, lastName };
};
