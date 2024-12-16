import React, { useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Button,
  TextInput,
  Text,
} from 'react-native';
import ConversationItem from './ConversationItem';
import { useTheme } from '../ThemeContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function Conversations() {
  const [selectedChats, setSelectedChats] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isDarkMode } = useTheme();

  const [chats, setChats] = useState([
    {
      picture: 'https://images.pexels.com/photos/28858569/pexels-photo-28858569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      username: 'Murphy Patrick',
      bio: 'This is Murphy Patrick',
      lastMessage: 'Hello there',
      time: '4:00 PM',
      notification: '2',
    },
    {
      picture: 'https://images.pexels.com/photos/24531988/pexels-photo-24531988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      username: 'Alex Jacks',
      bio: 'This is Alex Jacks',
      lastMessage: 'Hi!',
      time: '5:00 PM',
      notification: '1',
    },
    {
      picture: 'https://images.pexels.com/photos/28993974/pexels-photo-28993974.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
      username: 'Stephany Garcia',
      bio: 'This is Stephany',
      lastMessage: 'See you soon',
      time: '3:30 PM',
      notification: '3',
    },
  ]);

  const filteredChats = chats.filter((chat) =>
    chat.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectAll = () => {
    const allUsernames = chats.map((chat) => chat.username);
    setSelectedChats(allUsernames);
    setIsSelectionMode(true);
  };

  const deselectAll = () => {
    setSelectedChats([]);
    setIsSelectionMode(false);
  };

  const deleteSelectedChats = () => {
    const updatedChats = chats.filter(
      (chat) => !selectedChats.includes(chat.username)
    );
    setChats(updatedChats);
    setSelectedChats([]);
    setIsSelectionMode(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#1C1C1C' : '#fff'}]}>
      <TextInput
        style={styles.searchInput}
        placeholder="Поиск..."
        placeholderTextColor="#aaa"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {isSelectionMode && (
        <View style={[styles.actions]}>
        <FontAwesome.Button
          name="check"
          backgroundColor="#4CAF50"
          onPress={selectAll}
          iconStyle={styles.icon}
        >
          Выбрать все
        </FontAwesome.Button>
        <FontAwesome.Button
          name="times"
          backgroundColor="#FFC107"
          onPress={deselectAll}
          iconStyle={styles.icon}
        >
          Отменить все
        </FontAwesome.Button>
        <FontAwesome.Button
          name="trash"
          backgroundColor="#F44336"
          onPress={deleteSelectedChats}
          iconStyle={styles.icon}
        >
          Удалить
        </FontAwesome.Button>
      </View>
      
      )}

      {filteredChats.length > 0 ? (
        <ScrollView>
          {filteredChats.map((chat) => (
            <ConversationItem
              key={chat.username}
              {...chat}
              selectedChats={selectedChats}
              setSelectedChats={setSelectedChats}
              isSelectionMode={isSelectionMode}
              setIsSelectionMode={setIsSelectionMode}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noChats}>
          <Text style={styles.noChatsText}>Ничего не найдено</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f7f7f7',
  },
  searchInput: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10, // Отступ между иконкой и текстом
  },
  noChats: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noChatsText: {
    color: '#888',
    fontSize: 18,
    fontWeight: 'bold',
  },
});