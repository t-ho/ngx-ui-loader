import { coerceNumber } from './coercion';

describe('NgxUiLoaderComponent', () => {

  it('coerceNumber(12, 10) should return 12', () => {
    expect(coerceNumber(12, 10)).toEqual(12);
  });

  it(`coerceNumber('abc', 10) should return 10`, () => {
    expect(coerceNumber('abc', 10)).toEqual(10);
  });
});
