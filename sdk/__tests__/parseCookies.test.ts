import { parseCookies } from '../src/auth/parseCookies';

describe('parseCookies', () => {
  it('should parse multiple cookies correctly', () => {
    const cookieHeader = 'name1=value1; name2=value2; name3=value3';
    const expected = {
      name1: 'value1',
      name2: 'value2',
      name3: 'value3'
    };

    const result = parseCookies(cookieHeader);
    expect(result).toEqual(expected);
  });

  it('should handle empty cookie header', () => {
    const cookieHeader = '';
    const expected = {};

    const result = parseCookies(cookieHeader);
    expect(result).toEqual(expected);
  });

  it('should ignore malformed cookies', () => {
    const cookieHeader = 'name1=value1; malformedCookie; name2=value2';
    const expected = {
      name1: 'value1',
      name2: 'value2'
    };

    const result = parseCookies(cookieHeader);
    expect(result).toEqual(expected);
  });

  it('should handle cookies with spaces correctly', () => {
    const cookieHeader = ' name1 = value1 ; name2 = value2 ; name3 = value3 ';
    const expected = {
      name1: 'value1',
      name2: 'value2',
      name3: 'value3'
    };

    const result = parseCookies(cookieHeader);
    expect(result).toEqual(expected);
  });

  it('should handle cookies with empty values', () => {
    const cookieHeader = 'name1=value1; name2=; name3=value3';
    const expected = {
      name1: 'value1',
      name3: 'value3'
    };

    const result = parseCookies(cookieHeader);
    expect(result).toEqual(expected);
  });

  it('should handle cookies with empty names', () => {
    const cookieHeader = '=value1; name2=value2; name3=value3';
    const expected = {
      name2: 'value2',
      name3: 'value3'
    };

    const result = parseCookies(cookieHeader);
    expect(result).toEqual(expected);
  });
});
