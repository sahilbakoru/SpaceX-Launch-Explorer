import { SpaceXLaunch, SpaceXLaunchpad } from '@/types/spacex';
import { useQuery } from '@tanstack/react-query';

const SPACEX_API_BASE = 'https://api.spacexdata.com';

export function useSpaceXLaunches() {
  return useQuery({
    queryKey: ['spacex-launches'],
    queryFn: async (): Promise<SpaceXLaunch[]> => {
      const response = await fetch(`${SPACEX_API_BASE}/v5/launches`);
      if (!response.ok) {
        throw new Error('Failed to fetch launches');
      }
      const data = await response.json();
      return data.sort((a: SpaceXLaunch, b: SpaceXLaunch) => 
        new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime()
      );
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSpaceXLaunchpad(launchpadId: string | null) {
  return useQuery({
    queryKey: ['spacex-launchpad', launchpadId],
    queryFn: async (): Promise<SpaceXLaunchpad> => {
      if (!launchpadId) throw new Error('No launchpad ID provided');
      
      const response = await fetch(`${SPACEX_API_BASE}/v4/launchpads/${launchpadId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch launchpad');
      }
      return response.json();
    },
    enabled: !!launchpadId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useSpaceXLaunch(launchId: string | null) {
  return useQuery({
    queryKey: ['spacex-launch', launchId],
    queryFn: async (): Promise<SpaceXLaunch> => {
      if (!launchId) throw new Error('No launch ID provided');
      
      const response = await fetch(`${SPACEX_API_BASE}/v5/launches/${launchId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch launch');
      }
      return response.json();
    },
    enabled: !!launchId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}