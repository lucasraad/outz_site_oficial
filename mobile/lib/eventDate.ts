import type { EventRecord } from '../types/event';

export function formatEventSchedule(event: Pick<EventRecord, 'startsAt' | 'endsAt' | 'timeZone'>) {
  const start = new Date(event.startsAt);
  const end = new Date(event.endsAt);
  const date = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric', timeZone: event.timeZone,
  });
  const time = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: event.timeZone,
  });
  const nextDay = date.format(start) !== date.format(end);
  return {
    dateLabel: date.format(start),
    timeLabel: `${time.format(start)} – ${time.format(end)}${nextDay ? ' (dia seguinte)' : ''}`,
  };
}
