
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
LogBox.ignoreLogs(['Cannot update a component from inside the function body of a different component']);
LogBox.ignoreLogs(['Failed prop type: Invalid prop `children` of type `array` supplied to `Overlay`, expected a single ReactElement']);


import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import shopDetails from './reducers/OfferDetails.reducer';
import search from './reducers/Search.reducer';
import selectedService from './reducers/ModalSelectedService.reducer';
import details from './reducers/ChosenAppointment.reducer';
import shopsData from './reducers/shopsData.reducer';
import token from './reducers/token.reducer';
import communication from './reducers/Communication.reducer';

import DrawerNavigator from './routes/DrawerNavigator';

const store = createStore(
  combineReducers({
    shopDetails,
    search,
    selectedService,
    details,
    shopsData,
    token,
    communication,
  })
);


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
    return (
      <Provider store={store}>
        <DrawerNavigator />
      </Provider>
    );
  }
}
