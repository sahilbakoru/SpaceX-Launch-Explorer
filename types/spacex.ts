export interface SpaceXLaunch {
  id: string;
  name: string;
  date_utc: string;
  date_local: string;
  success: boolean | null;
  upcoming: boolean;
  details: string | null;
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
    reddit: {
      campaign: string | null;
      launch: string | null;
      media: string | null;
      recovery: string | null;
    };
    flickr: {
      small: string[];
      original: string[];
    };
    presskit: string | null;
    webcast: string | null;
    youtube_id: string | null;
    article: string | null;
    wikipedia: string | null;
  };
  launchpad: string;
  flight_number: number;
  auto_update: boolean;
  tbd: boolean;
  launch_library_id: string | null;
}

export interface SpaceXLaunchpad {
  id: string;
  name: string;
  full_name: string;
  locality: string;
  region: string;
  timezone: string;
  latitude: number;
  longitude: number;
  launch_attempts: number;
  launch_successes: number;
  rockets: string[];
  launches: string[];
  status: 'active' | 'inactive' | 'unknown' | 'retired' | 'lost' | 'under construction';
  details: string;
  images: {
    large: string[];
  };
}

export interface UserLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
}