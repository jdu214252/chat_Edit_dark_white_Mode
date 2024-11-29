import React from 'react'
import { ScrollView } from 'react-native'

import ConversationItem from './ConversationItem'

export default function Conversations({ children }) {
  return (
    <ScrollView>
      {children}
      <ConversationItem  picture="https://images.pexels.com/photos/28993974/pexels-photo-28993974.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
        username="Murphy Patrick"
        bio="my name is Murphy Patrick"
        lastMessage="Hello there"
        time="4:00 PM"
        notification="2"
        isBlocked
        isMuted
        hasStory
      />  

      <ConversationItem  picture="https://images.pexels.com/photos/24531988/pexels-photo-24531988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
        username="Mark James"
        bio="my name is Mark James"
        lastMessage="Hello there"
        time="4:00 PM"
        isBlocked
        isMuted
        hasStory
      />  

      <ConversationItem  picture="https://images.pexels.com/photos/28858569/pexels-photo-28858569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
        username="Alex Jacks"
        bio="my name is Alex Jacks"
        lastMessage="Hello there"
        time="4:00 PM"
        notification="3"
        isBlocked
        isMuted
        hasStory
      />  

      <ConversationItem  picture="https://images.pexels.com/photos/27573923/pexels-photo-27573923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
        username="Alica Jhons"
        bio="my name is Alica Jhons"
        lastMessage="Hello there"
        time="4:00 PM"
        notification="5"
        isBlocked
        isMuted
        hasStory
      />  

      <ConversationItem  picture="https://images.pexels.com/photos/9021993/pexels-photo-9021993.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" 
        username="Stephany Garcia"
        bio="my name is Stephany Garcia"
        lastMessage="Hello there"
        time="4:00 PM"
        isBlocked
        isMuted
        hasStory
      />  

      <ConversationItem  picture="https://images.pexels.com/photos/20271116/pexels-photo-20271116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
        username="Nina Gomez"
        bio="my name is Nina Gomez"
        lastMessage="Hello there"
        time="4:00 PM"
        notification="1"
        isBlocked
        isMuted
        hasStory
      />  
    </ScrollView>
  )
}