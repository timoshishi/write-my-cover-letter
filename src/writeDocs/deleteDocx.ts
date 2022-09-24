import fs from 'fs';
import path from 'path';

const deleteDocx = (name: string, testPath: string = '') => {
  const formattedName = name.split(' ').join('_');
  const enterPath = `${formattedName}_cover_letter.docx`;
  fs.unlinkSync(path.join(testPath, enterPath));
};
export default deleteDocx;
