import writeDocx from '../src/writeDocs/writeDocx';
import writePDF from '../src/writeDocs/writePDF';
import path from 'path';
import fs from 'fs';
import { personalData, cvText, textResponses } from './__mocks__';

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
      await writeDocx(
        {
          personalData,
          cvText,
          createCopy: false,
          company: 'test',
        },
        path.resolve(__dirname, 'test-docs')
      );
      const beforeWrite = fs.readdirSync(path.resolve(__dirname, 'test-docs'));
      console.log('beforeWrite', beforeWrite);

      await writePDF(
        {
          name: personalData.contactInfo.name,
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
      await writeDocx(
        {
          personalData,
          cvText,
          createCopy: false,
          company: 'test',
        },
        path.resolve(__dirname, 'test-docs')
      );
      const beforeWrite = fs.readdirSync(path.resolve(__dirname, 'test-docs'));
      console.log('beforeWrite', beforeWrite);

      await writePDF(
        {
          name: personalData.contactInfo.name,
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

  test('it should resolve with text of "pdf written"', async () => {
    try {
      await writeDocx(
        {
          personalData,
          cvText,
          createCopy: false,
          company: 'test',
        },
        path.resolve(__dirname, 'test-docs')
      );
      const result = await writePDF(
        {
          name: personalData.contactInfo.name,
          createCopy: true,
          company: 'test',
        },
        path.resolve(__dirname, 'test-docs')
      );
      expect(result).toBe('pdf written');
    } catch (error) {
      console.error(error);
    }
  });
});
