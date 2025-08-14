import { UserLocation } from '@/types/spacex';
import * as Linking from 'expo-linking';
import { Platform } from 'react-native';

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`;
  } else if (distanceKm < 100) {
    return `${distanceKm.toFixed(1)}km`;
  } else {
    return `${Math.round(distanceKm)}km`;
  }
}

export async function openNativeMaps(
  latitude: number,
  longitude: number,
  label?: string,
  userLocation?: UserLocation
) {
  const destination = `${latitude},${longitude}`;
  const encodedLabel = label ? encodeURIComponent(label) : '';

  let url: string;

  if (Platform.OS === 'ios') {
    if (userLocation) {
      // Open with directions from user location
      url = `http://maps.apple.com/?saddr=${userLocation.latitude},${userLocation.longitude}&daddr=${destination}&dirflg=d`;
    } else {
      // Just show the location
      url = `http://maps.apple.com/?q=${encodedLabel}&ll=${destination}`;
    }
  } else {
    if (userLocation) {
      // Open with directions from user location
      url = `https://www.google.com/maps/dir/${userLocation.latitude},${userLocation.longitude}/${destination}`;
    } else {
      // Just show the location
      url = `https://www.google.com/maps/search/?api=1&query=${destination}`;
    }
  }

  const canOpen = await Linking.canOpenURL(url);
  if (canOpen) {
    await Linking.openURL(url);
  } else {
    // Fallback to web maps
    const webUrl = `https://www.google.com/maps/search/?api=1&query=${destination}`;
    await Linking.openURL(webUrl);
  }
}