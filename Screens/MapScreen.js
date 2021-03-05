import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { globalStyles } from '../styles/Global';
import MapView, { Marker } from 'react-native-maps';
import Button from '../shared/Button';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Overlay } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import {connect} from 'react-redux';


// var coiffeurs = [
//   {
//     shopName: 'Coup Tif',
//     shopImages: [
//       'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
//       'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
//     ],
//     shopAddress: '72 rue dulong, 75017, Paris',
//     shopPhone: '0100000000',
//     shopMail: 'couptif@gmail.com',
//     shopDescription:
//       'lorem lorem lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem lorem',
//     shopFeatures: ['wheelchair-alt', 'glass', 'gamepad'],
//     comments: [],
//     shopEmployees: ['Fred', 'Dany'],
//     offers: ['coupe homme', 'coupe femme'],
//     packages: ['playstation'],
//     schedule: [],
//     atHome: false,
//     appointments: [],
//     priceFork: 1,
//     rating: 4,
//   },
//   {
//     shopName: 'Coiff',
//     shopImages: [
//       'https://images.pexels.com/photos/6171/hairstyle-hair-wedding-bride.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
//       'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
//     ],
//     shopAddress: '23 rue Legendre, 75017, Paris',
//     shopPhone: '0200000000',
//     shopMail: 'coiff@gmail.com',
//     shopDescription:
//       'lorem lorem lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem lorem',
//     shopFeatures: ['coffee', 'leaf', 'paw'],
//     comments: [],
//     shopEmployees: ['Philippe', 'Emma'],
//     offers: ['coupe homme', 'coupe femme', 'coupe enfant'],
//     packages: ['à deux'],
//     schedule: [],
//     atHome: true,
//     appointments: [],
//     priceFork: 2,
//     rating: 2,
//   },
// ];

function Map(props) {


  const [shopsList, setShopsList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [shopDetails, setShopDetails] = useState({});
  const [euros, setEuros] = useState([]);
  const [features, setFeatures] = useState([]);
  const [rating, setRating] = useState([]);
  const [url, setUrl] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude]  = useState(null)
 
  
  useEffect(() => {

    setShopsList(props.shopsData);
    // console.log('search', props.search);
    setLatitude(props.search.latitude);
    setLongitude(props.search.longitude);

    // async function getLocation() {
    //     // let { status } = await Permissions.askAsync(Permissions.LOCATION);
    //     // if (status === 'granted') {
    //     //   Location.watchPositionAsync({ distanceInterval: 2 },
    //     //     (location) => {
    //     //       setUserLocation({latitude: location.coords.latitude, longitude: location.coords.longitude});
    //     //     }
    //     //   );
    //     // }
    //     var shopsTab = [];
    //     for (let i=0; i<coiffeurs.length; i++) {
    //       let locationGeo = await Location.geocodeAsync(coiffeurs[i].shopAddress);
    //       let shop = {shopName: coiffeurs[i].shopName, shopAddress: coiffeurs[i].shopAddress, latitude: locationGeo[0].latitude, longitude: locationGeo[0].longitude, priceFork: coiffeurs[i].priceFork, shopFeatures: coiffeurs[i].shopFeatures, rating: coiffeurs[i].rating, shopImages: coiffeurs[i].shopImages, shopPhone: coiffeurs[i].shopPhone, shopMail: coiffeurs[i].shopMail, shopDescription:coiffeurs[i].shopDescription, comments: coiffeurs[i].comments, shopEmployees: coiffeurs[i].shopEmployees, offers: coiffeurs[i].offers, packages: coiffeurs[i].packages, schedule: coiffeurs[i].schedule, atHome: coiffeurs[i].atHome, appointments: coiffeurs[i].appointments  };
    //       shopsTab.push(shop);
    //     }
       
      
    // }
    // getLocation();
  
  }, []);

  var overlay = (element) => {
    setVisible(true);
    setShopDetails(element);

    var priceTab = [];
    for (let y = 0; y < 3; y++) {
      var color = 'white';
      if (y < element.priceFork) {
        color = 'black';
      }
      priceTab.push(
        <FontAwesome name='euro' size={15} color={color} style={styles.pad} />
      );
    }
    setEuros(priceTab);

    var pictoTab = [];
    for (let z = 0; z < element.shopFeatures.length; z++) {
      pictoTab.push(
        <FontAwesome
          name={element.shopFeatures[z]}
          size={15}
          color='black'
          style={styles.pad}
        />
      );
    }
    setFeatures(pictoTab);

    var starsTab = [];
    for (let j = 0; j < 5; j++) {
      var color = 'black';
      if (j < element.rating) {
        color = 'gold';
      }
      starsTab.push(
        <FontAwesome
          style={{ marginRight: 5 }}
          name='star'
          size={24}
          color={color}
        />
      );
    }
    setRating(starsTab);

    // console.log('element', element)
    var image = element.shopImages[0];
    // console.log('image', image);
    setUrl(image);
  };

  function navigation(shopDetails) {
    props.navigation.navigate('Shop');
    setVisible(false);
    props.saveChoosenOffer(shopDetails);
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 30,
          paddingBottom: 10,
        }}
      >
        <Button title='Filtrer' backgroundColor='#FFCD41' onPress={() => props.navigation.navigate('Filtres')}></Button>
        
      </View>
      <MapView
        style={styles.map}

        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* {userLocation ?
           <Marker coordinate={{ latitude : userLocation.latitude, longitude : userLocation.longitude}} pinColor="#fd79a8" /> : null } */}

        {shopsList.length > 0
          ? shopsList.map((element, i) => {
              return (
                <Marker
                  key={i}
                  coordinate={{
                    latitude: element.latitude,
                    longitude: element.longitude,
                  }}
                  pinColor='#4280AB'
                  onPress={() => overlay(element)}
                />
              );
            })
          : null } 
          
          </MapView>
          <Overlay isVisible={visible} >
            <View  style={styles.card}>
                  <View style={styles.text}>
                    <View style={styles.div1}>
                      <Text style={{fontWeight: 'bold'}}>{shopDetails.shopName}</Text>
                      <FontAwesome name="heart-o" size={15} color="black" />
                    </View>
                    <Text style={styles.pad}>{shopDetails.shopAddress}</Text>
                    <View style={styles.picto}>
                      {euros}
                    </View>
                    <View style={styles.picto}>
                      {features}
                    </View>
                    <View style={styles.picto}>
                    {rating}
                    </View>
                  </View>
                  <View style={styles.div2}>
                    <Image source={{uri: url}} style={styles.image}></Image>
                  </View>    
                </View> 
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                  <Button title='Choisir ce salon' color='white' backgroundColor='#4280AB' onPress={()=> navigation(shopDetails)}/>
                  <Button title='Retour' color='white' backgroundColor='#AB4242' onPress={() => setVisible(false)}/>
                </View>
          </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE082',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.85,
  },
  div1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  div2: { width: '40%' },
  card: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 5,
  },
  pad: {padding: 2},
  text: {width: '60%', padding: 10},
  image: {height: 145, width: 140},
  picto: {display: 'flex', flexDirection: 'row'},
  
});

function mapDispatchToProps(dispatch){
  return {
    saveChoosenOffer: function(shopDetails){
      dispatch({
        type: 'selectOffer',
        shopDetails: shopDetails,
      })
    }
  }
}

function mapStateToProps(state) {
  return {shopsData: state.shopsData, search: state.search};
}



export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Map);



