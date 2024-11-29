import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme';
import { useTheme } from '../../ThemeContext';

export default function StoryItem({ picture, username, time, stories }) {
  const navigation = useNavigation();

  const { currentTheme } = useTheme(); 

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: picture}}/>
        </View>
        <View style={styles.textsContainer}>
          <Text numberOfLines={1} style={[styles.username, {color: currentTheme.colors.black}]}>{username}</Text>
          <Text numberOfLines={1} style={[styles.time, {color: currentTheme.colors.title}]}>{time}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  button:{
    flexDirection: 'row',
    paddingBottom: 12,
    paddingRight: 20,
    paddingLeft: 10
  },
  imageContainer:{
    marginRight: 15,
    borderRadius: 25,
    height: 50,
    width: 50,
    overflow: 'hidden',
    borderColor: theme.colors.storyBorder,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  image: {
    width: 50,
    height: 50,
  },
  textsContainer:{
    justifyContent: 'center',

  },  
  username: {
    color: theme.colors.title,
    fontSize: theme.fontSize.title
  },
  time: {
    color: theme.colors.subTitle,
    fontSize: theme.fontSize.subTitle
  },
});
  