import { createCoverQuestions } from './createCoverQuestions';
import { applyDefaultResponses } from './applyDefaultResponses';
import type { OutputTypes, PersonalData, TextResponses } from './types';
import inquirer from 'inquirer';

interface CoverLetterReturn {
  textResponses: TextResponses;
  outputTypes: OutputTypes;
  createCopy: boolean;
}

export const handleCoverLetterData = async (personalData: PersonalData): Promise<CoverLetterReturn> => {
  const coverQuestions = createCoverQuestions(personalData);
  const { outputTypes, createCopy, ...textResponses } = await inquirer.prompt(coverQuestions);
  const textResponsesWithDefaults = applyDefaultResponses(textResponses);
  return { textResponses: textResponsesWithDefaults, outputTypes, createCopy };
};
