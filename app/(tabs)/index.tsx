import LaunchCard from '@/components/LaunchCard';
import { SpaceXLaunch } from '@/types/spacex';
import { Stack } from 'expo-router';
import { Search } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import EmptyState from '../../components/EmptyState';
import ErrorState from '../../components/ErrorState';
import LoadingState from '../../components/LoadingState';
import { useSpaceXLaunches } from '../../hooks/useSpaceXData';

export default function LaunchListScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: launches, isLoading, error, refetch } = useSpaceXLaunches();

  const filteredLaunches = useMemo(() => {
    if (!launches) return [];
    if (!searchQuery.trim()) return launches;
    
    return launches.filter(launch =>
      launch.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [launches, searchQuery]);

  const renderLaunchCard = ({ item }: { item: SpaceXLaunch }) => (
    <LaunchCard launch={item} />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>SpaceX Launches</Text>
      <Text style={styles.subtitle}>
        Explore SpaceX missions and launchpads
      </Text>
      
      <View style={styles.searchContainer}>
        <Search size={20} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search missions..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: 'SpaceX Launches' }} />
        <LoadingState message="Loading SpaceX launches..." />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: 'SpaceX Launches' }} />
        <ErrorState 
          message="Failed to load SpaceX launches. Please check your internet connection and try again."
          onRetry={() => refetch()}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'SpaceX Launches' }} />
      
      <FlatList
        data={filteredLaunches}
        renderItem={renderLaunchCard}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <EmptyState
            title="No launches found"
            message={
              searchQuery.trim()
                ? `No missions match "${searchQuery}". Try a different search term.`
                : "No SpaceX launches available at the moment."
            }
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => refetch()}
            tintColor="#3B82F6"
          />
        }
        contentContainerStyle={filteredLaunches.length === 0 ? styles.emptyContainer : undefined}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    marginVertical:30,
  },
  emptyContainer: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
});