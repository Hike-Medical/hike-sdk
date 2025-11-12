import { stripHealthcareCredentials } from '../src/converters/stripHealthcareCredentials';

describe('stripHealthcareCredentials (end-only)', () => {
  it('returns name unchanged when no titles present', () => {
    expect(stripHealthcareCredentials('John Smith')).toBe('John Smith');
  });

  it('removes a single trailing credential', () => {
    expect(stripHealthcareCredentials('John Smith MD')).toBe('John Smith');
  });

  it('removes multiple trailing credentials', () => {
    expect(stripHealthcareCredentials('John Smith MD PhD FACP')).toBe('John Smith');
  });

  it('keeps leading titles intact', () => {
    expect(stripHealthcareCredentials('Dr John Smith MD')).toBe('Dr John Smith');
  });

  it('keeps both first and middle name when removing trailing title', () => {
    expect(stripHealthcareCredentials('John A. Smith MD')).toBe('John A. Smith');
  });

  it('removes punctuation from trailing titles', () => {
    expect(stripHealthcareCredentials('John Smith, MD.')).toBe('John Smith');
    expect(stripHealthcareCredentials('John Smith (PhD)')).toBe('John Smith');
  });

  it('is case-insensitive for title removal', () => {
    expect(stripHealthcareCredentials('John Smith mD')).toBe('John Smith');
  });

  it('normalizes extra whitespace', () => {
    expect(stripHealthcareCredentials('   John   Smith   MD   ')).toBe('John Smith');
  });
});
