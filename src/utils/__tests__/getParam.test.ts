import { getParam } from '../params';

describe('getParam', () => {
  it('returns the string as-is when given a string', () => {
    expect(getParam('hello')).toBe('hello');
  });

  it('returns the first item when given an array', () => {
    expect(getParam(['first', 'second'])).toBe('first');
  });

  it('returns undefined when given undefined', () => {
    expect(getParam(undefined)).toBeUndefined();
  });

  it('returns undefined when given an empty array', () => {
    expect(getParam([])).toBeUndefined();
  });
});