import { Severity } from 'allure-js-commons';
import { camelCaseToPhrase, capitalize } from './stringHelpers';

export function parseTestTreeHierarchy(fileName, logger) {
  const testFolder = 'tests/';
  const normalizedFileName = fileName.replaceAll('\\', '/');

  const attributesCamelCase = normalizedFileName
    .substring(normalizedFileName.indexOf(testFolder) + testFolder.length)
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

export function severityForTest(title) {
  const name = title.toLowerCase();

  if (
    name.includes('should not') ||
    name.includes('rejected') ||
    name.includes('denied') ||
    name.includes('invalid') ||
    name.includes('incorrect') ||
    name.includes('do not match')
  ) {
    return Severity.NORMAL;
  }

  if (
    name.includes('should be able') ||
    name.includes('can update') ||
    name.includes('completes') ||
    name.includes('debits') ||
    name.includes('credits') ||
    name.includes('is credited') ||
    name.includes('filters by') ||
    name.includes('found by') ||
    name.includes('shows the') ||
    name.includes('lists every') ||
    name.includes('is shown') ||
    name.includes('is hidden')
  ) {
    return Severity.CRITICAL;
  }

  return Severity.MINOR;
}
