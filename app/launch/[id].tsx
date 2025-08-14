import ErrorState from '@/components/ErrorState';
import LoadingState from '@/components/LoadingState';
import { useLocation } from '@/hooks/useLocation';
import { useSpaceXLaunch, useSpaceXLaunchpad } from '@/hooks/useSpaceXData';
import * as Linking from 'expo-linking';
import { Stack, useLocalSearchParams } from 'expo-router';
import {
    Calendar,
    CheckCircle,
    Clock,
    ExternalLink,
    Globe,
    MapPin,
    XCircle,
    Youtube
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import MapView from '../../components/MapView';

export default function LaunchDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'details' | 'map'>('details');
  
  const { data: launch, isLoading: launchLoading, error: launchError } = useSpaceXLaunch(id);
  const { data: launchpad, isLoading: launchpadLoading, error: launchpadError } = useSpaceXLaunchpad(launch?.launchpad || null);
  const { location, error: locationError, requestLocation } = useLocation();

  const isLoading = launchLoading || launchpadLoading;
  const error = launchError || launchpadError;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = () => {
    if (!launch) return null;
    if (launch.upcoming) {
      return <Clock size={20} color="#FFA500" />;
    } else if (launch.success === true) {
      return <CheckCircle size={20} color="#22C55E" />;
    } else if (launch.success === false) {
      return <XCircle size={20} color="#EF4444" />;
    }
    return <Clock size={20} color="#6B7280" />;
  };

  const getStatusText = () => {
    if (!launch) return '';
    if (launch.upcoming) return 'Upcoming';
    if (launch.success === true) return 'Success';
    if (launch.success === false) return 'Failed';
    return 'Unknown';
  };

  const getStatusColor = () => {
    if (!launch) return '#6B7280';
    if (launch.upcoming) return '#FFA500';
    if (launch.success === true) return '#22C55E';
    if (launch.success === false) return '#EF4444';
    return '#6B7280';
  };

  const openLink = async (url: string) => {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: 'Launch Details' }} />
        <LoadingState message="Loading launch details..." />
      </SafeAreaView>
    );
  }

  if (error || !launch) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: 'Launch Details' }} />
        <ErrorState 
          message="Failed to load launch details. Please try again."
          onRetry={() => window.location.reload()}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: launch.name,
          headerTitleStyle: { fontSize: 16 }
        }} 
      />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'details' && styles.activeTab]}
          onPress={() => setActiveTab('details')}
        >
          <Text style={[styles.tabText, activeTab === 'details' && styles.activeTabText]}>
            Details
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'map' && styles.activeTab]}
          onPress={() => setActiveTab('map')}
        >
          <Text style={[styles.tabText, activeTab === 'map' && styles.activeTabText]}>
            Launchpad
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'details' ? (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Mission Patch */}
            <View style={styles.patchContainer}>
              {launch.links.patch.large ? (
                <Image
                  source={{ uri: launch.links.patch.large }}
                  style={styles.patchImage}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.placeholderPatch}>
                  <Text style={styles.placeholderText}>SpaceX</Text>
                </View>
              )}
            </View>

            {/* Mission Info */}
            <View style={styles.infoCard}>
              <Text style={styles.missionName}>{launch.name}</Text>
              
              <View style={styles.statusContainer}>
                {getStatusIcon()}
                <Text style={[styles.statusText, { color: getStatusColor() }]}>
                  {getStatusText()}
                </Text>
              </View>

              <View style={styles.detailsGrid}>
                <View style={styles.detailRow}>
                  <Calendar size={18} color="#6B7280" />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Launch Date</Text>
                    <Text style={styles.detailValue}>
                      {formatDate(launch.date_utc)}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <MapPin size={18} color="#6B7280" />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Flight Number</Text>
                    <Text style={styles.detailValue}>#{launch.flight_number}</Text>
                  </View>
                </View>

                {launchpad && (
                  <View style={styles.detailRow}>
                    <MapPin size={18} color="#6B7280" />
                    <View style={styles.detailContent}>
                      <Text style={styles.detailLabel}>Launchpad</Text>
                      <Text style={styles.detailValue}>{launchpad.full_name}</Text>
                    </View>
                  </View>
                )}
              </View>

              {launch.details && (
                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionTitle}>Mission Details</Text>
                  <Text style={styles.description}>{launch.details}</Text>
                </View>
              )}

              {/* Links */}
              <View style={styles.linksContainer}>
                <Text style={styles.linksTitle}>Links</Text>
                <View style={styles.linksGrid}>
                  {launch.links.webcast && (
                    <TouchableOpacity
                      style={styles.linkButton}
                      onPress={() => openLink(`https://www.youtube.com/watch?v=${launch.links.youtube_id}`)}
                    >
                      <Youtube size={20} color="#EF4444" />
                      <Text style={styles.linkText}>Watch</Text>
                    </TouchableOpacity>
                  )}
                  
                  {launch.links.wikipedia && (
                    <TouchableOpacity
                      style={styles.linkButton}
                      onPress={() => openLink(launch.links.wikipedia!)}
                    >
                      <Globe size={20} color="#3B82F6" />
                      <Text style={styles.linkText}>Wikipedia</Text>
                    </TouchableOpacity>
                  )}
                  
                  {launch.links.article && (
                    <TouchableOpacity
                      style={styles.linkButton}
                      onPress={() => openLink(launch.links.article!)}
                    >
                      <ExternalLink size={20} color="#6B7280" />
                      <Text style={styles.linkText}>Article</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        launchpad && (
          <MapView
            launchpad={launchpad}
            userLocation={location}
            onRequestLocation={requestLocation}
            locationError={locationError}
          />
        )
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#3B82F6',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  patchContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  patchImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  placeholderPatch: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  missionName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  detailsGrid: {
    gap: 16,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  linksContainer: {
    marginTop: 8,
  },
  linksTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  linksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
});