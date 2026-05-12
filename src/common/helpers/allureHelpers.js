import { camelCaseToPhrase, capitalize } from './stringHelpers';

export function parseTestTreeHierarchy(fileName, logger) {
  const testFolder = 'tests/';

  const attributesCamelCase = fileName
    .substring(fileName.indexOf(testFolder) + testFolder.length)
    .split('/');

  let attributes = attributesCamelCase.map(attribute =>
    capitalize(camelCaseToPhrase(attribute)),
  );

  // Use the last element instead of hardcoded index [2]
  const lastAttribute = attributes[attributes.length - 1];
  if (lastAttribute?.includes('.spec.js')) {
    attributes = attributes.slice(0, -1); // drop the filename segment
  }

  logger.debug(`Parsed test hierarchy: ${JSON.stringify(attributes)}`);

  return attributes;
}
