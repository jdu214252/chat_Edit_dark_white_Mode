import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';
import MessagesList from './messages/MessagesList';
import { theme } from '../theme';

export default function ConversationItem({
  picture,
  username,
  bio,
  lastMessage,
  time,
  notification,
  selectedChats,
  setSelectedChats,
  isSelectionMode,
  setIsSelectionMode,
}) {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLongPress = () => {
    if (!isSelectionMode) {
      setIsSelectionMode(true);
    }
    if (!selectedChats.includes(username)) {
      setSelectedChats([...selectedChats, username]);
    }
  };

  const handlePress = () => {
    if (isSelectionMode) {
      if (selectedChats.includes(username)) {
        const updatedSelectedChats = selectedChats.filter((chat) => chat !== username);
        setSelectedChats(updatedSelectedChats);
        if (updatedSelectedChats.length === 0) {
          setIsSelectionMode(false);
        }
      } else {
        setSelectedChats([...selectedChats, username]);
      }
    } else {
      navigation.navigate('MessagesScreen', { username, bio, picture });
    }
  };

  const toggleModal = () => setModalVisible(!modalVisible);

  return (
    <>
      <TouchableOpacity
        style={[styles.conversation, selectedChats.includes(username) && styles.selected]}
        onLongPress={handleLongPress}
        onPress={handlePress}
      >
        <TouchableOpacity onPress={toggleModal}>
          <Image source={{ uri: picture }} style={styles.picture} />
        </TouchableOpacity>
        <View style={styles.info}>
          <Text style={[styles.username, { color: isDarkMode ? '#fff' : '#2e2e2e' }]}>{username}</Text>
          <Text style={styles.lastMessage}>{lastMessage}</Text>
        </View>
        <Text style={styles.time}>{time}</Text>
        {notification && (
          <View style={styles.notification}>
            <Text style={styles.notificationText}>{notification}</Text>
          </View>
        )}
      </TouchableOpacity>


      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalBackground} onPress={toggleModal} />
          <View style={[styles.chatContainer, {backgroundColor: isDarkMode ? '#1C1C1C' : '#fff'}]}>
        
            <View style={styles.userInfo}>
              <Image source={{ uri: picture }} style={styles.modalPicture} />
              <Text style={styles.modalUsername}>{username}</Text>
              <Text style={styles.modalBio}>{bio}</Text>
            </View>


            <ScrollView style={styles.chatScroll}>
              <MessagesList />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  conversation: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 7,
    marginHorizontal: 10,
    borderRadius: 15,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  selected: {
    backgroundColor: '#A8A8A8',
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  picture: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderColor: '#bbb',
    borderWidth: 2,
    marginRight: 10,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2e2e2e',
  },
  lastMessage: {
    color: '#707070',
    marginTop: 5,
    fontSize: 14,
  },
  time: {
    color: '#b0b0b0',
    fontSize: 13,
  },
  notification: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginLeft: 10,
    shadowColor: '#ff0000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackground: {
    flex: 1,
    width: '100%',
  },
  chatContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 15,
    height: '70%',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 15,
  },
  modalPicture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  modalUsername: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBio: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  chatScroll: {
    flex: 1,
  },
});
