export const currentMonthOptionIndex = () => new Date().getMonth() + 1;

export const otherMonthOptionIndex = () => (new Date().getMonth() === 0 ? 2 : 1);

export const getDateOffset = offsetDays => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
};

export const getCurrentDate = () => getDateOffset(0);

export const getLoanResponseDate = () => {
  const date = new Date();
  const month = String(date.getMonth() + 1).padStart(2, '0');

  return `${month}-${date.getDate()}-${date.getFullYear()}`;
};
