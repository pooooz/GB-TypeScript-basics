export const getFormattedDate = (date: Date) => date.toISOString().split('T')[0];

export const getLastDayOfNextMonth = () => {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth() + 2, 0);
};
