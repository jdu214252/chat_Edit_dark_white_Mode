
import React, {useState, useEffect} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import { useTranslation } from 'react-i18next';
import ConversationsScreen from '../screens/ConversationsScreen';
import CameraScreen from '../screens/CameraScreen';
import StoriesScreen from '../screens/StoriesScreen';
import CallsScreen from '../screens/CallsScreen';
import { useTheme } from '../ThemeContext'; 
import { theme } from '../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Tab = createMaterialTopTabNavigator();

export default function HomeNavigator() {

  const { currentTheme } = useTheme(); 
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('language');
      if(savedLanguage){
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, []);

ук

  return (
    <Tab.Navigator
      initialRouteName="Conversations"
      
      screenOptions={{
        tabBarActiveTintColor: theme.colors.white,
        tabBarInactiveTintColor: theme.colors.white,
        tabBarStyle: {  backgroundColor: theme.colors.primary, },
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
          tabBarLabel: t('messages'),
          tabBarIcon: ({ color }) => <Icon name="chat" size={25} color={color} />,
        }}
      />
      <Tab.Screen
        name="Stories"
        component={StoriesScreen}
        options={{
          tabBarLabel: t('stories'),
          tabBarIcon: ({ color }) => <Icon name="book-open" size={25} color={color} />,
        }}
      />
      <Tab.Screen
        name="Calls"
        component={CallsScreen}
        options={{
          tabBarLabel: t('calls'),
          tabBarIcon: ({ color }) => <Icon name="phone" size={25} color={color} />,
        }}
      />

      
      
    </Tab.Navigator>
  );
}
