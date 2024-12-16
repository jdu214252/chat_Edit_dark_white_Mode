import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Icon from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme'
import { useTheme } from '../../ThemeContext'; 

export default function ChatHeader({username, bio, picture, onlineStatus, onPress }) {
    const navigation = useNavigation();
    const { currentTheme } = useTheme();  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary}]}>
      <TouchableOpacity style={styles.backButton}>
        <Icon name="angle-left" size={30} color={theme.colors.white} onPress={() => navigation.goBack()} />
      </TouchableOpacity>
      <View style={styles.profileOptions}>
        <TouchableOpacity style={styles.profile}>
            <Image style={styles.image} source={{uri: picture}}/>
            <View style={styles.usernameAndOnlineStatus}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.onlineStatus}>{onlineStatus}</Text>
            </View>
        </TouchableOpacity>
        <View style={styles.options}>
            
            <TouchableOpacity onPress={() => navigation.navigate("OnCallScreen", {
                username: username,
                picture: picture,
                })} style={{paddingHorizontal: 10}}
            >
                <Icon name="phone" size={25} color={theme.colors.white}/>
            </TouchableOpacity>
            
            <TouchableOpacity style={{paddingHorizontal: 10}}>
                <Icon name="ellipsis-v" size={25} color={theme.colors.white}/>
            </TouchableOpacity>
        
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        backgroundColor: theme.colors.primary,
        paddingTop: 20,
        paddingBottom: 10,
        // borderBottomWidth: 0.5, // ширина границы
        // borderBottomColor: '#130d36'
    },
    backButton: {
        alignSelf: 'center',
        paddingHorizontal: 10
    },
    profileOptions:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10
    },
    profile:{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 4
    },
    image:{
        height: 45,
        width: 45,
        borderRadius: 32.5
    },
    usernameAndOnlineStatus:{
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 10
    },
    username:{
        color: theme.colors.white,
        fontSize: 18,
        fontWeight: 'bold'
    },
    onlineStatus:{
        color: theme.colors.white,
        fontSize: 16
    },
    options:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',

    }
    
})