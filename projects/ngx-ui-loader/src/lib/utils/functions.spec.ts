import { coerceNumber, getExclude, isIgnored } from './functions';
import { Config } from './interfaces';

describe('functions', () => {
  const excludeStrings = ['/api/not/show', 'https://www.domain.com/not/show'];
  const excludeRegexps = [new RegExp('/Api/not/Show/path$', 'i'), new RegExp('^https://www.domain.com/Not/show', 'i')];

  it('coerceNumber(12, 10) should return 12', () => {
    expect(coerceNumber(12, 10)).toEqual(12);
  });

  it(`coerceNumber('abc', 10) should return 10`, () => {
    expect(coerceNumber('abc', 10)).toEqual(10);
  });

  it('getExclude(null) - 01', () => {
    expect(getExclude(null)).toEqual({
      strs: undefined,
      regExps: undefined
    });
  });

  it('getExclude(config) - 02', () => {
    const config: Config = {
      exclude: ['/Api/not/Show', 'https://www.domain.com/Not/show']
    };
    expect(getExclude(config)).toEqual({
      strs: ['/api/not/show', 'https://www.domain.com/not/show'],
      regExps: undefined
    });
  });

  it('getExclude(config) - 03', () => {
    const config: Config = {
      excludeRegexp: ['/Api/not/Show/path$', '^https://www.domain.com/Not/show']
    };
    expect(getExclude(config)).toEqual({
      strs: undefined,
      regExps: [new RegExp('/Api/not/Show/path$', 'i'), new RegExp('^https://www.domain.com/Not/show', 'i')]
    });
  });

  it('getExclude(config) - 04', () => {
    const config: Config = {
      exclude: ['/Api/not/Show', 'https://www.domain.com/Not/show'],
      excludeRegexp: ['/Api/not/Show/path$', '^https://www.domain.com/Not/show']
    };
    expect(getExclude(config)).toEqual({
      strs: ['/api/not/show', 'https://www.domain.com/not/show'],
      regExps: [new RegExp('/Api/not/Show/path$', 'i'), new RegExp('^https://www.domain.com/Not/show', 'i')]
    });
  });

  it(`isIgnored('not/show', excludeStrings, undefined) - 01`, () => {
    expect(isIgnored('not/show', excludeStrings, undefined)).toEqual(false);
  });

  it(`isIgnored('/Api/Not/Show/login', excludeStrings, undefined) - 02`, () => {
    expect(isIgnored('/Api/Not/Show/login', excludeStrings, undefined)).toEqual(true);
  });

  it(`isIgnored('/some/api/not/show/path', undefined, excludeRegexps) - 03`, () => {
    expect(isIgnored('/some/api/not/show/pathS', undefined, excludeRegexps)).toEqual(false);
  });

  it(`isIgnored('/some/api/not/show/path', undefined, excludeRegexps) - 04`, () => {
    expect(isIgnored('/Some/Api/Not/Show/Path', undefined, excludeRegexps)).toEqual(true);
  });
});
