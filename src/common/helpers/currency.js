export function formatCurrency(amount) {
  const value = Number(amount);
  const digits = Math.abs(value).toFixed(2);

  return `${value < 0 ? '-' : ''}$${digits}`;
}
