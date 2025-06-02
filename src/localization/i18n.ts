import i18next, {InitOptions} from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from './en.json'; // Your English translations
import hi from './hi.json'; // Your Hindi translations

// Define the shape of the translation resources
interface Resources {
  [key: string]: {
    translation: Record<string, string>;
  };
}

// Define the resources object with language files
const resources: Resources = {
  en: {
    translation: en,
  },
  hi: {
    translation: hi,
  },
};

// Initialize i18next with the resources and language detection
const options: InitOptions = {
  resources,
  lng: 'en', // Default language
  fallbackLng: 'en', // Fallback language
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  react: {
    useSuspense: false, // Important for RN
  },
  debug: __DEV__, // Enable debug in development
};

i18next.use(initReactI18next).init(options);

// Handle localization changes based on device language
const handleLocalizationChange = (): void => {
  const locales = RNLocalize.getLocales();
  const languageTag = locales[0]?.languageTag.split('-')[0] || 'en';
  console.log('Device language:', languageTag);
  console.log('Available languages:', Object.keys(resources));
  if (Object.keys(resources).includes(languageTag)) {
  i18next.changeLanguage(languageTag);
    console.log('Set language to:', languageTag);
  } else {
    i18next.changeLanguage('en');
    console.log('Fallback to English');
  }
};

// Initially set the language
handleLocalizationChange();

// Export the configured i18next instance
export default i18next;
