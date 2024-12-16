// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "Имя": "First Name",
        "Фамилия": "Last Name",
        "Настройки чата": "Chat Settings",
        "Конфиденциальность": "Privacy",
        "Язык": "Language",
        "chat": "Chat",
        "weather": "Weather",
        "humidity": "Humidity",
        "windspeed": "Wind Speed",
        "close": "Close",
        "messages": "Messages",
        "stories" : "Stroies",
        "calls" : "Calls"
      }
    },
    ru: {
      translation: {
        "Имя": "Имя",
        "Фамилия": "Фамилия",
        "Настройки чата": "Настройки чата",
        "Конфиденциальность": "Конфиденциальность",
        "Язык": "Язык",
        "chat": "Чат",
        "weather": "Погода",
        "humidity": "Влажность",
        "windspeed": "Скорость ветра",
        "close": "Закрыть",
        "messages": "Сообщения",
        "stories" : "Истории",
        "calls" : "Звонки"
      }
    }
  },
  lng: "ru", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false // React already safes from xss
  }
});

export default i18n;
