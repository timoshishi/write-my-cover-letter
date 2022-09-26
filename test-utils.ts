import fs from 'fs';
import path from 'path';

export const clearTestDocsDir = () => {
  const testDocsDir = path.resolve(path.join(__dirname, '__tests__', 'test-docs'));
  const files = fs.readdirSync(testDocsDir);
  files.forEach((file) => {
    fs.unlinkSync(path.join(testDocsDir, file));
  });
};
