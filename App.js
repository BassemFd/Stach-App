//Uncheck if you want hide the warning logs
// import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['Warning: ...']);
// LogBox.ignoreAllLogs();

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import Navigator from './routes/NavigatorStack';

export default function App() {
  let [fonstLoaded] = useFonts({
    'nunito-regular': require('./assets/fonts/NunitoSans-Regular.ttf'),
    'nunito-bold': require('./assets/fonts/NunitoSans-Bold.ttf'),
    'caveat-regular': require('./assets/fonts/Caveat-Regular.ttf'),
    'caveat-bold': require('./assets/fonts/Caveat-Bold.ttf'),
    'graduate-regular': require('./assets/fonts/Graduate-Regular.ttf'),
  });

  if (!fonstLoaded) {
    return <AppLoading />;
  } else {
    return <Navigator />;
  }
}
