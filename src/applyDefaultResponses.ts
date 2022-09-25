import { TextResponses } from './types';
import { DEFAULT_RESPONSES } from './constants';

export const applyDefaultResponses = (responses: TextResponses): TextResponses => {
  const responsesWithDefaults = { ...responses };
  for (const key in responses) {
    responsesWithDefaults[key] = responses[key] || DEFAULT_RESPONSES[key];
  }
  return responsesWithDefaults;
};
