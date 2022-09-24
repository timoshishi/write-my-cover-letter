import { resolvePathFromCurrentDir } from '../src/utils';
import path from 'path';

describe('resolvePathFromCurrentDir', () => {
  it('returns no path if no path is passed in ', () => {
    expect(resolvePathFromCurrentDir(__dirname)).toBe('');
  });

  it('returns the path if a path is passed in ', () => {
    expect(resolvePathFromCurrentDir(__dirname, 'test')).toBe(path.resolve(__dirname, '..', 'test') + '/');
  });
});
