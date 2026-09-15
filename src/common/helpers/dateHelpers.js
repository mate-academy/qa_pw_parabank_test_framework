const DATE_SEPARATOR = '-';

export function parseDate(dateString) {
  const [month, day, year] = dateString.split(DATE_SEPARATOR).map(Number);

  return new Date(year, month - 1, day);
}

export function formatDate(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return [month, day, date.getFullYear()].join(DATE_SEPARATOR);
}

export function shiftDateByDays(dateString, days) {
  const date = parseDate(dateString);

  date.setDate(date.getDate() + days);

  return formatDate(date);
}

export function isDateInRange(dateString, fromDateString, toDateString) {
  const date = parseDate(dateString);

  return date >= parseDate(fromDateString) && date <= parseDate(toDateString);
}
