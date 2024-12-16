import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Alert, Modal, FlatList } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Appearance } from 'react-native';
import { useTheme } from '../ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n';  // Импортируем i18n



import { LanguageContext } from '../LanguageContext';
import { theme } from '../theme';

const ProfScren2 = () => {
  const { isDarkMode, toggleDarkMode, setIsDarkMode } = useTheme();
  const [firstName, setFirstName] = useState('Иван');
  const [lastName, setLastName] = useState('Иванов');
  const [profilePicture, setProfilePicture] = useState(null);
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false); // Состояние для модалки выбора языка

  
  

  const navigation = useNavigation();

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedMode = await AsyncStorage.getItem('darkMode');
        if (storedMode !== null) {
          setIsDarkMode(JSON.parse(storedMode)); // Устанавливаем состояние через контекст
        } else {
          const colorScheme = Appearance.getColorScheme();
          setIsDarkMode(colorScheme === 'dark');
        }
      } catch (error) {
        console.error('Ошибка загрузки режима:', error);
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLang = await AsyncStorage.getItem('language');
        if (storedLang) {
          i18n.changeLanguage(storedLang);
        } else {
          const defaultLang = 'ru'; // Язык по умолчанию
          await AsyncStorage.setItem('language', defaultLang);
          i18n.changeLanguage(defaultLang);
        }
      } catch (error) {
        console.error('Ошибка загрузки языка:', error);
      }
    };
    loadLanguage();
  }, []);

  const handleEdit = (field) => {
    Alert.alert('Редактировать', `Вы хотите изменить ${field}?`);
  };

  // Функция для изменения языка
  const changeLanguage = async (lang) => {
    try {
      await AsyncStorage.setItem('language', lang); 
      Alert.alert('Язык изменен', `Выбранный язык: ${lang === 'ru' ? 'Русский' : 'Английский'}`);
      i18n.changeLanguage(lang); 
      setLanguageModalVisible(false);
    } catch (error) {
      console.error('Ошибка сохранения языка:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={27} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleDarkMode}>
          <Ionicons name={isDarkMode ? 'sunny' : 'moon'} size={30} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.profilePictureContainer} onPress={() => handleEdit('Фото')}>
          {profilePicture ? (
            <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
          ) : (
            <Ionicons name="camera" size={40} color="#888" />
          )}
        </TouchableOpacity>

        <View style={styles.nameContainer}>
          <TextInput
            style={[styles.nameInput, { color: isDarkMode ? '#fff' : '#000' }]}
            value={firstName}
            onChangeText={setFirstName}
            placeholder={i18n.t('Имя')} 
            placeholderTextColor={isDarkMode ? '#bbb' : '#666'}
          />
          <TextInput
            style={[styles.nameInput, { color: isDarkMode ? '#fff' : '#000' }]}
            value={lastName}
            onChangeText={setLastName}
            placeholder={i18n.t('Фамилия')}  
            placeholderTextColor={isDarkMode ? '#bbb' : '#666'}
          />
        </View>

        <View style={styles.settings}>
          <TouchableOpacity onPress={() => navigation.navigate('ChatSettings')}style={styles.settingItem}>
            <MaterialCommunityIcons name="chat" size={24} color={isDarkMode ? '#fff' : '#333'} />
            <Text style={[styles.settingText, { color: isDarkMode ? '#fff' : '#333' }]}>
              {i18n.t('Настройки чата')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.push('PrivacyScreen')} style={styles.settingItem}>
            <Ionicons name="lock-closed" size={24} color={isDarkMode ? '#fff' : '#333'} />
            <Text style={[styles.settingText, { color: isDarkMode ? '#fff' : '#333' }]}>
              {i18n.t('Конфиденциальность')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setLanguageModalVisible(true)} style={styles.settingItem}>
            <Ionicons name="language" size={24} color={isDarkMode ? '#fff' : '#333'} />
            <Text style={[styles.settingText, { color: isDarkMode ? '#fff' : '#333' }]}>
              {i18n.t('Язык')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Модалка для выбора языка */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isLanguageModalVisible}
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <FlatList
              data={[
                { label: 'Русский', value: 'ru' },
                { label: 'English', value: 'en' },
              ]}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => changeLanguage(item.value)}
                >
                  <Text style={styles.modalItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.value}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setLanguageModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'linear-gradient(90deg, #007BFF, #00C6FF)',
    borderRadius: 12,
  },  
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profilePictureContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    marginBottom: 20,
    backgroundColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  nameContainer: {
    marginBottom: 30,
    width: '100%',
  },
  nameInput: {
    fontSize: 18,
    padding: 12,
    marginBottom: 15,
    borderBottomWidth: 2,
    borderColor: '#ccc',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  settings: {
    width: '100%',
    marginTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  settingText: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 15,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: 300,
  },
  modalItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    padding: 12,
    backgroundColor: theme.colors.primary,  //#007BFF
    borderRadius: 8,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ProfScren2;