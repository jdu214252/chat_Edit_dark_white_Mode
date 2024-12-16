import React, {useState, useRef} from 'react'
import { ScrollView } from 'react-native'

import Message from './Message'
import { theme } from '../../theme';

import { useTheme } from '../../ThemeContext'; 

const MessagesList = ({onSwipeToReply}) => { //onSwipeEnd
  

    const [messages, setMessages] = useState([
      {
        user: 0,
        time: '12:00',
        content: 'Hey'
      },
      {
        user: 1,
        time: '12:05',
        content: "What's up"
      },
      {
        user: 1,
        time: '12:07',
        content: 'How is it going'
      },
      {
        user: 0,
        time: '12:09',
        content: 'things are going greate'
      },
      {
        user: 0,
        time: '12:00',
        content: 'Good :)'
      },
      {
        user: 1,
        time: '12:05',
        content: 'Should we hang out tommorow ? I was thinking of going somewhere which has drinks'
      },
      {
        user: 0,
        time: '12:07',
        content: 'Sure'
      },
      {
        user: 1,
        time: '12:09',
        content: 'Greate'
      },
      
    ]);

    const { isDarkMode } = useTheme();  

    const user = useRef(0);
    const scrollView = useRef();

    const handleSwipeEnd = () => {
      // Scroll to the last message after the swipe action
      scrollView.current.scrollToEnd({ animated: true });
    };

  return (
    <ScrollView  style={{
      backgroundColor: isDarkMode ? '#1C1C1C' : theme.colors.white || '#FFFFFF',
      flex: 1,
    }}  
      ref={(ref) => (scrollView.current = ref)} onContentSizeChange={() => {
      scrollView.current.scrollToEnd({animated: true})
    }} >
      {messages.map((message, index)=> (
        <Message key={index} time={message.time} isLeft={message.user !== user.current } message={message.content} onSwipe={onSwipeToReply} /> // onSwipeEnd={handleSwipeEnd}
      ))}
    </ScrollView>
  )
}

export default MessagesList;