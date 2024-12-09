interface Calendar {
  year: number;
  months: CalendarMonth[];
}

interface CalendarMonth {
  monthID: number;
  month: string;
  dowFirstDayOfTheMonth: number;
  days: number;
  events: CalendarEvent[];
}

interface CalendarEvent {
  day: number;
  title: string;
}

// DOW
// Day of the week
// 0 - Domingo
// 1 - Lunes
// 2 - Martes
// 3 - Miércoles
// 4 - Jueves
// 5 - Viernes
// 6 - Sábado

export const calendar: Calendar = {
  year: 2024,
  months: [
    {
      monthID: 1,
      month: "Enero",
      dowFirstDayOfTheMonth: 1,
      days: 31,
      events: [
        {
          day: 1,
          title: "Actividad de Prueba",
        },
      ],
    },
    {
      monthID: 2,
      month: "Febrero",
      dowFirstDayOfTheMonth: 4,
      days: 29,
      events: [
        {
          day: 1,
          title: "Actividad de Prueba",
        },
      ],
    },
    {
      monthID: 3,
      month: "Marzo",
      dowFirstDayOfTheMonth: 5,
      days: 31,
      events: [
        {
          day: 25,
          title: "Actividad de Prueba",
        },
      ],
    },
    {
      monthID: 4,
      month: "Abril",
      dowFirstDayOfTheMonth: 1,
      days: 30,
      events: [
        {
          day: 1,
          title: "Actividad de Prueba",
        },
      ],
    },
    {
      monthID: 5,
      month: "Mayo",
      dowFirstDayOfTheMonth: 3,
      days: 31,
      events: [
        {
          day: 1,
          title: "Actividad de Prueba",
        },
      ],
    },
    {
      monthID: 6,
      month: "Junio",
      dowFirstDayOfTheMonth: 6,
      days: 30,
      events: [
        {
          day: 1,
          title: "Actividad de Prueba",
        },
      ],
    },
    {
      monthID: 7,
      month: "Julio",
      dowFirstDayOfTheMonth: 1,
      days: 31,
      events: [
        {
          day: 1,
          title: "Actividad de Prueba",
        },
      ],
    },
    {
      monthID: 8,
      month: "Agosto",
      dowFirstDayOfTheMonth: 4,
      days: 31,
      events: [
        {
          day: 2,
          title: "Cumpleaños de David",
        },
        {
          day: 2,
          title: "Cumpleaños del papá de David",
        },
        {
          day: 26,
          title: "Cumpleaños de Mónica",
        },
      ],
    },
    {
      monthID: 9,
      month: "Septiembre",
      dowFirstDayOfTheMonth: 0,
      days: 30,
      events: [
        {
          day: 1,
          title: "Actividad de Prueba",
        },
      ],
    },
    {
      monthID: 10,
      month: "Octubre",
      dowFirstDayOfTheMonth: 2,
      days: 31,
      events: [
        {
          day: 1,
          title: "Actividad de Prueba",
        },
      ],
    },
    {
      monthID: 11,
      month: "Noviembre",
      dowFirstDayOfTheMonth: 5,
      days: 30,
      events: [
        {
          day: 1,
          title: "Actividad de Prueba",
        },
      ],
    },
    {
      monthID: 12,
      month: "Diciembre",
      dowFirstDayOfTheMonth: 0,
      days: 31,
      events: [
        {
          day: 1,
          title: "Actividad de Prueba",
        },
      ],
    },
  ],
};
