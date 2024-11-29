import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, ActivityIndicator, Button  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@expo/vector-icons/FontAwesome';
import { useTheme } from '../../ThemeContext';  // Подключаем контекст темы

export default function Header({ title, navigation }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { currentTheme } = useTheme();  // Получаем текущую тему из контекста

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

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.colors.primary }]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerTitle, { color: currentTheme.colors.icon }]}>{title}</Text>

        {/* Иконка погоды */}
        <TouchableOpacity onPress={fetchWeather} style={styles.weatherIconContainer}>
          <Icon name="cloud" size={24} color={currentTheme.colors.icon} />
        </TouchableOpacity>


        <Button
          title="Профиль"
          onPress={() => navigation.navigate('ProfScren2')}
          color={currentTheme.colors.icon}
        />

        {/* Профиль */}
        {/* <TouchableOpacity onPress={() => navigation.navigate('ProfScren2')} style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://images.pexels.com/photos/28999324/pexels-photo-28999324.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
            }}
          />
        </TouchableOpacity> */}
      </View>

      {/* Модальное окно для погоды */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <LinearGradient colors={['#4facfe', '#00f2fe']} style={[styles.modalContainer, {backgroundColor: currentTheme.colors.back } ]}>  
            {loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : weatherData ? (
              <>
                <Text style={styles.cityText}>{weatherData.city}, {weatherData.country}</Text>
                <Icon name="cloud" size={80} color="white" />

                <Text style={styles.temperatureText}>
                  {Math.round(weatherData.temperature)}°C
                </Text>
                <Text style={styles.descriptionText}>
                  {weatherData.description.charAt(0).toUpperCase() + weatherData.description.slice(1)}
                </Text>
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailText}>Влажность: {weatherData.humidity}%</Text>
                  <Text style={styles.detailText}>Скорость ветра: {weatherData.windSpeed} м/с</Text>
                </View>
              </>
            ) : (
              <Text style={styles.errorText}>Не удалось загрузить данные о погоде</Text>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Закрыть</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
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
