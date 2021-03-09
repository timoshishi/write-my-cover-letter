const fs = require('fs');
const deleteDocx = (name) => {
  const formattedName = name.split(' ').join('_');
  const enterPath = `${formattedName}_cover_letter.docx`;
  fs.unlinkSync(enterPath, (err) => err && console.error(err));
};
module.exports = deleteDocx;
