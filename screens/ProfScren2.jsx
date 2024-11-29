import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Alert } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Appearance } from 'react-native';

const ProfScren2 = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [firstName, setFirstName] = useState('Иван');
  const [lastName, setLastName] = useState('Иванов');
  const [profilePicture, setProfilePicture] = useState(null); // Placeholder for profile image
  
  const navigation = useNavigation();


  useEffect(() => {
    const colorScheme = Appearance.getColorScheme();
    setIsDarkMode(colorScheme === 'dark');
  }, []);


  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  
  const handleEdit = (field) => {
    Alert.alert('Редактировать', `Вы хотите изменить ${field}?`);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#1e1e1e' : '#f5f5f5' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color={isDarkMode ? '#fff' : '#000'} />
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
            placeholder="Имя"
            placeholderTextColor={isDarkMode ? '#bbb' : '#666'}
          />
          <TextInput
            style={[styles.nameInput, { color: isDarkMode ? '#fff' : '#000' }]}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Фамилия"
            placeholderTextColor={isDarkMode ? '#bbb' : '#666'}
          />
        </View>

        
        <View style={styles.settings}>
          <TouchableOpacity onPress={() => handleEdit('Настройки чата')} style={styles.settingItem}>
            <MaterialCommunityIcons name="chat" size={24} color={isDarkMode ? '#fff' : '#333'} />
            <Text style={[styles.settingText, { color: isDarkMode ? '#fff' : '#333' }]}>Настройки чата</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEdit('Конфиденциальность')} style={styles.settingItem}>
            <Ionicons name="lock-closed" size={24} color={isDarkMode ? '#fff' : '#333'} />
            <Text style={[styles.settingText, { color: isDarkMode ? '#fff' : '#333' }]}>Конфиденциальность</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEdit('Язык')} style={styles.settingItem}>
            <Ionicons name="language" size={24} color={isDarkMode ? '#fff' : '#333'} />
            <Text style={[styles.settingText, { color: isDarkMode ? '#fff' : '#333' }]}>Язык</Text>
          </TouchableOpacity>
        </View>
      </View>
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
});

export default ProfScren2;
