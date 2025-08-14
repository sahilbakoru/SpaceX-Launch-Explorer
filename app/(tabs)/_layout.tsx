import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
       tabBarStyle: {
          backgroundColor: '#000000ff',
          borderTopWidth: 1,
          borderTopColor: '#000000ff',

        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Launch',
          tabBarIcon: ({ color }) => <AntDesign name="rocket1" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <FontAwesome5 name="satellite" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
