import { logHeader } from './logHeader';
import { writeCoverLetter } from './writeDocs/writeCoverLetter';
import { handlePersonalData } from './handlePersonalData';
import { handleCoverLetterData } from './handleCoverLetterData';

const initInquirer = async () => {
  try {
    logHeader();

    const personalData = await handlePersonalData();

    const { textResponses, outputTypes, createCopy } = await handleCoverLetterData(personalData);

    await writeCoverLetter({ textResponses, outputTypes, createCopy, personalData });

    return 'files written';
  } catch (err) {
    console.error(err);
    console.log("WE HAVE FAILED YOU! WE'RE SORRY!");
    process.exit(1);
  }
};

export default initInquirer;
