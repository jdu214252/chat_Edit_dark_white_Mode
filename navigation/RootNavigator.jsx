import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
    
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import MessagesScreen from '../screens/MessagesScreen';
import OnCallScreen from '../screens/OnCallScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatSettingsScreen from '../screens/ChatSettingsScreen';
import ProfScren2 from '../screens/ProfScren2';

import HomeNavigator from './HomeNavigator';
import Header from '../components/common/Header';
import PrivacyScreen from '../screens/PrivacyScreen';
import NewSetChat from '../screens/NewSetChat';

const Stack = createStackNavigator();

export default function RootNavigator() {
  return (

      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
        <Stack.Screen name="Home" component={HomeNavigator} options={{
          headerShown: true,
          header: ({ navigation }) => <Header title="Chat" navigation={navigation} />
        }}/>
        <Stack.Screen name="MessagesScreen" component={MessagesScreen}/>
        <Stack.Screen name="PrivacyScreen" component={PrivacyScreen}/>
        <Stack.Screen name="OnCallScreen" component={OnCallScreen}/>
        {/* <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Профиль' }} /> */}
        <Stack.Screen name="ProfScren2" component={ProfScren2}  options={{ title: 'Профиль' }} />
        <Stack.Screen name="ChatSettings" component={ChatSettingsScreen} />
        <Stack.Screen name="NewSetChat" component={NewSetChat} />
      </Stack.Navigator>
  )
}