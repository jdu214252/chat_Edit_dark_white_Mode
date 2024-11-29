import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from '@expo/vector-icons/FontAwesome5';

import { theme } from '../../theme';

export default function AddStoryCard() {
  return (
    <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.innerContainer}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: "https://images.pexels.com/photos/28999324/pexels-photo-28999324.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"}}/>
            </View>

            <View style={styles.iconContainer}>
              <Icon name="plus" size={15} color="white" style={styles.iconStyle} />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.text}>Add a Story</Text>
            </View>

          </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
      paddingBottom: 10
    },
    innerContainer:{
      paddingRight: 20,
      paddingLeft: 10,
      flexDirection: 'row'
    },
    imageContainer:{
      marginRight: 15,
      overflow: 'hidden',
      paddingVertical: 10,
    },
    image:{
      width: 50,
      height: 50,
      borderRadius: 25
    },
    iconContainer: {
      position: 'absolute',
      backgroundColor: theme.colors.primary,
      borderRadius: 12.5,
      height: 25,
      width: 25,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-end',
      top: 45
    },
    textContainer:{
      justifyContent: 'center'
    },
    text: {
      color: theme.colors.primary,
      fontSize: theme.fontSize.title,
      fontWeight: 'normal'
    }


})