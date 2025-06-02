/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  LogBox,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from './src/navigation/Routes';
import { useEffect } from 'react';
// Import i18n configuration
import './src/localization/i18n';


function App(): React.JSX.Element {
  useEffect(() => {
    // Ignore specific log notifications
    LogBox.ignoreLogs(['Warning: ...']);
    LogBox.ignoreAllLogs(true);
  }, []);


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <Routes />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}
export default App;