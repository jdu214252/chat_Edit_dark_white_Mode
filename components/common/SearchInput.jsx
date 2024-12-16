import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import Icon from '@expo/vector-icons/FontAwesome';

import { theme } from '../../theme';

import { useTheme } from '../../ThemeContext';

export default function SearchInput() {
    const { isDarkMode } = useTheme(); 
  return (
    <View style={styles.container}>
        <View style={styles.row}>
            <Icon name="search" size={20} color={theme.colors.searchIcon}/>
            <TextInput style={[styles.input, {color: isDarkMode ? '#D8C9E0' : '#000'}]}  placeholder='Search' maxLength={10}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        paddingVertical: 20,
        paddingHorizontal: 30
    },
    row:{
        backgroundColor: theme.colors.searchBackground,
        flexDirection: 'row',
        borderRadius: 5,
        height: 45,
        alignItems: 'center',
        paddingHorizontal: 10
    },
    input: {
        paddingHorizontal: 30,
        fontSize: 15,
        height: 45,
        flex: 1,
        color: theme.colors.searchText 
    }
})