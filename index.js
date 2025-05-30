/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import AppEntry from './src/components/AppEntry';
import {name as appName} from './app.json';

// For production use App, for testing our new screen use AppEntry
AppRegistry.registerComponent(appName, () => AppEntry);
