import { applyDefaultResponses } from '../src/applyDefaultResponses';
import { textResponses } from '../__mocks__';
import { DEFAULT_RESPONSES } from '../src/constants';

describe('applyDefaultResponses', () => {
  test('it should return an object', () => {
    const responses = applyDefaultResponses(textResponses);
    expect(typeof responses).toEqual('object');
  });

  test('it should return an object with the same keys as the input object', () => {
    const responses = applyDefaultResponses(textResponses);
    const keys = Object.keys(responses);
    expect(keys).toEqual(Object.keys(textResponses));
  });

  test('it should return an object with the same values as the input object if the input object has values', () => {
    const responses = applyDefaultResponses(textResponses);
    const values = Object.values(responses);
    expect(values).toEqual(Object.values(textResponses));
  });

  test('it should return an object with the default values if the input object has no values', () => {
    const responses = applyDefaultResponses({
      company: '',
      position: '',
      industry: 'generic',
      role: 'frontend',
      intro: '',
      skills: '',
    });
    const values = Object.values(responses);
    expect(values).toEqual(Object.values({ ...responses, ...DEFAULT_RESPONSES }));
  });
});
