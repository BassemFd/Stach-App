import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import TemporaryPage from './Screens/TemporaryPage'

import HomeScreen from './Screens/HomeScreen';
import ListScreen from './Screens/ListScreen';
import MapScreen from './Screens/MapScreen';
import ShopScreen from './Screens/ShopScreen';
import SignUpScreen from './Screens/SignUpScreen';
import SignInScreen from './Screens/SignInScreen';
import AppointmentScreen from './Screens/AppointmentScreen';
import DetailsScreen from './Screens/DetailsScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ContactScreen from './Screens/ContactScreen';

import { FontAwesome } from '@expo/vector-icons'; 




const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function ButtonTabShop() {
  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'List') {
            iconName = 'list-ul';
          } else if (route.name === 'Map') {
            iconName = 'map-o';
          } 
        return <FontAwesome name={iconName} size={25} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#4280AB',
      inactiveTintColor: '#333333',
      activeBackgroundColor: '#FFE082',
      inactiveBackgroundColor: '#FFECB2',
    }}
    >
		
      <Tab.Screen name="List" component={ListScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
  )};

  function ButtonTabSign() {
    return(
      <Tab.Navigator
      //   screenOptions={({ route }) => ({
      //     tabBarIcon: ({ color }) => {
      //       let iconName;
      //       if (route.name === 'Chat') {
      //         iconName = 'chat';
      //       } else if (route.name === 'Map') {
      //         iconName = 'map';
      //       } else {
      //         iconName = 'list';
      //       }
      //     return <Entypo name={iconName} size={25} color={color} />;
      //   },
      // })}
      // tabBarOptions={{
      //   activeTintColor: '#0984e3',
      //   inactiveTintColor: '#dfe6e9',
      //   style: {
      //     backgroundColor: '#130f40',
      //   }
      // }}
      >
      
        <Tab.Screen name="SignUp" component={SignUpScreen} />
        <Tab.Screen name="SignIn" component={SignInScreen} />
      </Tab.Navigator>
    )};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="TemporaryPage" component={TemporaryPage} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ButtonTabShop" component={ButtonTabShop} /> 
        <Stack.Screen name="Shop" component={ShopScreen} /> 
        <Stack.Screen name="ButtonTabSign" component={ButtonTabSign} />
        <Stack.Screen name="Appointment" component={AppointmentScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;