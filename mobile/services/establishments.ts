import { useQuery } from '@tanstack/react-query';

export type EstablishmentStatus = 'open' | 'closed';

export type EstablishmentProfile = {
  id: string;
  name: string;
  location: string;
  coverImage: string;
  logoImage?: string;
  status: EstablishmentStatus;
  statusLabel: string;
  hours: {
    statusText: string;
    nextOpen?: string;
    schedule: string;
  };
  contact: {
    phone: string;
  };
  address: {
    street: string;
    mapPreview: string;
  };
  otherInfo: {
    cnpj: string;
  };
};

const MOCK_PROFILES: Record<string, EstablishmentProfile> = {
  '1': {
    id: '1',
    name: 'Bistro Bar',
    location: 'Centro - Tubarão',
    coverImage:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
    logoImage:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=200&q=80',
    status: 'open',
    statusLabel: 'ABERTO',
    hours: {
      statusText: 'Aberto',
      schedule: 'Seg a Qui · 18h às 00h\nSex e Sáb · 18h às 02h\nDom · Fechado',
    },
    contact: { phone: '(48) 99999-0000' },
    address: {
      street: 'Rua Coronel Collaço, 45 - Centro, Tubarão - SC',
      mapPreview:
        'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80',
    },
    otherInfo: { cnpj: '00.000.000/0001-00' },
  },
  '2': {
    id: '2',
    name: 'Urban Burguer',
    location: 'Centro - Tubarão',
    coverImage:
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&q=80',
    status: 'closed',
    statusLabel: 'FECHADO',
    hours: {
      statusText: 'Fechado',
      nextOpen: 'Abre amanhã às 11h',
      schedule: 'Todos os dias · 11h às 23h',
    },
    contact: { phone: '(48) 98888-1111' },
    address: {
      street: 'Av. Marcolino M. Cabral, 120 - Centro, Tubarão - SC',
      mapPreview:
        'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80',
    },
    otherInfo: { cnpj: '00.000.000/0002-00' },
  },
};

export async function fetchEstablishmentProfile(id: string): Promise<EstablishmentProfile> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const profile = MOCK_PROFILES[id];
  if (!profile) {
    throw new Error('Estabelecimento não encontrado');
  }
  return profile;
}

export function useEstablishmentProfile(id: string) {
  return useQuery({
    queryKey: ['establishment', id],
    queryFn: () => fetchEstablishmentProfile(id),
    enabled: !!id,
  });
}
