import { SpaceXLaunchpad, UserLocation } from '@/types/spacex';
import { calculateDistance, formatDistance, openNativeMaps } from '@/utils/maps';
import { AlertCircle, MapPin, Navigation } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface MapViewProps {
  launchpad: SpaceXLaunchpad;
  userLocation?: UserLocation | null;
  onRequestLocation: () => void;
  locationError?: string | null;
}

export default function MapView({ 
  launchpad, 
  userLocation, 
  onRequestLocation, 
  locationError 
}: MapViewProps) {
  const distance = userLocation 
    ? calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        launchpad.latitude,
        launchpad.longitude
      )
    : null;

  const handleOpenMaps = () => {
    openNativeMaps(
      launchpad.latitude,
      launchpad.longitude,
      launchpad.full_name,
      userLocation || undefined
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <MapPin size={48} color="#3B82F6" />
          <Text style={styles.launchpadName}>{launchpad.name}</Text>
          <Text style={styles.coordinates}>
            {launchpad.latitude.toFixed(4)}, {launchpad.longitude.toFixed(4)}
          </Text>
          <Text style={styles.location}>
            {launchpad.locality}, {launchpad.region}
          </Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.locationInfo}>
          {userLocation ? (
            <View style={styles.distanceContainer}>
              <Navigation size={20} color="#22C55E" />
              <Text style={styles.distanceText}>
                {distance ? formatDistance(distance) : 'Calculating...'} away
              </Text>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.locationButton} 
              onPress={onRequestLocation}
              activeOpacity={0.7}
            >
              <MapPin size={20} color="#3B82F6" />
              <Text style={styles.locationButtonText}>
                Get My Location
              </Text>
            </TouchableOpacity>
          )}

          {locationError && (
            <View style={styles.errorContainer}>
              <AlertCircle size={16} color="#EF4444" />
              <Text style={styles.errorText}>{locationError}</Text>
            </View>
          )}
        </View>

        <TouchableOpacity 
          style={styles.directionsButton} 
          onPress={handleOpenMaps}
          activeOpacity={0.8}
        >
          <Navigation size={20} color="#FFFFFF" />
          <Text style={styles.directionsButtonText}>
            Open in Maps
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    height: 300,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    margin: 16,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  launchpadName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 12,
    textAlign: 'center',
  },
  coordinates: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    fontFamily: 'monospace',
  },
  location: {
    fontSize: 16,
    color: '#4B5563',
    marginTop: 8,
    textAlign: 'center',
  },
  infoContainer: {
    padding: 16,
    gap: 16,
  },
  locationInfo: {
    gap: 12,
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  distanceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#15803D',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  locationButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1D4ED8',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorText: {
    fontSize: 14,
    color: '#DC2626',
    flex: 1,
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
  },
  directionsButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});