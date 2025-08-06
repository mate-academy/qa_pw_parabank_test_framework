import { camelCaseToPhrase, capitalize } from './stringHelpers';

export function parseTestTreeHierarchy(fileName, logger) {
  const testFolder = 'tests/';

  const attributesCamelCase = fileName
    .substring(fileName.indexOf(testFolder) + testFolder.length)
    .split('/');

  let attributes = attributesCamelCase.map(attribute => {
    const cleanAttribute = attribute.replace(/^\d+-/, '');
    return capitalize(camelCaseToPhrase(cleanAttribute));
  });

  if (attributes[2].includes('.spec.js')) {
    attributes = attributes.slice(0, 2);
  }

  logger.debug(`Parsed test hierarchy: ${JSON.stringify(attributes)}`);

  return attributes;
}
