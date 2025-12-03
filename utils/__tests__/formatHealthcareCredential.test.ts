import { formatHealthcareCredential } from "../src/converters/formatHealthcareCredential";

describe('formatHealthcareCredential', () => {
  it('should remove the residency suffix', () => {
    expect(formatHealthcareCredential('MD')).toBe('MD');
    expect(formatHealthcareCredential('MD PGY-1')).toBe('MD');
    expect(formatHealthcareCredential('MD, PGY-1')).toBe('MD');
    expect(formatHealthcareCredential('MD PGY-1, PhD')).toBe('MD, PhD');
  });
});