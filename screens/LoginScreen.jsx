import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, G } from 'react-native-svg';

export default function LoginScreen() {
  const navigation = useNavigation();
  const rotation = useSharedValue(0);

  // Анимация вращения
  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 3000 }), -1, false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image style={styles.backgroundImage} source={require('../assets/images/back_3.jpg')} />
      <View style={styles.overlay} />

      {/* Вращающийся круг с черточками */}
      <View style={styles.circleContainer}>
        <Animated.View style={[styles.animatedCircle, animatedStyle]}>
          <Svg height="150" width="150" viewBox="0 0 120 120">
            <G>
              <Circle
                cx="60"
                cy="60"
                r="50"
                stroke="#d4af37"
                strokeWidth="6"
                strokeDasharray="15,10" // Длина штриха и зазора
                fill="none"
              />
            </G>
          </Svg>
        </Animated.View>
        <Image
          source={require('../assets/images/log_pic.jpg')} // Замените на вашу картинку
          style={styles.innerImage}
        />
      </View>

      {/* lights */}
      {/* <View style={styles.lightContainer}>
        <Image style={styles.lightLarge} source={require('../assets/images/light.png')} />
        <Image style={styles.lightSmall} source={require('../assets/images/light.png')} />
      </View> */}

      {/* title and form */}
      <View style={styles.formContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Login</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput placeholder="Email" placeholderTextColor="gray" style={styles.input} />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="gray"
              secureTextEntry
              style={styles.input}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.push('Home')}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.push('SignUp')}>
              <Text style={styles.linkButton}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
  },
  backgroundImage: {
    position: 'absolute',
    height: '50%',
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    height: '50%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  circleContainer: {
    position: 'absolute',
    top: 60,
    width: '100%',
    alignItems: 'center',
  },
  animatedCircle: {
    position: "absolute",
    top: 55,
    height: 150,
    width: 150,
  },
  innerImage: {
    position: "absolute",
    top: 77.5,
    width: 106,
    height: 106,
    borderRadius: 70, // Картинка будет круглой
  },
  lightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
  },
  lightLarge: {
    height: 225,
    width: 90,
  },
  lightSmall: {
    height: 160,
    width: 65,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-around',
    paddingTop: 150,
    paddingBottom: 10,
    width: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 30
  },
  title: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  inputContainer: {
    alignItems: 'center',
    marginHorizontal: 16,
    gap: 16,
  },
  inputWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    padding: 16,
    borderRadius: 16,
    width: '100%',
  },
  input: {
    color: 'black',
    fontSize: 16,
  },
  buttonWrapper: {
    width: '100%',
  },
  button: {
    backgroundColor: '#d4af37', //
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
    color: 'black',
  },
  linkButton: {
    fontSize: 16,
    color: '#d4af37',
    fontWeight: 'bold',
  },
});
