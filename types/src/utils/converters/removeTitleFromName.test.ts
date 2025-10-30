import { removeTitleFromName } from './removeTitleFromName';

describe('removeTitleFromName (end-only)', () => {
  it('returns name unchanged when no titles present', () => {
    expect(removeTitleFromName('John Smith')).toBe('John Smith');
  });

  it('removes a single trailing credential', () => {
    expect(removeTitleFromName('John Smith MD')).toBe('John Smith');
  });

  it('removes multiple trailing credentials', () => {
    expect(removeTitleFromName('John Smith MD PhD FACP')).toBe('John Smith');
  });

  it('keeps leading titles intact', () => {
    expect(removeTitleFromName('Dr John Smith MD')).toBe('Dr John Smith');
  });

  it('keeps both first and middle name when removing trailing title', () => {
    expect(removeTitleFromName('John A. Smith MD')).toBe('John A. Smith');
  });

  it('removes punctuation from trailing titles', () => {
    expect(removeTitleFromName('John Smith, MD.')).toBe('John Smith');
    expect(removeTitleFromName('John Smith (PhD)')).toBe('John Smith');
  });

  it('is case-insensitive for title removal', () => {
    expect(removeTitleFromName('John Smith mD')).toBe('John Smith');
  });

  it('normalizes extra whitespace', () => {
    expect(removeTitleFromName('   John   Smith   MD   ')).toBe('John Smith');
  });
});
