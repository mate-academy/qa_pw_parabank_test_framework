
import { camelCaseToPhrase, capitalize } from './stringHelpers';

export function parseTestTreeHierarchy(fileName, logger) {
  const normalizedFileName = fileName.replace(/\\/g, '/');
  const testFolder = 'tests/';

  const testFolderIndex = normalizedFileName.lastIndexOf(testFolder);

  if (testFolderIndex === -1) {
    throw new Error(`Test folder not found in path: ${fileName}`);
  }

  const attributesCamelCase = normalizedFileName
    .substring(testFolderIndex + testFolder.length)
    .split('/');

  let attributes = attributesCamelCase.map(attribute =>
    capitalize(camelCaseToPhrase(attribute)),
  );

  if (attributes[2]?.includes('.spec.js')) {
    attributes = attributes.slice(0, 2);
  }

  logger.debug(`Parsed test hierarchy: ${JSON.stringify(attributes)}`);

  return attributes;
}

