import { faker } from '@faker-js/faker';

export function capitalize(str) {
  const firstLetterCap = str.charAt(0).toUpperCase();

  const remainingLetters = str.slice(1);

  return firstLetterCap + remainingLetters;
}

export function camelCaseToPhrase(str) {
  return str.replace(/([A-Z])/g, ' $1');
}

export function slice(string, length) {
  return string.slice(0, length);
}

export function formatObject(obj) {
  return JSON.stringify(obj, null, 2);
}

export function generateRandomAlphaNumericString(length) {
  return faker.string.alphanumeric(length);
}

export function generateRandomNumericString(length) {
  return faker.string.numeric(length);
}

export function generateRandomAlphabeticString(length) {
  return faker.string.alpha(length);
}

export function generateRandomSymbolString(length) {
  return faker.string.symbol(length);
}

