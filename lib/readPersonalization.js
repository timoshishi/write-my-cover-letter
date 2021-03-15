const fs = require('fs');
const path = require('path');

const readPersonalization = () => {
  const fileNames = fs.readdirSync(
    path.resolve(__dirname, 'cvPersonalization')
  );
  const personalData = {};
  fileNames.forEach((fileName) => {
    const fileData = fs.readFileSync(
      path.resolve(__dirname, 'cvPersonalization', fileName)
    );
    const objectName = fileName.split('.')[0];
    personalData[objectName] = JSON.parse(fileData);
  });
  return personalData;
};
readPersonalization();

module.exports = readPersonalization;
