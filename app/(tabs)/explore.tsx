import * as Linking from 'expo-linking';
import { Stack } from 'expo-router';
import {
  Calendar,
  ExternalLink,
  Globe,
  Rocket,
  Satellite,
  TrendingUp,
  Users,
} from 'lucide-react-native';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const exploreItems = [
  {
    id: 'spacex-website',
    title: 'SpaceX Official Website',
    description: 'Visit the official SpaceX website for the latest news and updates',
    icon: Globe,
    color: '#3B82F6',
    url: 'https://www.spacex.com',
  },
  {
    id: 'spacex-twitter',
    title: 'SpaceX on Twitter',
    description: 'Follow SpaceX for real-time updates and announcements',
    icon: Users,
    color: '#1DA1F2',
    url: 'https://twitter.com/spacex',
  },
  {
    id: 'falcon-heavy',
    title: 'Falcon Heavy',
    description: 'Learn about the most powerful operational rocket',
    icon: Rocket,
    color: '#EF4444',
    url: 'https://www.spacex.com/vehicles/falcon-heavy/',
  },
  {
    id: 'starship',
    title: 'Starship',
    description: 'The future of space exploration and Mars colonization',
    icon: Rocket,
    color: '#F59E0B',
    url: 'https://www.spacex.com/vehicles/starship/',
  },
  {
    id: 'dragon',
    title: 'Dragon Spacecraft',
    description: 'Crew and cargo missions to the International Space Station',
    icon: Satellite,
    color: '#10B981',
    url: 'https://www.spacex.com/vehicles/dragon/',
  },
  {
    id: 'starlink',
    title: 'Starlink',
    description: 'Global satellite internet constellation',
    icon: Satellite,
    color: '#8B5CF6',
    url: 'https://www.starlink.com',
  },
];

const stats = [
  { label: 'Total Launches', value: '200+', icon: Rocket },
  { label: 'Successful Landings', value: '150+', icon: TrendingUp },
  { label: 'Active Satellites', value: '5000+', icon: Satellite },
  { label: 'Years of Operation', value: '20+', icon: Calendar },
];

export default function ExploreScreen() {
  const openLink = async (url: string) => {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Explore SpaceX',
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTitleStyle: { fontSize: 20, fontWeight: '700' },
        }}
      />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=400&fit=crop',
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Explore the Future of Space</Text>
            <Text style={styles.heroSubtitle}>
              Discover SpaceX&apos;s revolutionary missions and technology
            </Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>SpaceX by the Numbers</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <View key={index} style={styles.statCard}>
                  <IconComponent size={24} color="#3B82F6" />
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Explore Items */}
        <View style={styles.exploreSection}>
          <Text style={styles.sectionTitle}>Learn More</Text>
          <View style={styles.exploreGrid}>
            {exploreItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.exploreCard}
                  onPress={() => openLink(item.url)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
                    <IconComponent size={24} color={item.color} />
                  </View>
                  <View style={styles.exploreContent}>
                    <Text style={styles.exploreTitle}>{item.title}</Text>
                    <Text style={styles.exploreDescription}>{item.description}</Text>
                  </View>
                  <ExternalLink size={20} color="#9CA3AF" />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Data provided by SpaceX API
          </Text>
          <Text style={styles.footerSubtext}>
            Making life multiplanetary
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
        marginTop:30,
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    height: 200,
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#E5E7EB',
    textAlign: 'center',
    lineHeight: 22,
  },
  statsSection: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
  exploreSection: {
    margin: 16,
  },
  exploreGrid: {
    gap: 12,
  },
  exploreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  exploreContent: {
    flex: 1,
  },
  exploreTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  exploreDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    padding: 32,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
});