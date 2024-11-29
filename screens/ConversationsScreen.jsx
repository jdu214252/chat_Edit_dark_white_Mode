import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '../ThemeContext';
import Conversations from '../components/Conversations';
import SearchInput from '../components/common/SearchInput';

import { theme } from '../theme';
import {fabStyles} from '../styles';

export default function ConversationsScreen() {
  const { currentTheme } = useTheme(); 
  return (
    <View style={{backgroundColor: currentTheme.colors.back, color: 'white',  flex: 1}}>
      <Conversations>
        <SearchInput />
      </Conversations>
      <TouchableOpacity onPress={() => {}} style={fabStyles.style}>
        <Icon name="chat" size={30} color={theme.colors.primary}/>
      </TouchableOpacity>
    </View>
  )
}