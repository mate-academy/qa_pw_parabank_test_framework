import { camelCaseToPhrase, capitalize } from './stringHelpers';

export function parseTestTreeHierarchy(fileName, logger) {
  const normalizedFileName = fileName.replace(/\\/g, '/');
  const testFolder = 'tests/';

  const segments = normalizedFileName
    .substring(normalizedFileName.indexOf(testFolder) + testFolder.length)
    .split('/');

  const lastSegment = segments[segments.length - 1];
  const fileNameWithoutExtension = lastSegment.replace(/\.spec\.\w+$/, '');
  const pathSegments = [...segments.slice(0, -1), fileNameWithoutExtension];

  const attributes = pathSegments.map(segment =>
    capitalize(camelCaseToPhrase(segment)),
  );

  logger.debug(`Parsed test hierarchy: ${JSON.stringify(attributes)}`);

  return attributes;
}
