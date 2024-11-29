import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { theme } from './theme'
import { ThemeProvider } from './ThemeContext'

import AppContainer from './AppContainer';

export default function App() {
  return (
    <ThemeProvider>
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={theme.colors.primary}></StatusBar>
      <AppContainer />
    </SafeAreaView>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: theme.colors.white
  }
})