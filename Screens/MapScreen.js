import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {globalStyles} from '../styles/Global';
import MapView, {Marker} from 'react-native-maps';
import Button from '../shared/Button';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

var coiffeurs = [
  {
  shopName: 'Coup Tif',
  shopImages: [require('../assets/coiffeur1.jpeg'), require('../assets/coiffeur2.jpeg')],
  shopAddress: '72 rue dulong, 75017, Paris',
  shopPhone: '0100000000',
  shopMail: 'couptif@gmail.com',
  shopDescription: 'lorem lorem lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem lorem',
  shopFeatures: ['wheelchair-alt', 'glass', 'gamepad'],
  comments: [],
  shopEmployees: ['Fred', 'Dany'],
  offers: ['coupe homme', 'coupe femme'], 
  packages: ['playstation'],
  schedule: [],
  atHome: false,
  appointments: [],
  priceFork: 1,
  rating: 4,
  },
  {
    shopName: 'Coiff',
    shopImages: [require('../assets/coiffeur3.jpeg'), require('../assets/coiffeur4.jpeg')],
    shopAddress: '23 rue Legendre, 75017, Paris',
    shopPhone: '0200000000',
    shopMail: 'coiff@gmail.com',
    shopDescription: 'lorem lorem lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem lorem',
    shopFeatures: ['coffee', 'leaf', 'paw'],
    comments: [],
    shopEmployees: ['Philippe', 'Emma'],
    offers: ['coupe homme', 'coupe femme', 'coupe enfant'], 
    packages: ['à deux'],
    schedule: [],
    atHome: true,
    appointments: [],
    priceFork: 2,
    rating: 2,
    },
  ]

export default function Map() {


  const [shopsList, setShopsList] = useState([]);
  // const [userLocation, setUserLocation] = useState({})
  
  console.log('shopsList', shopsList);
  

  useEffect(() => {
    async function getLocation() {
        // let { status } = await Permissions.askAsync(Permissions.LOCATION);
        // if (status === 'granted') {
        //   Location.watchPositionAsync({ distanceInterval: 2 },
        //     (location) => {
        //       setUserLocation({latitude: location.coords.latitude, longitude: location.coords.longitude});
        //     }
        //   );
        // }
        var shopsTab = [];
        for (let i=0; i<coiffeurs.length; i++) {
          let locationGeo = await Location.geocodeAsync(coiffeurs[i].shopAddress);
          // console.log('locationGeo', locationGeo)
          let shop = {shopName: coiffeurs[i].shopName, shopAddress: coiffeurs[i].shopAddress, latitude: locationGeo[0].latitude, longitude: locationGeo[0].longitude, priceFork: coiffeurs[i].priceFork, shopFeatures: coiffeurs[i].shopFeatures, rating: coiffeurs[i].rating}
          shopsTab.push(shop);
          //setShopsList([...shopsList, shopsTab])
        }
        //console.log('shopTab', shopsTab)
        setShopsList(shopsTab);
      }
      getLocation();
  }, []);

  return (
    <View style={styles.container}>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingTop: 30, paddingBottom: 10}}>
          <Button title="Filtrer" backgroundColor="#FFCD41" ></Button>
          <Button title="Trier" backgroundColor="#FFCD41"></Button>
        </View>
        <MapView style={styles.map}
        initialRegion={{
          latitude: 48.8876513,
          longitude: 2.3037661,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          }} >  
          <Marker coordinate={{latitude: 48.8876513, longitude: 2.3037661}} />

          {/* {userLocation ?
           <Marker coordinate={{ latitude : userLocation.latitude, longitude : userLocation.longitude}} pinColor="#fd79a8" /> : null } */}

          {shopsList > 0 ? 
            shopsList.map((element,i) => {
              return (
              <Marker coordinate={{latitude: 48.8876513, longitude: 2.3037661}} title='hello' pinColor="#f4a261"/>
              )
            })
          : null } 
          
          </MapView>

          
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE082'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.85,
  },
});