import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../ThemeContext';  // Импортируем контекст

// Данные для тем с их основными цветами
const themes = [
  { id: '1', name: 'Светлая тема', themeName: 'light', backgroundColor: '#ffffff', textColor: '#000000' },
  { id: '2', name: 'Темная тема', themeName: 'dark', backgroundColor: '#212121', textColor: '#ffffff' },
//   { id: '3', name: 'Синяя тема', themeName: 'blue', backgroundColor: '#2196F3', textColor: '#ffffff' },
//   { id: '4', name: 'Красная тема', themeName: 'red', backgroundColor: '#F44336', textColor: '#ffffff' },
];

export default function ChatSettingsScreen({ navigation }) {
  const { currentTheme, switchTheme } = useTheme();  // Получаем текущую тему и функцию для её изменения
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);

  const handleSelectTheme = (themeName) => {
    switchTheme(themeName);  // Меняем тему
    setSelectedTheme(themes.find((theme) => theme.themeName === themeName));  // Обновляем выбранную тему
    navigation.goBack();  // Возвращаемся на предыдущий экран
  };

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.colors.back }]}>
      <Text style={styles.header}>Выберите тему</Text>
      <FlatList
        data={themes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.themeButton,
              selectedTheme.themeName === item.themeName && styles.selectedButton,
              { backgroundColor: item.backgroundColor },  // Цвет фона для каждой темы
            ]}
            onPress={() => handleSelectTheme(item.themeName)}
          >
            <Text style={{ color: item.textColor, fontWeight: 'bold' }}>{item.name}</Text>
            {selectedTheme.themeName === item.themeName && (
              <Text style={[styles.selectedText, { color: item.textColor }]}>(Выбрано)</Text>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000000'
  },
  themeButton: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedButton: {
    borderWidth: 2,
    borderColor: '#ffffff',  // Белая рамка для выбранной темы
  },
  selectedText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});
