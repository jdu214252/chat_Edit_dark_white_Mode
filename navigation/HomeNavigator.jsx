
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import ConversationsScreen from '../screens/ConversationsScreen';
import CameraScreen from '../screens/CameraScreen';
import StoriesScreen from '../screens/StoriesScreen';
import CallsScreen from '../screens/CallsScreen';
import { useTheme } from '../ThemeContext'; 
import { theme } from '../theme';

const Tab = createMaterialTopTabNavigator();

export default function HomeNavigator() {

  const { currentTheme } = useTheme();  // Получаем текущую тему из контекста

  return (
    <Tab.Navigator
      initialRouteName="Conversations"
      
      screenOptions={{
        tabBarActiveTintColor: theme.colors.white,
        tabBarInactiveTintColor: theme.colors.white,
        tabBarStyle: {  backgroundColor: currentTheme.colors.primary, }, //backgroundColor: theme.colors.primary
        tabBarLabelStyle: { fontWeight: 'bold' },
        tabBarIndicatorStyle: { backgroundColor: theme.colors.white },
      }}
    >
      <Tab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <Icon name="camera" size={25} color={color} />,
        }}
      />
      <Tab.Screen
        name="Conversations"
        component={ConversationsScreen}
        options={{
          tabBarLabel: 'Disc.',
        }}
      />
      <Tab.Screen
        name="Stories"
        component={StoriesScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="book-open" size={25} color={color} />,
        }}
      />
      <Tab.Screen
        name="Calls"
        component={CallsScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="phone" size={25} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
