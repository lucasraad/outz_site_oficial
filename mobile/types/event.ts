/** Horários ISO com offset explícito; valores desta versão são de demonstração. */
export type EventRecord = {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  endsAt: string;
  timeZone: string;
  establishmentId: string;
  musicianIds: string[];
  genres: string[];
  coverImage: string;
  entry: { label: string; details: string };
  distanceLabel: string;
};

export type EventDetail = EventRecord & {
  artists: { id: string; name: string; image: string }[];
  venue: { id: string; name: string; cityLabel: string; address: string; image: string };
};
