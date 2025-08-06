export function getFormatedDate(daysOffset) {
  const now = new Date();

  if (typeof daysOffset === 'number') {
    now.setDate(now.getDate() + daysOffset);
  }

  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const yyyy = now.getFullYear();

  return `${mm}-${dd}-${yyyy}`;
}
