import writeDocx from '../src/writeDocs/writeDocx';
import path from 'path';
import fs from 'fs';
import { personalData, cvText } from '../__mocks__';
import { clearTestDocsDir } from '../test-utils';

describe('writeDocx', () => {
  beforeEach(() => {
    clearTestDocsDir();
  });
  afterEach(() => {
    clearTestDocsDir();
  });

  it('it should write a single file to disk if createCopy is false', async () => {
    try {
      const beforeWrite = fs.readdirSync(path.resolve(__dirname, 'test-docs'));
      await writeDocx(
        {
          personalData,
          cvText,
          createCopy: false,
          company: 'test',
        },
        path.resolve(__dirname, 'test-docs')
      );

      const afterWrite = fs.readdirSync(path.resolve(__dirname, 'test-docs'));
      expect(afterWrite.length).toBe(beforeWrite.length + 1);
    } catch (error) {
      console.error(error);
    }
  });

  it('it should write two files to disk if createCopy is true', async () => {
    try {
      const beforeWrite = fs.readdirSync(path.resolve(__dirname, 'test-docs'));
      await writeDocx(
        {
          personalData,
          cvText,
          createCopy: true,
          company: 'test',
        },
        path.resolve(__dirname, 'test-docs')
      );

      const afterWrite = fs.readdirSync(path.resolve(__dirname, 'test-docs'));
      expect(afterWrite.length).toBe(beforeWrite.length + 2);
    } catch (error) {
      console.error(error);
    }
  });

  it('it should return text that includes the cvText', async () => {
    const text = await writeDocx(
      {
        personalData,
        cvText,
        createCopy: true,
        company: 'test',
      },
      path.resolve(__dirname, 'test-docs')
    );
    expect(text).toContain(JSON.stringify(cvText));
    expect(typeof text).toBe('string');
    expect(JSON.parse(text as string)).toEqual(cvText);
  });
});
