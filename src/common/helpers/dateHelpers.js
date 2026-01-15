export function formatDate(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
}

export function getCurrentDate() {
  return formatDate(new Date());
}

export function getDateDaysAgo(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return formatDate(date);
}

export function getDateDaysAhead(daysAhead) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return formatDate(date);
}

export const TEST_DATES = {
  CURRENT: getCurrentDate(),
  MONTH_AGO: getDateDaysAgo(30),
  YEAR_START: '01-01-2024',
  YEAR_END: '12-31-2024',
};
