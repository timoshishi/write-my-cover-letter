import deleteDocx from '../src/writeDocs/deleteDocx';
import writeDocx from '../src/writeDocs/writeDocx';
import { personalData, cvText } from '../__mocks__';
import path from 'path';
import fs from 'fs';
describe('deleteDocx', () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  afterEach(() => {
    // remove all files from the __tests__/test-docs directory
    const testDocsDir = path.resolve(__dirname, 'test-docs');
    const files = fs.readdirSync(testDocsDir);
    files.forEach((file) => {
      fs.unlinkSync(path.join(testDocsDir, file));
    });
  });
  test("it should handle an error if the docx file doesn't exist", async () => {
    try {
      await deleteDocx(path.resolve('test-docs', 'test.docx'), 'personal', 'test');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
  it('should delete a file if the file exists', async () => {
    await writeDocx(
      {
        personalData,
        cvText,
        createCopy: false,
        company: 'test',
      },
      path.resolve(__dirname, 'test-docs')
    );
    const beforeDelete = fs.readdirSync(path.resolve(__dirname, 'test-docs'));
    await deleteDocx(path.resolve('test-docs', 'test.docx'), 'personal', 'test');
    const afterDelete = fs.readdirSync(path.resolve(__dirname, 'test-docs'));
    expect(beforeDelete.length).toBe(afterDelete.length);
  });
});
