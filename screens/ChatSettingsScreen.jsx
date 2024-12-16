import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { theme } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';

const ChatSettingsScreen = () => {
  const [fontSize, setFontSize] = useState(16);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState(null);
  
  const navigation = useNavigation();

  const { isDarkMode } = useTheme();

  const backgrounds = [
    { type: 'gradient', value: ['#ff7e5f', '#feb47b'] },
    { type: 'gradient', value: ['#00c6ff', '#0072ff'] },
    { type: 'gradient', value: ['#6a11cb', '#2575fc'] },
    { type: 'gradient', value: ['#acb6e5', '#86fde8'] },
    { type: 'image', value: 'https://img.freepik.com/free-vector/messages-light-colour-background_78370-2586.jpg?ga=GA1.1.1343514240.1733401089&semt=ais_hybrid' },
    { type: 'image', value: 'https://img.freepik.com/free-vector/dialogue-chat-clouds-speech-bubble-icon-from-lines-triangles-particle-style-design-low-poly-technology-devices-people-communication-concept-blue-background_587448-472.jpg?ga=GA1.1.1343514240.1733401089&semt=ais_hybrid' },
    { type: 'image', value: 'https://img.freepik.com/free-vector/vector-social-contact-seamless-pattern-white-blue_1284-41919.jpg?ga=GA1.1.1343514240.1733401089&semt=ais_hybrid' },
  ];

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedFontSize = await AsyncStorage.getItem('fontSize');
        const storedTheme = await AsyncStorage.getItem('isDarkTheme');
        const storedBackground = await AsyncStorage.getItem('selectedBackground');

        if (storedFontSize !== null) setFontSize(Number(storedFontSize));
        if (storedTheme !== null) setIsDarkTheme(JSON.parse(storedTheme));
        if (storedBackground !== null) setSelectedBackground(JSON.parse(storedBackground));
      } catch (error) {
        console.error('Error loading settings', error);
      }
    };

    loadSettings();
  }, []);

  const applyBackground = (item) => {
    setSelectedBackground(item);
  };

  const resetToDefault = async () => {
    setSelectedBackground(null);
    await AsyncStorage.setItem('selectedBackground', JSON.stringify(null));
  };

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('fontSize', fontSize.toString());
      await AsyncStorage.setItem('isDarkTheme', JSON.stringify(isDarkTheme));
      await AsyncStorage.setItem('selectedBackground', JSON.stringify(selectedBackground));
    } catch (error) {
      console.error('Error saving settings', error);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: isDarkMode ? '#1e1e1e' : '#fff'}]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={25} color={isDarkMode ? theme.colors.white : theme.colors.black} />
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={[styles.label, isDarkMode && styles.darkText]}>Размер текста сообщений</Text>
        <Slider
          style={styles.slider}
          minimumValue={12}
          maximumValue={24}
          step={1}
          value={fontSize}
          onValueChange={(value) => setFontSize(value)}
          minimumTrackTintColor= {theme.colors.messageBackground}
          maximumTrackTintColor="#d3d3d3"
        />
        <Text style={[styles.fontSizeDisplay, isDarkMode && styles.darkText]}>{fontSize}</Text>
      </View>

      <View style={styles.chatPreview}>
        {selectedBackground?.type === 'gradient' ? (
          <LinearGradient colors={selectedBackground.value} style={styles.chatBackground}>
            <View style={styles.messageContainer}>
              <Text style={[styles.chatTextSender, { fontSize }]}>Доброе утро! 👋</Text>
            </View>
            <View style={styles.messageContainer}>
              <Text style={[styles.chatTextReceiver, { fontSize }]}>Знаешь, который час?</Text>
            </View>
          </LinearGradient>
        ) : selectedBackground?.type === 'image' ? (
          <ImageBackground source={{ uri: selectedBackground.value }} style={styles.chatBackground}>
            <View style={styles.messageContainer}>
              <Text style={[styles.chatTextSender, { fontSize }]}>Доброе утро! 👋</Text>
            </View>
            <View style={styles.messageContainer}>
              <Text style={[styles.chatTextReceiver, { fontSize }]}>Знаешь, который час?</Text>
            </View>
          </ImageBackground>
        ) : (
          <View style={styles.chatBackground}>
            <View style={styles.messageContainer}>
              <Text style={[styles.chatTextSender, { fontSize }]}>Доброе утро! 👋</Text>
            </View>
            <View style={styles.messageContainer}>
              <Text style={[styles.chatTextReceiver, { fontSize }]}>Знаешь, который час?</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={[styles.label, isDarkMode && styles.darkText]}>Выберите фон</Text>
        <FlatList
          horizontal
          data={backgrounds}
          keyExtractor={(item, index) => `background-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.backgroundItem}
              onPress={() => applyBackground(item)}
            >
              {item.type === 'gradient' ? (
                <LinearGradient colors={item.value} style={styles.backgroundPreview} />
              ) : (
                <ImageBackground
                  source={{ uri: item.value }}
                  style={styles.backgroundPreview}
                />
              )}
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity style={styles.applyButton} onPress={saveSettings}>
        <Text style={styles.applyButtonText}>Установить</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.applyButton} onPress={resetToDefault}>
        <Text style={styles.applyButtonText}>Сбросить</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#1e1e1e',
  },
  backButton: {
    marginTop: 10,
    padding: 8,
    borderRadius: 16,
    width: 40,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  darkText: {
    color: '#fff',
  },
  slider: {
    width: '100%',
    height: 30,
  },
  fontSizeDisplay: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  chatPreview: {
    flex: 0.8,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
  },
  chatBackground: {
    flex: 1,
    padding: 6,
    justifyContent: 'center',
  },
  messageContainer: {
    marginBottom: 10,
  },
  chatTextSender: {
    color: '#000',
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  chatTextReceiver: {
    color: '#fff',
    alignSelf: 'flex-end',
    padding: 8,
    borderRadius: 8,
    backgroundColor: theme.colors.messageBackground,
  },
  backgroundItem: {
    marginRight: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },
  backgroundPreview: {
    width: 60,
    height: 60,
  },
  applyButton: {
    backgroundColor: theme.colors.messageBackground,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});


export default ChatSettingsScreen;
