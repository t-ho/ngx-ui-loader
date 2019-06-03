import { Config, Exclude } from './interfaces';

/**
 * Coerce a value (string) to a number
 */
export function coerceNumber(value, fallbackValue): number {
  return !isNaN(parseFloat(value as any)) && !isNaN(Number(value)) ? Number(value) : fallbackValue;
}

export function getExcludeObj(config: Config): Exclude {
  let strs: string[];
  let regExps: RegExp[];

  if (config) {
    if (config.exclude) {
      strs = config.exclude.map(url => url.toLowerCase());
    }

    if (config.excludeRegexp) {
      regExps = config.excludeRegexp.map(regexp => new RegExp(regexp, 'i'));
    }
  }

  return { strs, regExps };
}

export function isIgnored(url: string, excludeStrings: string[], excludeRegexps: RegExp[]): boolean {
  if (excludeStrings) {
    // do not show the loader for urls in the `exclude` list
    if (excludeStrings.findIndex(str => url.toLowerCase().startsWith(str)) !== -1) {
      return true;
    }
  }

  if (excludeRegexps) {
    // do not show the loader for urls which matches regexps in the `excludeRegexp` list
    if (excludeRegexps.findIndex(regexp => regexp.test(url)) !== -1) {
      return true;
    }
  }

  return false;
}
