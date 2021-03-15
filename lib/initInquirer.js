const inquirer = require('inquirer');
const createCoverQuestions = require('./createCoverQuestions');
const readPersonalization = require('./readPersonalization');
const writeFiles = require('./writeDocs');

const initInquirer = async () => {
  try {
    let personalData = readPersonalization();
    //const unfilledData = checkPersonalData(personalData)
    //if (unfilledData) {
    //const setupQuestions = createSetupQuestions(unfilledData)
    //const personalData = await inquirer.prompt(setupQuestions)
    //await writePersonalization(personalData)
    //personalData = readPersonalization
    // }
    const coverQuestions = createCoverQuestions(personalData);

    const options = await inquirer.prompt(coverQuestions);
    await writeFiles({ ...options, personalData });
  } catch (err) {
    console.error(err);
  }
};

module.exports = initInquirer;
