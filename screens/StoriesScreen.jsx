import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import Stories from '../components/stories/Stories'
import { useTheme } from '../ThemeContext';

import Icon from '@expo/vector-icons/FontAwesome';

import { theme } from '../theme';

import { fabStyles } from '../styles';

export default function StoriesScreen() {
  const { currentTheme } = useTheme(); 
  return (
    <View style={{flex: 1, backgroundColor: currentTheme.colors.back,}}>
      <ScrollView>
        <Stories />
      </ScrollView>

     <TouchableOpacity style={fabStyles.style}>
        <Icon name="camera" size={25} color={theme.colors.primary}/>
      </TouchableOpacity> 
    </View>
  )
}