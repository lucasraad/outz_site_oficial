import { useQuery } from '@tanstack/react-query';

export type MusicianPost = {
  id: string;
  venueName: string;
  likes: number;
  image: string;
};

export type MusicianProfile = {
  id: string;
  name: string;
  location: string;
  coverImage: string;
  avatarImage: string;
  bio?: string;
  genres: string[];
  posts: MusicianPost[];
};

const MOCK_PROFILES: Record<string, MusicianProfile> = {
  m1: {
    id: 'm1',
    name: 'Pedro Farias',
    location: 'Tubarão - SC',
    coverImage:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80',
    avatarImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    genres: ['Sertanejo', 'MPB'],
    bio: 'Cantor e compositor. Shows ao vivo em bares e eventos na região.',
    posts: [
      {
        id: 'p1',
        venueName: 'Bistro Bar',
        likes: 216,
        image:
          'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',
      },
      {
        id: 'p2',
        venueName: 'Urban Burguer',
        likes: 184,
        image:
          'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80',
      },
      {
        id: 'p3',
        venueName: 'Bistro Bar',
        likes: 142,
        image:
          'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80',
      },
      {
        id: 'p4',
        venueName: 'Casa do Som',
        likes: 98,
        image:
          'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&q=80',
      },
      {
        id: 'p5',
        venueName: 'Bistro Bar',
        likes: 76,
        image:
          'https://images.unsplash.com/photo-1506157786151-b8493531f3f0?w=400&q=80',
      },
      {
        id: 'p6',
        venueName: 'Urban Burguer',
        likes: 54,
        image:
          'https://images.unsplash.com/photo-1429962710221-badf37940d80?w=400&q=80',
      },
    ],
  },
  '1': {
    id: '1',
    name: 'Gustavo Ramos',
    location: 'Tubarão - SC',
    coverImage:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80',
    avatarImage:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80',
    genres: ['MPB'],
    posts: [],
  },
};

async function fetchMusicianProfile(id: string): Promise<MusicianProfile> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const profile = MOCK_PROFILES[id];
  if (!profile) {
    throw new Error('Artista não encontrado');
  }
  return profile;
}

export function useMusicianProfile(id: string) {
  return useQuery({
    queryKey: ['musician', id],
    queryFn: () => fetchMusicianProfile(id),
    enabled: !!id,
  });
}
