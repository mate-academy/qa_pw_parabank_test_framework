import { camelCaseToPhrase, capitalize } from './stringHelpers';

export function parseTestTreeHierarchy(fileName, logger) {

  const normalizedPath = fileName.replace(/\\/g, '/');
  const testFolderPath = 'tests/';
  
  const attributesCamelCase = normalizedPath
    .substring(normalizedPath.indexOf(testFolderPath) + testFolderPath.length)
    .split('/');

  let attributes = attributesCamelCase.map(attribute =>
    capitalize(camelCaseToPhrase(attribute)),
  );

  if (attributes[2] && attributes[2].includes('.spec.js')) {
    attributes = attributes.slice(0, 2);
  }

  logger.debug(`Parsed test hierarchy: ${JSON.stringify(attributes)}`);

  return attributes;
}
