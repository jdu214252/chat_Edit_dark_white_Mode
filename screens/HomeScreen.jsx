import React from 'react';
import { View, StyleSheet } from 'react-native';
import HomeNavigator from '../navigation/HomeNavigator';
import { useTheme } from '../ThemeContext';
import { theme } from '../theme';


export default function HomeScreen() {
  const { currentTheme } = useTheme(); 
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <HomeNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Replace with your desired background color
  },
});
