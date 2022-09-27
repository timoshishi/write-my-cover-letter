import { ContactInfo } from '../src/types';
import { writeJSONToDisk } from '../src/utils';
import { resolvePathFromCurrentDir } from '../src/utils';
import { clearTestDocsDir } from '../test-utils';
import fs from 'fs';
import path from 'path';

describe('writeJSONToDisk', () => {
  beforeEach(() => {
    clearTestDocsDir();
  });
  afterEach(() => {
    clearTestDocsDir();
  });

  it('should write a file with the keyname that was passed in', () => {
    const testPath = resolvePathFromCurrentDir(__dirname, '__tests__/test-docs');
    writeJSONToDisk<'contactInfo'>('contactInfo', {} as ContactInfo, testPath).then(() => {
      const files = fs.readdirSync(testPath);
      expect(files).toContain('contactInfo.json');
    });
  });

  it('should write all the data passed in to the object to the file', () => {
    const testPath = resolvePathFromCurrentDir(__dirname, '__tests__/test-docs');
    const contactInfo: ContactInfo = {
      name: 'test',
      email: 'test',
      phone: 'test',
      sites: ['test', 'test2'],
    };
    writeJSONToDisk<'contactInfo'>('contactInfo', contactInfo, testPath).then(() => {
      const file = fs.readFileSync(path.join(testPath, 'contactInfo.json'), 'utf8');
      expect(file).toBe(JSON.stringify(contactInfo));
    });
  });
});
