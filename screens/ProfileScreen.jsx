import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from '../ThemeContext';

export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState('Иван');
  const [surname, setSurname] = useState('Иванов');
  const [editingName, setEditingName] = useState(false);
  const [editingSurname, setEditingSurname] = useState(false);

  const { currentTheme } = useTheme(); 

  return (
    <View style={[styles.container, {backgroundColor: currentTheme.colors.back}]}>
      {/* Кнопка "Назад" */}
      <TouchableOpacity style={[styles.backButton, {backgroundColor: currentTheme.colors.icon}]} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color={currentTheme.colors.arrow_icon_color} />
      </TouchableOpacity>

      <LinearGradient colors={currentTheme.colors.prof_con_back  || ['#4facfe', '#00f2fe']} style={styles.header}>   {/* ['#4facfe', '#00f2fe'] */}
        <Image
          style={styles.avatar}
          source={{
            uri: 'https://images.pexels.com/photos/28999324/pexels-photo-28999324.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
          }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            value={name}
            onChangeText={setName}
            editable={editingName}
            style={[styles.input, editingName && styles.inputEditing]}
          />
          <TouchableOpacity onPress={() => setEditingName(!editingName)}>
            <Icon name="pencil" size={20} color={editingName ? '#00f2fe' : '#fff'} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={surname}
            onChangeText={setSurname}
            editable={editingSurname}
            style={[styles.input, editingSurname && styles.inputEditing]}
          />
          <TouchableOpacity onPress={() => setEditingSurname(!editingSurname)}>
            <Icon name="pencil" size={20} color={editingSurname ? '#00f2fe' : '#fff'} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingOption}  onPress={() => navigation.navigate('ChatSettings')} >
          <Icon name="message" size={24} color={currentTheme.colors.prof_icon} />
          <Text style={[styles.settingText, {color: currentTheme.colors.setting}]}>Настройки чатов</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingOption}>
          <Icon name="shield-lock" size={24} color={currentTheme.colors.prof_icon} />
          <Text style={[styles.settingText, {color: currentTheme.colors.setting}]}>Конфиденциальность</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingOption}>
          <Icon name="earth" size={24} color={currentTheme.colors.prof_icon} />
          <Text style={[styles.settingText, {color: currentTheme.colors.setting}]}>Язык</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[styles.logoutButton, {backgroundColor: currentTheme.colors.exit}]}>
        <Text style={styles.logoutText}>Выйти</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    backgroundColor: '#4facfe',
    padding: 10,
    borderRadius: 20,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    // marginTop: 50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
  },
  inputEditing: {
    borderBottomWidth: 1,
    borderBottomColor: '#00f2fe',
    paddingBottom: 2,
  },
  settingsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  settingText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#4facfe',
  },
  logoutButton: {
    backgroundColor: '#4facfe',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 30,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
