import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '../ThemeContext';  // Импортируем useTheme
import Conversations from '../components/Conversations';
import SearchInput from '../components/common/SearchInput';
import { theme } from '../theme';

import { fabStyles } from '../styles';

export default function ConversationsScreen() {
  const { isDarkMode } = useTheme();  // Получаем состояние темы

  return (
    <View style={{ backgroundColor: isDarkMode ? '#1C1C1C' : '#fff', flex: 1 }}>
      <Conversations>
        <SearchInput />
      </Conversations>
      <TouchableOpacity onPress={() => {}} style={fabStyles.style}>
        <Icon name="chat" size={30} color={theme.colors.primary}/>
      </TouchableOpacity>
    </View>
  );
}
