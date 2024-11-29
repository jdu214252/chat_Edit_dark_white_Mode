import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, FlatList, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { theme } from '../../theme';
import Animated from 'react-native-reanimated';

const frequentlyUsed = ['😀', '😂', '😍', '😭', '😎', '👍', '❤️', '🎉', '🔥', '🙏'];
const allEmojis = [
  '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇',
  '😍', '😘', '😗', '😙', '😚', '😋', '😜', '😝', '😛', '🤑', '🤗', '🤔', '🤐',
  '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤',
  '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😵', '🤯', '🤠', '😎', '🤓', '🧐',
  // Add as many emojis as needed
];

export default function ChatInput({reply, closeReply, isLeft, username}) {
  const [message, setMessage] = useState('');
  const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);
  // const [heightValue, setHeightValue] = useState(new Animated.Value(70));

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji);
  };

//   useEffect(() => {
//     showReply();
//   }, [reply])

//   const showReply = () => {
//     Animated.timing();
//   };

  return (
    <KeyboardAvoidingView 
      style={[styles.container]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
     {reply ? (
  <View style={styles.replyContainer}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={styles.title}>Response to {isLeft ? username : 'Me'}</Text>
      <TouchableOpacity onPress={closeReply} style={styles.closeReplyButton}>
        <Icon name="close" size={20} color={theme.colors.description} />
      </TouchableOpacity>
    </View>
    <Text style={styles.reply}>{reply}</Text>
  </View>
) : null}

      <View style={styles.innerContainer}>
        <View style={styles.inputAndMicrophone}>
          <TouchableOpacity
            style={styles.emoticonButton}
            onPress={() => setEmojiPickerVisible(!isEmojiPickerVisible)}
          >
            <Icon name="emoticon-outline" size={23} color={theme.colors.description} />
          </TouchableOpacity>
          <TextInput
            multiline
            placeholder="Type something..."
            style={styles.input}
            onChangeText={(text) => setMessage(text)}
            value={message}
          />
          <TouchableOpacity style={styles.rightIconButtonStyle}>
            <Icon name="paperclip" size={23} color={theme.colors.description} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightIconButtonStyle}>
            <Icon name="camera" size={23} color={theme.colors.description} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.sendButton}>
          <Icon name={message ? 'send' : 'microphone'} size={23} color={theme.colors.white} />
        </TouchableOpacity>
      </View>

      {isEmojiPickerVisible && (
        <View style={styles.emojiPicker}>
          {/* Frequently Used Emojis */}
          <FlatList
            horizontal
            data={frequentlyUsed}
            keyExtractor={(item, index) => `freq-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleEmojiSelect(item)} style={styles.emojiButton}>
                <Text style={styles.emoji}>{item}</Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />

          {/* All Emojis */}
          <FlatList style={{marginBottom: 20}}
            data={allEmojis}
            keyExtractor={(item, index) => `all-${index}`}
            numColumns={8}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleEmojiSelect(item)} style={styles.emojiButton}>
                <Text style={styles.emoji}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 10,
  },
  replyContainer:{
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: "flex-start"
  },
  title:{
    marginTop: 5,
    fontWeight: 'bold',

  },
  closeReplyButton: {
    padding: 5,
    marginLeft: 10,
  },
  reply:{
    marginTop: 5,

  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputAndMicrophone: {
    flexDirection: 'row',
    backgroundColor: theme.colors.inputBackground,
    flex: 1,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 10,
    marginRight: 10,
  },
  input: {
    paddingLeft: 20,
    flex: 1, // Растягивает поле ввода на всю доступную высоту
    fontSize: 15,
    height: 45, // Устанавливаем одинаковую высоту для всех элементов
    textAlignVertical: 'center', // Центрирование текста по вертикали
    includeFontPadding: false, // Убирает лишние отступы для Android
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  emoticonButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  rightIconButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  sendButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiPicker: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    marginTop: 5,
    maxHeight: 300, // Set max height for scrolling
  },
  emojiButton: {
    padding: 8,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },
  emoji: {
    fontSize: 24
  },
});





////////////////////////////////// 1 variant ////////////////////////////////////////////////////
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
// import Icon from '@expo/vector-icons/MaterialCommunityIcons';
// import EmojiPicker from './emojis/EmojiPicker';
// import { theme } from '../../theme';
 
//  export default function ChatInput() {
//     const [message, setMessage] = useState('');
//    return (
//     <View style={[{height: 400}, styles.container]}>
//       <View style={styles.innerContainer}>
//        <View style={styles.inputAndMicrophone}>
//            <TouchableOpacity style={styles.emoticonButton}>
//                <Icon name="emoticon-outline" size={23} color={theme.colors.description}/>
//            </TouchableOpacity>
//            <TextInput multiline placeholder='Type something...' style={styles.input} onChangeText={text => setMessage(text)} />
//            <TouchableOpacity style={styles.rightIconButtonStyle}>
//                <Icon name="paperclip" size={23} color={theme.colors.description}/>
//            </TouchableOpacity>
//            <TouchableOpacity style={styles.rightIconButtonStyle}>
//                <Icon name="camera" size={23} color={theme.colors.description}/>
//            </TouchableOpacity>
//         </View>
//            <TouchableOpacity style={styles.sendButton}>
//                    <Icon name={message ? "send" : "microphone"} size={23} color={theme.colors.white}/>
//            </TouchableOpacity>
//       </View>
//       {/* <EmojiPicker /> */}
//     </View>
//    )
//  }
/////////////////////////////////////////////////////////////////////////////////////////////////









/////////////////////////// 2 VARIANT///////////////////////////////////////////
// import React, { useState } from 'react';
// import { View, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
// import Icon from '@expo/vector-icons/MaterialCommunityIcons';
// import EmojiPicker from './emojis/EmojiPicker';
// import { theme } from '../../theme';

// export default function ChatInput() {
//   const [message, setMessage] = useState('');
//   const [isEmojiPickerVisible, setEmojiPickerVisible] = useState(false);

//   const handleEmojiSelect = (emoji) => {
//     setMessage((prev) => prev + emoji);
//     setEmojiPickerVisible(false);
//   };

//   return (
//     <View style={[{ height: 400 }, styles.container]}>
//       <View style={styles.innerContainer}>
//         <View style={styles.inputAndMicrophone}>
//           <TouchableOpacity
//             style={styles.emoticonButton}
//             onPress={() => setEmojiPickerVisible(true)}
//           >
//             <Icon name="emoticon-outline" size={23} color={theme.colors.description} />
//           </TouchableOpacity>
//           <TextInput
//             multiline
//             placeholder="Type something..."
//             style={styles.input}
//             onChangeText={(text) => setMessage(text)}
//             value={message}
//           />
//           <TouchableOpacity style={styles.rightIconButtonStyle}>
//             <Icon name="paperclip" size={23} color={theme.colors.description} />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.rightIconButtonStyle}>
//             <Icon name="camera" size={23} color={theme.colors.description} />
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity style={styles.sendButton}>
//           <Icon name={message ? 'send' : 'microphone'} size={23} color={theme.colors.white} />
//         </TouchableOpacity>
//       </View>
//       <EmojiPicker
//         visible={isEmojiPickerVisible}
//         onSelect={handleEmojiSelect}
//         onClose={() => setEmojiPickerVisible(false)}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//     container: {
//         justifyContent: 'center',
//         backgroundColor: theme.colors.white
//     },
//     innerContainer:{
//         paddingHorizontal: 10,
//         marginHorizontal: 10,
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         flexDirection: 'row',
//         paddingVertical: 10
//     },
//     inputAndMicrophone:{
//         flexDirection: 'row',
//         backgroundColor: theme.colors.inputBackground,
//         flex: 3,
//         marginRight: 10,
//         paddingVertical: Platform.OS === "ios" ? 10 : 0,
//         borderRadius: 30,
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingVertical: 10, // Добавлено для симметрии
//         alignItems: 'center', // Центрирование иконок и ввода по вертикали
//         justifyContent: 'space-between',
//         height: 45, // Установите фиксированную высоту для контейнера

//     },
//     input: {
//         backgroundColor: 'transparent',
//         paddingLeft: 20,
//         color: theme.colors.inputText,
//         flex: 1, // Растягивает поле ввода на всю доступную высоту
//         fontSize: 15,
//         height: '100%', // Высота совпадает с контейнером
//         textAlignVertical: 'center', // Центрирование текста по вертикали
//         includeFontPadding: false, // Убирает лишние отступы для Android


//     },
    // input:{
    //     backgroundColor: 'transparent',
    //     paddingLeft: 20,
    //     color: theme.colors.inputText,
    //     flex: 3,
    //     fontSize: 15,
    //     height: 40,
    //     alignSelf: 'center',
    // },
    
//     rightIconButtonStyle:{
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingRight: 15,
//         paddingLeft: 10,
//         borderLeftWidth: 1,
//         borderLeftColor: '#fff'
//     },
//     emoticonButton:{
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingLeft: 10,
//     },
//     sendButton:{
//         backgroundColor: theme.colors.primary,
//         borderRadius: 50,
//         height: 50,
//         width: 50,
//         alignItems: 'center',
//         justifyContent: 'center'
//     }

// })