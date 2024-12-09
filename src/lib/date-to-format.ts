export const dateToFormat = (d: Date): string => {
  const padZero = (n: number) => (n < 10 ? `0${n}` : n.toString());

  const day = padZero(d.getDate());
  const month = padZero(d.getMonth() + 1);
  const year = d.getFullYear();

  let hours = d.getHours();
  const minutes = padZero(d.getMinutes());
  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Convertir 0 a 12 para el formato de 12 horas
  const formattedHours = padZero(hours);

  return `${day}/${month}/${year} ${formattedHours}:${minutes} ${period}`;
};
