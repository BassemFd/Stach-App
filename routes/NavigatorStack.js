import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import HomeScreen from '../Screens/HomeScreen';
import ListScreen from '../Screens/ListScreen';
import MapScreen from '../Screens/MapScreen';
import ShopScreen from '../Screens/ShopScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import SignInScreen from '../Screens/SignInScreen';
import AppointmentScreen from '../Screens/AppointmentScreen';
import DetailsScreen from '../Screens/DetailsScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import ContactScreen from '../Screens/ContactScreen';
import Filtres from '../Screens/FiltresScreen';
import LogOutScreen from '../Screens/LogOutScreen';
import FavoritesScreen from '../Screens/FavoritesScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function ButtonTabSign() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name == 'SignIn') {
            iconName = 'user';
          } else if (route.name == 'SignUp') {
            iconName = 'user-plus';
          }

          return <FontAwesome name={iconName} size={25} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#4280AB',
        inactiveTintColor: '#333',
        style: {
          backgroundColor: '#FFCD41',
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: 'Se connecter',
        }}
        name='SignIn'
        component={SignInScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "S'inscrire",
        }}
        name='SignUp'
        component={SignUpScreen}
      />
    </Tab.Navigator>
  );
}

function ButtonTabShop() {
  return (
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
      <Tab.Screen name='List' component={ListScreen} />
      <Tab.Screen name='Map' component={MapScreen} />
    </Tab.Navigator>
  );
}

function NavigatorStack() {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='ButtonTabShop' component={ButtonTabShop} />
      <Stack.Screen name='Shop' component={ShopScreen} />
      <Stack.Screen name='ButtonTabSign' component={ButtonTabSign} />
      <Stack.Screen name='Appointment' component={AppointmentScreen} />
      <Stack.Screen name='Details' component={DetailsScreen} />
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='Contact' component={ContactScreen} />
      <Stack.Screen name='Filtres' component={Filtres} />
      <Stack.Screen name='LogOutScreen' component={LogOutScreen} />
      <Stack.Screen name='Favorites' component={FavoritesScreen} />
    </Stack.Navigator>
  );
}

export default NavigatorStack;
