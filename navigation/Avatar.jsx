import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Avatar = () => {
  return (
    <View style={styles.avatarContainer}>
    <Image
      source={{
        uri: 'https://images.pexels.com/photos/28999324/pexels-photo-28999324.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
      }}
      style={styles.avatar}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});

export default Avatar;
