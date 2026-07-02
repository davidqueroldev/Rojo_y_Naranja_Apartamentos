'use client'

import { Calendar, type Event as RBCEvent } from 'react-big-calendar'
import dateFnsLocalizer from 'react-big-calendar/lib/localizers/date-fns'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { es } from 'date-fns/locale'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: es }),
  getDay,
  locales: { es },
})

export interface CalendarioEvento extends RBCEvent {
  color: string
}

export function OwnerCalendar({ events }: { events: CalendarioEvento[] }) {
  return (
    <div style={{ height: 560 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        culture="es"
        eventPropGetter={(event) => ({
          style: { backgroundColor: (event as CalendarioEvento).color, border: 'none' },
        })}
        messages={{
          month: 'Mes', week: 'Semana', day: 'Día', today: 'Hoy',
          previous: 'Anterior', next: 'Siguiente', agenda: 'Agenda',
          noEventsInRange: 'Sin reservas en este rango',
        }}
      />
    </div>
  )
}
