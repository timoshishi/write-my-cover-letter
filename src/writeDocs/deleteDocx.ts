import fs from 'fs';

const deleteDocx = (name: string) => {
  const formattedName = name.split(' ').join('_');
  const enterPath = `${formattedName}_cover_letter.docx`;
  fs.unlinkSync(enterPath);
};
export default deleteDocx;
