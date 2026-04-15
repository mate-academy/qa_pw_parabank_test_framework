export function parseCurrency(amount: string | number): number {
  if (typeof amount === 'number') return amount;
  return Number(amount.replace(/[^-0-9.]/g, ''));
}
export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function calculateBalance(initialBalance: string | number, change: number): string {
  const current = parseCurrency(initialBalance);
  const final = current + change;
  return formatCurrency(final);
}

export function getBalanceDifference(oldBalance: string, newBalance: string): number {
  return parseCurrency(oldBalance) - parseCurrency(newBalance);
}