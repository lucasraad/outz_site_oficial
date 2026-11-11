import { useQuery } from '@tanstack/react-query';

import { fetchEvents } from './events.ts';
import { formatEventSchedule } from '../lib/eventDate.ts';

export type MatchItem = {
  id: string;
  eventId: string;
  eventTitle: string;
  dateLabel: string;
  musicianId: string;
  establishmentId: string;
  musicianName: string;
  musicianGenre: string;
  musicianImage: string;
  venueName: string;
  venueCategory: string;
  venueImage: string;
  timeSlot: string;
  distance: string;
};

export type MusicianCard = {
  id: string;
  name: string;
  genres: string[];
  image: string;
};

export type HomeFeed = {
  liveCount: number;
  upcomingCount: number;
  matches: MatchItem[];
  musicians: MusicianCard[];
};

const MOCK_FEED: Pick<HomeFeed, 'musicians'> = {
  musicians: [
    {
      id: 'm1',
      name: 'Pedro Farias',
      genres: ['Sertanejo', 'MPB'],
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    },
    {
      id: 'm2',
      name: 'Bianca Campos',
      genres: ['Eletrônica', 'Funk'],
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80',
    },
    {
      id: 'm3',
      name: 'Lua Mendes',
      genres: ['MPB', 'Acústico'],
      image:
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',
    },
  ],
};

export async function fetchHomeFeed(): Promise<HomeFeed> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const events = await fetchEvents();
  return {
    ...MOCK_FEED,
    // O catálogo é demonstrativo; não há contagem de eventos ao vivo real.
    liveCount: 0,
    upcomingCount: events.length,
    matches: events.map((event) => {
      const schedule = formatEventSchedule(event);
      return {
        id: event.id,
        eventId: event.id,
        eventTitle: event.title,
        dateLabel: schedule.dateLabel,
        musicianId: event.artists[0].id,
        establishmentId: event.venue.id,
        musicianName: event.artists[0].name,
        musicianGenre: event.genres.join(' · '),
        musicianImage: event.artists[0].image,
        venueName: event.venue.name,
        venueCategory: event.venue.cityLabel,
        venueImage: event.venue.image,
        timeSlot: schedule.timeLabel,
        distance: event.distanceLabel,
      };
    }),
  };
}

export function useHomeFeed() {
  return useQuery({
    queryKey: ['home', 'feed'],
    queryFn: fetchHomeFeed,
  });
}
