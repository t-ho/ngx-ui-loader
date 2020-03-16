import { getExcludeObj, isIgnored } from './functions';
import { Config } from './interfaces';

describe('functions', () => {
  const excludeStrings = ['/api/not/show', 'https://www.domain.com/not/show'];
  const excludeRegexps = [new RegExp('/Api/not/Show/path$', 'i'), new RegExp('^https://www.domain.com/Not/show', 'i')];

  it('getExclude(null) - 01', () => {
    expect(getExcludeObj(null)).toEqual({
      strs: undefined,
      regExps: undefined
    });
  });

  it('getExclude(config) - 02', () => {
    const config: Config = {
      exclude: ['/Api/not/Show', 'https://www.domain.com/Not/show']
    };
    expect(getExcludeObj(config)).toEqual({
      strs: ['/api/not/show', 'https://www.domain.com/not/show'],
      regExps: undefined
    });
  });

  it('getExclude(config) - 03', () => {
    const config: Config = {
      excludeRegexp: ['/Api/not/Show/path$', '^https://www.domain.com/Not/show']
    };
    expect(getExcludeObj(config)).toEqual({
      strs: undefined,
      regExps: [new RegExp('/Api/not/Show/path$', 'i'), new RegExp('^https://www.domain.com/Not/show', 'i')]
    });
  });

  it('getExclude(config) - 04', () => {
    const config: Config = {
      exclude: ['/Api/not/Show', 'https://www.domain.com/Not/show'],
      excludeRegexp: ['/Api/not/Show/path$', '^https://www.domain.com/Not/show']
    };
    expect(getExcludeObj(config)).toEqual({
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
