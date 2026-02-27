import { camelCaseToPhrase, capitalize } from './stringHelpers';

export function parseTestTreeHierarchy(fileName, logger) {
  const testFolder = 'tests/';

  const normalized = String(fileName).replace(/\\/g, '/');
  const folderIndex = normalized.indexOf(testFolder);

  if (folderIndex < 0) {
    return [];
  }

  const attributesCamelCase = normalized
    .substring(folderIndex + testFolder.length)
    .split('/');

  let attributes = attributesCamelCase.map(attribute =>
    capitalize(camelCaseToPhrase(attribute)),
  );

  if (typeof attributesCamelCase[2] === 'string' && attributesCamelCase[2].includes('.spec.js')) {
    attributes = attributes.slice(0, 2);
  }

  logger.debug(`Parsed test hierarchy: ${JSON.stringify(attributes)}`);
  return attributes;
}