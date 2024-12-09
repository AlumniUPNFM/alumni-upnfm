export const dateToISODatetime = (d: Date): string => {
  const padZero = (n: number) => (n < 10 ? `0${n}` : n.toString());
  const year = d.getFullYear();
  const month = padZero(d.getMonth() + 1);
  const day = padZero(d.getDate());
  const hours = padZero(d.getHours());
  const minutes = padZero(d.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
