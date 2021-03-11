import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import NavigatorStack from './NavigatorStack';

import Header from '../shared/Header';

import SignInScreen from '../Screens/SignInScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import ContactScreen from '../Screens/ContactScreen';
import Home from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import LogOutScreen from '../Screens/LogOutScreen';
import FavoritesScreen from '../Screens/FavoritesScreen';

import { connect } from 'react-redux';


const Drawer = createDrawerNavigator();

function DrawerNavigator(props) {
  let conditionnalDrawer;
  if (props.token == '') {
    conditionnalDrawer = (
      <Drawer.Navigator
        initialRouteName='HomeScreen'
        drawerStyle={{
          backgroundColor: '#FFFAEB',
        }}
        screenOptions={{ headerShown: true }}
      >
        <Drawer.Screen
          name='HomeScreen'
          component={NavigatorStack}
          options={({ navigation }) => {
            return {
              headerLeft: () => <Header navigation={navigation} />,
              drawerLabel: 'Reprendre la recherche',
              headerStyle: {
                backgroundColor: '#FFE082',
                height: 100,
                elevation: 0,
              },
              headerTitle: "'Stach",
              headerTitleAlign: 'center',
              headerTitleStyle: {
                marginTop: 10,
                fontFamily: 'caveat-regular',
                fontSize: 44,
              },

              drawerIcon: ({ focused, size }) => (
                <Icon
                  name='undo'
                  size={24}
                  color={focused ? '#7cc' : '#4280AB'}
                />
              ),
            };
          }}
        />
        <Drawer.Screen
          name='Home'
          component={Home}
          options={({ navigation }) => {
            return {
              drawerLabel: ' Nouvelle Recherche',
              headerStyle: {
                backgroundColor: '#FFE082',
                height: 100,
                elevation: 0,
              },
              headerTitle: "'Stach",
              headerTitleAlign: 'center',
              headerTitleStyle: {
                marginTop: 10,
                fontFamily: 'caveat-regular',
                fontSize: 44,
              },
              headerLeft: () => <Header navigation={navigation} />,
              drawerIcon: ({ focused, size }) => (
                <Icon
                  name='search'
                  size={24}
                  color={focused ? '#7cc' : '#4280AB'}
                />
              ),
            };
          }}
        />
        <Drawer.Screen
          name='SignUpScreen'
          component={SignUpScreen}
          options={({ navigation }) => {
            return {
              drawerLabel: "S'inscrire",
              headerStyle: {
                backgroundColor: '#FFE082',
                height: 100,
                elevation: 0,
              },
              headerTitle: "'Stach",
              headerTitleAlign: 'center',
              headerTitleStyle: {
                marginTop: 10,
                fontFamily: 'caveat-regular',
                fontSize: 44,
              },
              headerLeft: () => <Header navigation={navigation} />,
              drawerIcon: ({ focused, size }) => (
                <Icon
                  name='user-plus'
                  size={24}
                  color={focused ? '#7cc' : '#4280AB'}
                />
              ),
            };
          }}
        />
        <Drawer.Screen
          name='SignInScreen'
          component={SignInScreen}
          options={({ navigation }) => {
            return {
              drawerLabel: '  Se connecter',
              headerStyle: {
                backgroundColor: '#FFE082',
                height: 100,
                elevation: 0,
              },
              headerTitle: "'Stach",
              headerTitleAlign: 'center',
              headerTitleStyle: {
                marginTop: 10,
                fontFamily: 'caveat-regular',
                fontSize: 44,
              },
              headerLeft: () => <Header navigation={navigation} />,
              drawerIcon: ({ focused, size }) => (
                <Icon
                  name='sign-in'
                  size={24}
                  color={focused ? '#7cc' : '#4280AB'}
                />
              ),
            };
          }}
        />

        <Drawer.Screen
          name='ContactScreen'
          component={ContactScreen}
          options={({ navigation }) => {
            return {
              drawerLabel: ' Contactez-nous',
              headerStyle: {
                backgroundColor: '#FFE082',
                height: 100,
                elevation: 0,
              },
              headerTitle: "'Stach",
              headerTitleAlign: 'center',
              headerTitleStyle: {
                marginTop: 10,
                fontFamily: 'caveat-regular',
                fontSize: 44,
              },
              headerLeft: () => <Header navigation={navigation} />,
              drawerIcon: ({ focused, size }) => (
                <Icon
                  name='envelope'
                  size={24}
                  color={focused ? '#7cc' : '#4280AB'}
                />
              ),
            };
          }}
        />
      </Drawer.Navigator>
    );
  } else {
    conditionnalDrawer = (
      <Drawer.Navigator
        initialRouteName='HomeScreen'
        drawerStyle={{
          backgroundColor: '#FFFAEB',
        }}
        screenOptions={{ headerShown: true }}
      >
        <Drawer.Screen
          name='HomeScreen'
          component={NavigatorStack}
          options={({ navigation }) => {
            return {
              headerLeft: () => <Header navigation={navigation} />,
              drawerLabel: 'Reprendre la recherche',
              headerStyle: {
                backgroundColor: '#FFE082',
                height: 100,
                elevation: 0,
              },
              headerTitle: "'Stach",
              headerTitleAlign: 'center',
              headerTitleStyle: {
                marginTop: 10,
                fontFamily: 'caveat-regular',
                fontSize: 44,
              },
              drawerIcon: ({ focused, size }) => (
                <Icon
                  name='undo'
                  size={24}
                  color={focused ? '#7cc' : '#4280AB'}
                />
              ),
            };
          }}
        />
        <Drawer.Screen
          name='Home'
          component={Home}
          options={({ navigation }) => {
            return {
              drawerLabel: 'Nouvelle Recherche',
              headerStyle: {
                backgroundColor: '#FFE082',
                height: 100,
                elevation: 0,
              },
              headerTitle: "'Stach",
              headerTitleAlign: 'center',
              headerTitleStyle: {
                marginTop: 10,
                fontFamily: 'caveat-regular',
                fontSize: 44,
              },
              headerLeft: () => <Header navigation={navigation} />,
              drawerIcon: ({ focused, size }) => (
                <Icon
                  name='search'
                  size={24}
                  color={focused ? '#7cc' : '#4280AB'}
                />
              ),
            };
          }}
        />

        <Drawer.Screen
          name='ProfileScreen'
          component={ProfileScreen}
          options={({ navigation }) => {
            return {
              drawerLabel: '  Mes rendez-vous',
              headerStyle: {
                backgroundColor: '#FFE082',
                height: 100,
                elevation: 0,
              },
              headerTitle: "'Stach",
              headerTitleAlign: 'center',
              headerTitleStyle: {
                marginTop: 10,
                fontFamily: 'caveat-regular',
                fontSize: 44,
              },
              headerLeft: () => <Header navigation={navigation} />,
              drawerIcon: ({ focused, size }) => (
                <Icon
                  name='user'
                  size={24}
                  color={focused ? '#7cc' : '#4280AB'}
                />
              ),
            };
          }}
        />
        <Drawer.Screen
          name='FavoritesScreen'
          component={FavoritesScreen}
          options={({ navigation }) => {
            return {
              drawerLabel: 'Mes favoris',
              headerStyle: {
                backgroundColor: '#FFE082',
                height: 100,
                elevation: 0,
              },
              headerTitle: "'Stach",
              headerTitleAlign: 'center',
              headerTitleStyle: {
                marginTop: 10,
                fontFamily: 'caveat-regular',
                fontSize: 44,
              },
              headerLeft: () => <Header navigation={navigation} />,
              drawerIcon: ({ focused, size }) => (
                <Icon
                  name='star'
                  size={24}
                  color={focused ? '#7cc' : '#4280AB'}
                />
              ),
            };
          }}
        />
        <Drawer.Screen
          name='Se deconnecter'
          component={LogOutScreen}
          options={({ navigation }) => {
            return {
              drawerLabel: 'Se deconnecter',
              headerStyle: {
                backgroundColor: '#FFE082',
                height: 100,
                elevation: 0,
              },
              headerTitle: "'Stach",
              headerTitleAlign: 'center',
              headerTitleStyle: {
                marginTop: 10,
                fontFamily: 'caveat-regular',
                fontSize: 44,
              },
              headerLeft: () => <Header navigation={navigation} />,
              drawerIcon: ({ focused, size }) => (
                <Icon
                  name='sign-out'
                  size={24}
                  color={focused ? '#7cc' : '#4280AB'}
                />
              ),
            };
          }}
        />
        <Drawer.Screen
          name='ContactScreen'
          component={ContactScreen}
          options={({ navigation }) => {
            return {
              drawerLabel: 'Contactez-nous',
              headerStyle: {
                backgroundColor: '#FFE082',
                height: 100,
                elevation: 0,
              },
              headerTitle: "'Stach",
              headerTitleAlign: 'center',
              headerTitleStyle: {
                marginTop: 10,
                fontFamily: 'caveat-regular',
                fontSize: 44,
              },
              headerLeft: () => <Header navigation={navigation} />,
              drawerIcon: ({ focused, size }) => (
                <Icon
                  name='envelope'
                  size={24}
                  color={focused ? '#7cc' : '#4280AB'}
                />
              ),
            };
          }}
        />
      </Drawer.Navigator>
    );
  }

  return <NavigationContainer>{conditionnalDrawer}</NavigationContainer>;
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveToken: () => {
      dispatch({ type: 'REMOVE_TOKEN' });
    },
  };
};
const mapStateToProps = (state) => {
  return { token: state.token };
};
export default connect(mapStateToProps, mapDispatchToProps)(DrawerNavigator);
