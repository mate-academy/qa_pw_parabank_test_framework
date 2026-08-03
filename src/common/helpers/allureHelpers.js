import { camelCaseToPhrase, capitalize } from './stringHelpers';

export function parseTestTreeHierarchy(fileName, logger) {
  const normalizedFileName = fileName.replace(/\\/g, '/');
  const testFolder = 'tests/';

  const segments = normalizedFileName
    .substring(normalizedFileName.indexOf(testFolder) + testFolder.length)
    .split('/');

  const lastSegment = segments[segments.length - 1];
  const folderSegments = lastSegment.includes('.spec.')
    ? segments.slice(0, -1)
    : segments;

  const attributes = folderSegments.map(segment =>
    capitalize(camelCaseToPhrase(segment)),
  );

  logger.debug(`Parsed test hierarchy: ${JSON.stringify(attributes)}`);

  return attributes;
}
