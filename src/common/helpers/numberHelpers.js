export function formatCurrency(amount) {
  return `$${parseFloat(amount).toFixed(2)}`;
}

export function parseAmount(amountString) {
  return parseFloat(amountString.replace(/[^0-9.-]+/g, ''));
}

export function generateRandomAmount(min = 10, max = 1000) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

export const INVALID_NUMERIC_INPUTS = [
  { value: '-1', description: 'negative number' },
  { value: '0', description: 'zero' },
  { value: 'abc', description: 'letters' },
  { value: '!@#', description: 'special characters' },
  { value: '', description: 'empty string' },
];

export function isValidPositiveNumber(value) {
  const num = parseFloat(value);
  return !isNaN(num) && num > 0;
}

export function roundAmount(amount) {
  return Math.round(parseFloat(amount) * 100) / 100;
}
