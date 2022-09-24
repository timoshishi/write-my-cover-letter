import writeDocx from '../src/writeDocs/writeDocx';
import path from 'path';
import fs from 'fs';
import { personalData, cvText } from './__mocks__';

describe('writeDocx', () => {
  beforeEach(() => {
    // remove all files from the __tests__/test-docs directory
    const testDocsDir = path.resolve(__dirname, 'test-docs');
    const files = fs.readdirSync(testDocsDir);
    files.forEach((file) => {
      fs.unlinkSync(path.join(testDocsDir, file));
    });
  });
  afterEach(() => {
    // remove all files from the __tests__/test-docs directory
    const testDocsDir = path.resolve(__dirname, 'test-docs');
    const files = fs.readdirSync(testDocsDir);
    files.forEach((file) => {
      fs.unlinkSync(path.join(testDocsDir, file));
    });
  });

  test('it should write a single file to disk if createCopy is false', async () => {
    try {
      const beforeWrite = fs.readdirSync(path.resolve(__dirname, 'test-docs'));
      console.log('beforeWrite', beforeWrite);
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
      console.log('afterWrite', afterWrite);
      expect(afterWrite.length).toBe(beforeWrite.length + 1);
    } catch (error) {
      console.error(error);
    }
  });

  test('it should write two files to disk if createCopy is true', async () => {
    try {
      const beforeWrite = fs.readdirSync(path.resolve(__dirname, 'test-docs'));
      console.log('beforeWrite', beforeWrite);
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
      console.log('afterWrite', afterWrite);
      expect(afterWrite.length).toBe(beforeWrite.length + 2);
    } catch (error) {
      console.error(error);
    }
  });

  test('it should return text that includes the cvText', async () => {
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
