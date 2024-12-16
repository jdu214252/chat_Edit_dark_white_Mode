import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch, FlatList, Modal, Alert, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';

const PrivacyScreen = () => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'Все',
    statusVisibility: 'Только друзья',
    photoVisibility: 'Все',
  });
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [isOnlineVisible, setIsOnlineVisible] = useState(true);
  const [isReadReceiptsEnabled, setIsReadReceiptsEnabled] = useState(true);
  const [isTwoFactorAuthEnabled, setIsTwoFactorAuthEnabled] = useState(false);
  const [isPrivacyModalVisible, setPrivacyModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const { isDarkMode } = useTheme();

  const [isAuthModalVisible, setAuthModalVisible] = useState(false); // Модалка для двухфакторной аутентификации
  const [passwordVisible, setPasswordVisible] = useState(false); // Состояние для видимости пароля

  const navigation = useNavigation();

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem('privacySettings');
        if (storedSettings) setPrivacySettings(JSON.parse(storedSettings));

        const storedBlockedUsers = await AsyncStorage.getItem('blockedUsers');
        if (storedBlockedUsers) setBlockedUsers(JSON.parse(storedBlockedUsers));
      } catch (error) {
        console.error('Ошибка загрузки настроек:', error);
      }
    };
    loadSettings();
  }, []);

  const updatePrivacySetting = async (key, value) => {
    const updatedSettings = { ...privacySettings, [key]: value };
    setPrivacySettings(updatedSettings);
    await AsyncStorage.setItem('privacySettings', JSON.stringify(updatedSettings));
  };

 const toggleTwoFactorAuth = async () => {
    setAuthModalVisible(true); 
  };

  const handleTwoFactorAuth = () => {
    if (password === '12345') { 
      setIsTwoFactorAuthEnabled((prev) => !prev);
      Alert.alert(
        'Двухфакторная аутентификация',
        !isTwoFactorAuthEnabled
          ? 'Двухфакторная аутентификация включена.'
          : 'Двухфакторная аутентификация отключена.'
      );
      setAuthModalVisible(false); // Закрытие модалки после успешной аутентификации
    } else {
      Alert.alert('Ошибка', 'Неверный пароль');
    }
  };

  const blockUser = (user) => {
    setBlockedUsers((prev) => [...prev, user]);
    AsyncStorage.setItem('blockedUsers', JSON.stringify([...blockedUsers, user]));
  };

  const unblockUser = (user) => {
    const updatedUsers = blockedUsers.filter((u) => u !== user);
    setBlockedUsers(updatedUsers);
    AsyncStorage.setItem('blockedUsers', JSON.stringify(updatedUsers));
  };

  const privacyOptions = ['Все', 'Только друзья', 'Никто'];

  return (
    
    <View style={[styles.container, {backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5'}]}>
        
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>


      <Text style={[styles.title, {color: isDarkMode ? "#fff" : "#000"}]}>Настройки конфиденциальности</Text>

      {/* Приватность профиля */}
      <TouchableOpacity
        style={styles.settingItem}
        onPress={() => setPrivacyModalVisible(true)}
      >
        <Text style={styles.settingText}>Приватность профиля</Text>
        <Ionicons name="chevron-forward" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Блокировка пользователей */}
      <Text style={[styles.subtitle, {color: isDarkMode ? "#fff" : "#000"}]}>Заблокированные пользователи</Text>
      <FlatList
        data={blockedUsers}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.blockedUserItem}>
            <Text style={styles.userText}>{item}</Text>
            <TouchableOpacity onPress={() => unblockUser(item)}>
              <Text style={styles.unblockText}>Разблокировать</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noUsersText}>Нет заблокированных пользователей</Text>
        }
      />
      <TouchableOpacity onPress={() => blockUser('Пользователь 1')} style={styles.blockButton}>
        <Text style={styles.blockButtonText}>Заблокировать "Пользователь 1"</Text>
      </TouchableOpacity>

      {/* Скрытие активности */}
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, {color: isDarkMode ? "#fff" : "#000"}]}>Показывать статус "в сети"</Text>
        <Switch
          value={isOnlineVisible}
          onValueChange={() => setIsOnlineVisible(!isOnlineVisible)}
          thumbColor="#fff"
          trackColor={{ false: '#888', true: '#888' }}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, {color: isDarkMode ? "#fff" : "#000"}]}>Уведомления о прочтении</Text>
        <Switch
          value={isReadReceiptsEnabled}
          onValueChange={() => setIsReadReceiptsEnabled(!isReadReceiptsEnabled)}
          thumbColor="#fff"
          trackColor={{ false: '#888', true: '#888' }}
        />
      </View>
      

      {/* Двухфакторная аутентификация */}
      <TouchableOpacity style={styles.settingItem} onPress={toggleTwoFactorAuth}>
        <Text style={styles.settingText}>
          {isTwoFactorAuthEnabled ? 'Отключить' : 'Включить'} двухфакторную аутентификацию
        </Text>
      </TouchableOpacity>
      
      {/* Модалка для ввода пароля для двухфакторной аутентификации */}
      <Modal
        visible={isAuthModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setAuthModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Введите пароль для двухфакторной аутентификации</Text>
            <View style={styles.passwordInputContainer}>
            <TextInput
              style={[styles.passwordInput, { color: '#fff' }]}
              secureTextEntry={!passwordVisible}
              placeholder="Введите пароль"
              value={password} // Привязка к состоянию
              onChangeText={(text) => setPassword(text)} // Обновление состояния при изменении текста
            />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <Ionicons
                  name={passwordVisible ? 'eye-off' : 'eye'}
                  size={20}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.confirmButton} onPress={handleTwoFactorAuth}>
              <Text style={styles.confirmButtonText}>Подтвердить</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setAuthModalVisible(false)}
            >
              <Text style={styles.closeModalText}>Закрыть</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Модалка для настроек приватности */}
      <Modal
        visible={isPrivacyModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setPrivacyModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Настройки приватности</Text>
          {Object.keys(privacySettings).map((key) => (
            <View key={key} style={styles.modalOption}>
              <Text style={styles.modalOptionText}>{key}</Text>
              {privacyOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => updatePrivacySetting(key, option)}
                >
                  <Text style={privacySettings[key] === option ? styles.selectedOption : styles.option}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => setPrivacyModalVisible(false)}
          >
            <Text style={styles.closeModalText}>Закрыть</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20},
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#333',
    borderRadius: 8,
    marginBottom: 10,
  },
  settingText: { fontSize: 18, color: '#fff' },
  subtitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20, color: '#fff' },
  blockedUserItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#444',
    borderRadius: 8,
    marginBottom: 10,
  },
  userText: { fontSize: 16, color: '#fff' },
  unblockText: { color: theme.colors.primary, fontSize: 16 },
  noUsersText: { color: '#888', fontSize: 16, marginTop: 10 },
  blockButton: {
    paddingVertical: 10,
    backgroundColor: '#ff4444',
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  blockButtonText: { color: '#fff', fontSize: 16 },
  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 },
  switchLabel: { fontSize: 18, color: '#fff' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
  },
  modalTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#fff' },
  modalOption: { marginVertical: 10 },
  modalOptionText: { fontSize: 18, fontWeight: '500', color: '#fff' },
  option: { fontSize: 16, color: '#aaa' },
  selectedOption: { fontSize: 16, color: theme.colors.primary, fontWeight: 'bold' },
  closeModalButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
  },
  closeModalText: { color: '#000', fontSize: 16 },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#fff' },
  passwordInput: {
    width: '100%',
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 8,
    color: '#fff',
    marginBottom: 15,
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    marginBottom: 10,
  },
  confirmButtonText: { color: '#fff', fontSize: 18 },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
});

export default PrivacyScreen;
