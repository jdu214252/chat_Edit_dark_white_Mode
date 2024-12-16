import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { theme } from './theme'
import { ThemeProvider } from './ThemeContext'
import i18n from './i18n'; // Подключаем i18n
import { I18nextProvider } from 'react-i18next';
import { LanguageProvider } from './LanguageContext';
import AppContainer from './AppContainer';

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar style="light" backgroundColor={theme.colors.primary}></StatusBar>
          <AppContainer />
        </SafeAreaView>
      </ThemeProvider>
    </I18nextProvider>
    
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: theme.colors.white
  }
})