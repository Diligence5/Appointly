import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AgentProfileScreen from '../screen/profile/main/AgentProfileScreen';

const AppEntry = () => {
  return (
    <SafeAreaProvider>
      <AgentProfileScreen />
    </SafeAreaProvider>
  );
};

export default AppEntry; 