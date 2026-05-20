export function parseAmount(str) {
  return parseFloat(str.replace(/[$,]/g, ''));
}

export function formatAmount(amount) {
  const sign = amount < 0 ? '-' : '';
  const numericPart = `${Math.abs(amount).toFixed(2)}`;
  return sign + '$' + numericPart;
}
