import { useQuery } from '@tanstack/react-query';

export type MatchItem = {
  id: string;
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

const MOCK_FEED: HomeFeed = {
  liveCount: 12,
  upcomingCount: 28,
  matches: [
    {
      id: '1',
      musicianId: '1',
      establishmentId: '2',
      musicianName: 'Gustavo Ramos',
      musicianGenre: 'MPB',
      musicianImage:
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80',
      venueName: 'Urban Burguer',
      venueCategory: 'Gastronomia',
      venueImage:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
      timeSlot: '19:30 - 23:30',
      distance: '4,2 km',
    },
    {
      id: '2',
      musicianId: 'm1',
      establishmentId: '1',
      musicianName: 'Pedro Farias',
      musicianGenre: 'Sertanejo',
      musicianImage:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
      venueName: 'Bistro Bar',
      venueCategory: 'Bar & Restaurante',
      venueImage:
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80',
      timeSlot: '20:00 - 00:30',
      distance: '2,1 km',
    },
    {
      id: '3',
      musicianId: '1',
      establishmentId: '1',
      musicianName: 'Gustavo Ramos',
      musicianGenre: 'Rock',
      musicianImage:
        'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80',
      venueName: 'Bistro Bar',
      venueCategory: 'Festas',
      venueImage:
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80',
      timeSlot: '21:00 - 01:00',
      distance: '3,5 km',
    },
  ],
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

async function fetchHomeFeed(): Promise<HomeFeed> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return MOCK_FEED;
}

export function useHomeFeed() {
  return useQuery({
    queryKey: ['home', 'feed'],
    queryFn: fetchHomeFeed,
  });
}
