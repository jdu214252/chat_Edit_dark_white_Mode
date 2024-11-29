import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Здесь вы можете добавить другие темы
const themes = {
  light: {
    colors: {
      primary: '#FFC107',
      white: '#ffffff',
      black: '#000000',
      messageBackground: '#1B5583',
      back: '#ffffff',
      title: '#b9b9b9',
      icon: '#ffffff',
      prof_icon: '#FFC107',
      setting: '#000000',
      prof_con_back: ['#FFC107', '#FFC107'],
      arrow_icon: '#ffa60b',
      arrow_icon_color: '#000000',
      exit: '#FFC107',
      message_header: '#FFC107'
      // и так далее...
    },
  },
  dark: {
    colors: {
      primary: '#2F3136',
      white: '#000000',
      black: '#ffffff',
      messageBackground: '#333',
      back: '#2F3136',
      title: '#b9b9b9',
      icon: '#ffffff',
      prof_icon: '#ffffff',
      setting: '#ffffff',
      prof_con_back: ['#4facfe', '#00f2fe'],
      arrow_icon: '#4facfe',
      arrow_icon_color: '#000000',
      exit: '#4facfe',
      message_header: '#2F3138'
      // и так далее...
    },
  },
};

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(themes.light);  // По умолчанию светлая тема

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme && themes[savedTheme]) {
          setCurrentTheme(themes[savedTheme]);
        }
      } catch (error) {
        console.error('Failed to load theme from storage', error);
      }
    };

    loadTheme();
  }, []);

  const switchTheme = async (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themes[themeName]);
      try {
        await AsyncStorage.setItem('theme', themeName);
      } catch (error) {
        console.error('Failed to save theme to storage', error);
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
