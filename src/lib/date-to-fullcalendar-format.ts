export const dateToFCFormat = (d: Date): string => {
  // Formato: YYYY-MM-DD
  const padZero = (n: number) => (n < 10 ? `0${n}` : n.toString());
  const day = padZero(d.getDate());
  const month = padZero(d.getMonth() + 1);
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};
