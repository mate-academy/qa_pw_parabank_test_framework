export function shiftDate(
  dateString,
  { days = 0, months = 0, years = 0 } = {},
) {
  const [month, day, year] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  date.setFullYear(date.getFullYear() + years);
  date.setMonth(date.getMonth() + months);
  date.setDate(date.getDate() + days);

  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = String(date.getFullYear());

  return `${mm}-${dd}-${yyyy}`;
}
