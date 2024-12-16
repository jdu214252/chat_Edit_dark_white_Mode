import React, { useState, useEffect  } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, ActivityIndicator, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import Icon from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../../ThemeContext';
import { useTranslation } from 'react-i18next';
import { theme } from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';


export default function Header({ title, navigation }) {
  const { t, i18n } = useTranslation();  // Подключение переводов
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [ghostMode, setGhostMode] = useState(false); 
  const [fadeAnim] = useState(new Animated.Value(0)); 
  const [showGhostMessage, setShowGhostMessage] = useState(false); 


  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, []);

  // const changeLanguage = async (languageCode) => {
  //   i18n.changeLanguage(languageCode);
  //   await AsyncStorage.setItem('language', languageCode);
  // };

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=Tashkent,uz&appid=ac43652720e72e55c992e9a142c0e415&units=metric'
      );
      const data = await response.json();
      setWeatherData({
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
        city: data.name,
        country: data.sys.country,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
      });
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
      setModalVisible(true);
    }
  };


  useEffect(() => {
    if (showGhostMessage) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => setShowGhostMessage(false));
        }, 2000); // Показывать текст 2 секунды
      });
    }
  }, [showGhostMessage]);


const toggleGhostMode = () => {
  setGhostMode(prevState => !prevState);
  setShowGhostMessage(true);
};

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.primary}]}>
      <View style={styles.headerContainer}>
{/* 
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Icon name="bars" size={24} color="white" />
      </TouchableOpacity> */}

        <Text style={styles.headerTitle}>{"DeFensy"}</Text>

        <TouchableOpacity onPress={fetchWeather} style={styles.weatherIconContainer}>
          <Icon name="cloud" size={24} color="white" />
        </TouchableOpacity>
        

        {/* Icon  Ghost for Ghost mode */}
        <TouchableOpacity onPress={toggleGhostMode} style={styles.iconContainer}>
          <Icon name="ghost" size={24} color={ghostMode ? 'green' : 'white'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ProfScren2')} style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://images.pexels.com/photos/28999324/pexels-photo-28999324.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
            }}
          />
        </TouchableOpacity>
      </View>


      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.modalContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : weatherData ? (
              <>
                <Text style={styles.cityText}>{`${weatherData.city}, ${weatherData.country}`}</Text>
                <Icon name="cloud" size={80} color="white" />
                <Text style={styles.temperatureText}>{`${Math.round(weatherData.temperature)}°C`}</Text>
                <Text style={styles.descriptionText}>
                  {weatherData.description.charAt(0).toUpperCase() + weatherData.description.slice(1)}
                </Text>
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailText}>{`${t('humidity')}: ${weatherData.humidity}%`}</Text>
                  <Text style={styles.detailText}>{`${t('windspeed')}: ${weatherData.windSpeed} м/с`}</Text>
                </View>
              </>
            ) : (
              <Text style={styles.errorText}>{t('error')}</Text>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>{t('close')}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>

      {showGhostMessage && (
  <Animated.View style={[styles.ghostModeContainer, { opacity: fadeAnim }]}>
    <Text style={styles.ghostModeText}>
      {ghostMode ? 'Ghost mode enabled!' : 'Ghost mode disabled!'}
    </Text>
  </Animated.View>
)}
    </View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white'
  },
  weatherIconContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
  },
  imageContainer: {
    borderRadius: 20,
    height: 40,
    width: 40,
    overflow: 'hidden',
    marginLeft: 10,
  },
  image: {
    height: 40,
    width: 40,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  cityText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  temperatureText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 15,
  },
  detailsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    color: 'white',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  closeButtonText: {
    color: '#4facfe',
    fontWeight: 'bold',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
  },
  ghostModeContainer: {
    position: 'absolute',
    top: 8,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  ghostModeText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});



















///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React from 'react'
// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

// import { theme } from '../../theme'

// export default function Header({ title }) { // Изменено
//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <Text style={styles.headerTitle}>{title}</Text>
//         <TouchableOpacity onPress={() => {}} style={styles.imageContainer}>
//           <Image
//             style={styles.image}
//             source={{
//               uri: 'https://images.pexels.com/photos/28999324/pexels-photo-28999324.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
//             }}
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: theme.colors.primary,
//     paddingTop: 30,
//     paddingBottom: 10,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     backgroundColor: 'transparent',
//     justifyContent: 'space-between',
//     marginHorizontal: 15,
//     marginVertical: 10,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: theme.colors.white,
//     alignSelf: 'center',
//   },
//   imageContainer: {
//     borderRadius: 20,
//     height: 40,
//     width: 40,
//     overflow: 'hidden',
//   },
//   image: {
//     height: 40,
//     width: 40,
//   },
// })
