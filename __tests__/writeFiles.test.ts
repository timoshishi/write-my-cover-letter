import { writeFiles } from '../src/writeDocs/writeFiles';
import fs from 'fs';
import path from 'path';
import { WriteFilesParams } from '../src/writeDocs/writeFiles';
import { personalData, cvText, textResponses } from '../__mocks__';
import { formatName } from '../src/utils';

describe('writeFiles', () => {
  afterEach(() => {
    // remove all files from the __tests__/test-docs directory
    const testDocsDir = path.resolve(__dirname, 'test-docs');
    const files = fs.readdirSync(testDocsDir);
    files.forEach((file) => {
      fs.unlinkSync(path.join(testDocsDir, file));
    });
  });

  it('it should reject if no values are passed', async () => {
    await expect(writeFiles({} as any)).rejects.toThrow();
  });

  it('it should write one file if copy is false and only docx is in output', async () => {
    const beforeWrite = fs.readdirSync(path.resolve(__dirname, 'test-docs'));
    await writeFiles(
      {
        personalData,
        cvText,
        textResponses,
        outputTypes: ['docx'],
        createCopy: false,
        company: 'test',
      } as WriteFilesParams,
      path.resolve(__dirname, 'test-docs')
    );
    const afterWrite = fs.readdirSync(path.resolve(__dirname, 'test-docs'));
    expect(afterWrite.length).toBe(beforeWrite.length + 1);
  });

  it('it should write two files if copy is true and only docx is in output', async () => {
    const beforeWrite = fs.readdirSync(path.resolve(__dirname, 'test-docs'));
    await writeFiles(
      {
        personalData,
        cvText,
        textResponses,
        outputTypes: ['docx'],
        createCopy: true,
        company: 'test',
      } as WriteFilesParams,
      path.resolve(__dirname, 'test-docs')
    );
    const afterWrite = fs.readdirSync(path.resolve(__dirname, 'test-docs'));
    expect(afterWrite.length).toBe(beforeWrite.length + 2);
  });

  it('it should write one file if copy is false and only pdf is in output', async () => {
    const beforeWrite = fs.readdirSync(path.resolve(__dirname, 'test-docs'));
    await writeFiles(
      {
        personalData,
        cvText,
        textResponses,
        outputTypes: ['pdf'],
        createCopy: false,
        company: 'test',
      } as WriteFilesParams,
      path.resolve(__dirname, 'test-docs')
    );
    const afterWrite = fs.readdirSync(path.resolve(__dirname, 'test-docs'));
    expect(afterWrite.length).toBe(beforeWrite.length + 1);
  });

  it('it should write two files if copy is true and only pdf is in output', async () => {
    const beforeWrite = fs.readdirSync(path.resolve(__dirname, 'test-docs'));
    await writeFiles(
      {
        personalData,
        cvText,
        textResponses,
        outputTypes: ['pdf'],
        createCopy: true,
        company: 'test',
      } as WriteFilesParams,
      path.resolve(__dirname, 'test-docs')
    );
    const afterWrite = fs.readdirSync(path.resolve(__dirname, 'test-docs'));
    expect(afterWrite.length).toBe(beforeWrite.length + 2);
  });

  it('it should write 4 files if copy is true and both pdf and docx are in output', async () => {
    const beforeWrite = fs.readdirSync(path.resolve(__dirname, 'test-docs'));
    await writeFiles(
      {
        personalData,
        cvText,
        textResponses,
        outputTypes: ['pdf', 'docx'],
        createCopy: true,
        company: 'test',
      } as WriteFilesParams,
      path.resolve(__dirname, 'test-docs')
    );
    const afterWrite = fs.readdirSync(path.resolve(__dirname, 'test-docs'));
    expect(afterWrite.length).toBe(beforeWrite.length + 4);
  });

  it('should have properly formatted filenames and extensions', async () => {
    await writeFiles(
      {
        personalData,
        cvText,
        textResponses,
        outputTypes: ['pdf', 'docx'],
        createCopy: true,
        company: textResponses.company,
      } as WriteFilesParams,
      path.resolve(__dirname, 'test-docs')
    );
    const afterWrite = fs.readdirSync(path.resolve(__dirname, 'test-docs'));
    const formattedName = formatName(personalData.contactInfo.name);
    const formattedCompany = formatName(textResponses.company);
    expect(afterWrite.includes(`${formattedCompany}.docx`)).toBeTruthy();
    expect(afterWrite.includes(`${formattedCompany}.pdf`)).toBeTruthy();
    expect(afterWrite.includes(`${formattedName}-cover-letter.pdf`)).toBeTruthy();
    expect(afterWrite.includes(`${formattedName}-cover-letter.docx`)).toBeTruthy();
  });
});
