export function getToday_MM_DD_YYYY() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const year = today.getFullYear();

  return `${month}-${day}-${year}`;
}

export function getYesterday_MM_DD_YYYY() {
  const date = new Date();
  date.setDate(date.getDate() - 1);

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
}
