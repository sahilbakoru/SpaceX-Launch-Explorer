import { SpaceXLaunch } from '@/types/spacex';
import { router } from 'expo-router';
import { Calendar, CheckCircle, Clock, MapPin, XCircle } from 'lucide-react-native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface LaunchCardProps {
  launch: SpaceXLaunch;
}

export default function LaunchCard({ launch }: LaunchCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusIcon = () => {
    if (launch.upcoming) {
      return <Clock size={16} color="#FFA500" />;
    } else if (launch.success === true) {
      return <CheckCircle size={16} color="#22C55E" />;
    } else if (launch.success === false) {
      return <XCircle size={16} color="#EF4444" />;
    }
    return <Clock size={16} color="#6B7280" />;
  };

  const getStatusText = () => {
    if (launch.upcoming) return 'Upcoming';
    if (launch.success === true) return 'Success';
    if (launch.success === false) return 'Failed';
    return 'Unknown';
  };

  const getStatusColor = () => {
    if (launch.upcoming) return '#FFA500';
    if (launch.success === true) return '#22C55E';
    if (launch.success === false) return '#EF4444';
    return '#6B7280';
  };

  const handlePress = () => {
    router.push(`/launch/${launch.id}` as any);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.7}>
      <View style={styles.cardContent}>
        <View style={styles.imageContainer}>
          {launch.links.patch.small ? (
            <Image
              source={{ uri: launch.links.patch.small }}
              style={styles.patchImage}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>SpaceX</Text>
            </View>
          )}
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.missionName} numberOfLines={2}>
              {launch.name}
            </Text>
            <View style={styles.statusContainer}>
              {getStatusIcon()}
              <Text style={[styles.statusText, { color: getStatusColor() }]}>
                {getStatusText()}
              </Text>
            </View>
          </View>

          <View style={styles.details}>
            <View style={styles.detailRow}>
              <Calendar size={14} color="#6B7280" />
              <Text style={styles.detailText}>
                {formatDate(launch.date_utc)}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <MapPin size={14} color="#6B7280" />
              <Text style={styles.detailText}>
                Flight #{launch.flight_number}
              </Text>
            </View>
          </View>

          {launch.details && (
            <Text style={styles.description} numberOfLines={2}>
              {launch.details}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
  },
  imageContainer: {
    marginRight: 16,
  },
  patchImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  placeholderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6B7280',
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  missionName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  details: {
    gap: 4,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
});