import writeDocx from '../src/writeDocs/writeDocx';
import writePDF from '../src/writeDocs/writePDF';
import path from 'path';
import fs from 'fs';
import { personalData, cvText } from '../__mocks__';
import libre from 'libreoffice-convert';
import { clearTestDocsDir } from '../test-utils';

describe('writeDocx', () => {
  beforeEach(() => {
    clearTestDocsDir();
  });

  afterEach(() => {
    clearTestDocsDir();
    jest.clearAllMocks();
  });

  it('it should write a single file to disk if createCopy is false', async () => {
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

    await writePDF(
      {
        name: personalData.contactInfo.name,
        createCopy: false,
        company: 'test',
      },
      path.resolve(__dirname, 'test-docs')
    );

    const afterWrite = fs.readdirSync(path.resolve(__dirname, 'test-docs'));
    expect(afterWrite.length).toBe(beforeWrite.length + 1);
  });

  it('it should write two files to disk if createCopy is true', async () => {
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

    await writePDF(
      {
        name: personalData.contactInfo.name,
        createCopy: true,
        company: 'test',
      },
      path.resolve(__dirname, 'test-docs')
    );

    const afterWrite = fs.readdirSync(path.resolve(__dirname, 'test-docs'));
    expect(afterWrite.length).toBe(beforeWrite.length + 2);
  });

  it('it should resolve with text of "pdf written"', async () => {
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
  });

  it('it should handle an error if libre throws', async () => {
    jest.spyOn(libre, 'convert').mockImplementation((file, ex, undefined, callback) => {
      callback(new Error('figlet not found'), Buffer.from(''));
    });

    await expect(
      writePDF(
        {
          name: personalData.contactInfo.name,
          createCopy: true,
          company: 'test',
        },
        path.resolve(__dirname, 'test-docs')
      )
    ).rejects.toThrow();
  });
});
