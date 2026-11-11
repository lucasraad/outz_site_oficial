import { useQuery } from '@tanstack/react-query';

import { EventNotFoundError, fetchEvent } from '@/services/events';

export function useEvent(id: string) {
  return useQuery({
    queryKey: ['event', id],
    queryFn: () => fetchEvent(id),
    retry: (failureCount, error) => !(error instanceof EventNotFoundError) && failureCount < 2,
  });
}
