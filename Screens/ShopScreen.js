import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { globalStyles }from '../styles/Global';
import { Card, Icon, TextInput } from 'react-native-elements';
import { FontAwesome} from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import PrimaryButton from '../shared/Button';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from '../shared/cardCarousel';



function Shop() {
  const isCarousel = useRef(null)
  const [index, setIndex] = useState(0)
  const [selectedCoiffeur, setSelectedCoiffeur] = useState("choixCoiffeur");
  const [selectedPrestation, setSelectedPrestation] = useState("choixPrestation");
  const [selectedOptions, setSelectedOptions] = useState("choixOptions");


 const hairdresser = {
  name: "La coupe à Juliette",
  data: [
    {
    imgUrl: require("../assets/HairShop-1.jpg")
}, 
{
  imgUrl: require("../assets/HairShop-2.jpg")
},
{
  imgUrl: require("../assets/HairShop-3.jpg")
}
  ],
  description: "Description and history and more details about the hairdresser Description and history and more details about the hairdresser Description and history and more details about the hairdresser Description and history and more details about the hairdresser",
  address: "67 rue dulong, 75017, Paris",
  priceFork: 2,
  starRating: 3.7,
  shopFeatures: ['coffee', 'leaf', 'paw', 'wheelchair-alt','gamepad', 'glass'],

  }

  
  // const data = [
  //   {
  //     imgUrl: "https://picsum.photos/id/11/200/300"
  //   },
  //   {
  //     imgUrl: "https://picsum.photos/id/10/200/300"
  //   },
  //   {
      
  //     imgUrl: "https://picsum.photos/id/12/200/300"
  //   }
  // ]
           
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  
 

  useEffect(() => {
    (async () => {
      // let { status } = await Location.requestPermissionsAsync();
      // if (status !== 'granted') {
      //   setErrorMsg('Permission to access location was denied');
      //   return;
      // }

      let locationGeo = await Location.geocodeAsync(hairdresser.address);
    setLocation(locationGeo)
    
  
      console.log("LOCATION", locationGeo)
    })();
  }, []);
 console.log("LCOATINO SETTER", location)

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  function handleReturnButton(){
    console.log("return")
  }

 function handleChoixDuCoiffeur(){
  console.log("handled")
  }

  var priceTab = [];
   
  for (let y=0; y<3; y++) {
    var euroColor = 'grey'
    if (y<hairdresser.priceFork) {
      euroColor='black'
    }
    priceTab.push(
    <FontAwesome key={y} style={{marginRight: 5}} name="euro" size={24} color={euroColor} />)
  }

  var starTab = [];

  var flooredStarRating = Math.round(hairdresser.starRating)
  for (let i = 0; i<5; i++){
   var starColor = "black"
   if(i < flooredStarRating){
     starColor = "gold"
   }
   starTab.push( <FontAwesome style={{marginRight: 5}} key={i} name="star" size={24} color={starColor} />)
  }

  var pictoTab = [];
  for (let z=0; z<hairdresser.shopFeatures.length; z++) {
    pictoTab.push(<FontAwesome key={z} name={hairdresser.shopFeatures[z]} size={24} color="black" style={{marginRight: 5}}/>)
  }






  return (
    <View style={styles.card}>
      <ScrollView>
      
      <View >
        <Card >

        <Carousel
        layout="stack"
        layoutCardOffset={9}
        ref={isCarousel}
        data={hairdresser.data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
              <Pagination
                dotsLength={hairdresser.data.length}
                activeDotIndex={index}
                carouselRef={isCarousel}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.92)'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
            />
        <Card.Title style={globalStyles.titleText}>{hairdresser.name}</Card.Title>

        <Text style={{marginBottom: 10}}>
          {hairdresser.description}
        </Text>

        <Card.Divider/>

        <View style={styles.containerMap}>
          <View>

            <Text style={{marginBottom: 10}}>
            {hairdresser.address}
            </Text>

          
            <View style={styles.icons}>
            {priceTab}
            </View>
                  
            <View style={styles.icons2}>
              {pictoTab}
            </View>

            <View style={styles.icons2}>
            {starTab}
          
            <Text>({hairdresser.starRating})</Text>
            </View>

            

          </View>

            <View style={styles.mapPosition}>
            {location ?
            <MapView mapType={'standard'} showsTraffic ={false} style={styles.map}
              initialRegion={{
                latitude: location[0].latitude,
                longitude: location[0].longitude,
                latitudeDelta: 0.005757,
                longitudeDelta: 0.007866,
              }}
            >
               
             <Marker
                coordinate={{latitude: location[0].latitude, longitude: location[0].longitude}}
              />
           
            </MapView>
             : null }
            </View>
            
        </View>

        <Card.Divider></Card.Divider>
       
        <Picker
        selectedValue={selectedCoiffeur}
        style={{ height: 30, width: 300 }}
        onValueChange={(itemValue, itemIndex) => setSelectedCoiffeur(itemValue)}
      >
        <Picker.Item label="Choix du coiffeur" value="choixCoiffeur" />
        <Picker.Item label="Charlotte" value="charlotte" />
        <Picker.Item label="Yaya" value="yaya" />
        <Picker.Item label="Raph" value="raph" />

      </Picker>
        
      <Card.Divider></Card.Divider>
      <Picker
        selectedValue={selectedPrestation}
        style={{ height: 30, width: 300 }}
        onValueChange={(itemValue, itemIndex) => setSelectedPrestation(itemValue)}
      >
        <Picker.Item label="Choix de la Prestation" value="choixPrestation" />
        <Picker.Item label="Brushin" value="brush" />
        <Picker.Item label="Coloration" value="color" />
        <Picker.Item label="Lissage" value="liss" />

      </Picker>
        
      <Card.Divider></Card.Divider>
      <Picker
        selectedValue={selectedOptions}
        style={{ height: 30, width: 300 }}
        onValueChange={(itemValue, itemIndex) => setSelectedOptions(itemValue)}
      >
        <Picker.Item label="Autres Options" value="choixOptions" />
        <Picker.Item label="PlayStation" value="ps" />
        <Picker.Item label="Coffee" value="coffee" />
        <Picker.Item label="Cocktail" value="cocktail" />

      </Picker>
        
      <Card.Divider></Card.Divider>
      
      </Card>
    

    </View>
    <View style={{flexDirection:"row", justifyContent:"space-evenly", margin: 20}}>
      <PrimaryButton title="Choisir ce Coiffeur" backgroundColor="#4280AB" color="white" onPress={() => handleChoixDuCoiffeur()}/>  
      <PrimaryButton title="retour" backgroundColor="#AB4242" color="white" onPress={() =>handleReturnButton()}/>

      </View>
    
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  icons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
   
  },
  icons2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    
  },
  containerMap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  mapPosition: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: "90%",
  },
  card: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#FFE082',
  }
});


export default Shop;