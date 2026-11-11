import { MOCK_EVENTS } from '../mocks/events.ts';
import type { EventDetail, EventRecord } from '../types/event';
import { fetchEstablishmentProfile } from './establishments.ts';
import { fetchMusicianProfile } from './musicians.ts';

export class EventNotFoundError extends Error {
  constructor() {
    super('Evento não encontrado');
    this.name = 'EventNotFoundError';
  }
}

async function resolveEvent(record: EventRecord): Promise<EventDetail> {
  const [venue, artists] = await Promise.all([
    fetchEstablishmentProfile(record.establishmentId),
    Promise.all(record.musicianIds.map(fetchMusicianProfile)),
  ]);
  return {
    ...record,
    artists: artists.map((artist) => ({ id: artist.id, name: artist.name, image: artist.avatarImage })),
    venue: {
      id: venue.id,
      name: venue.name,
      cityLabel: venue.location,
      address: venue.address.street,
      image: venue.coverImage,
    },
  };
}

// Substituir esta fronteira por chamadas HTTP quando a API de eventos existir.
export async function fetchEvent(id: string): Promise<EventDetail> {
  const record = MOCK_EVENTS.find((event) => event.id === id);
  if (!record) throw new EventNotFoundError();
  return resolveEvent(record);
}

export async function fetchEvents(): Promise<EventDetail[]> {
  return Promise.all(MOCK_EVENTS.map(resolveEvent));
}
