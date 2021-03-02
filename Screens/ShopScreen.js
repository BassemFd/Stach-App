import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { globalStyles }from '../styles/Global';
import { Card, ListItem} from 'react-native-elements';
import { FontAwesome} from '@expo/vector-icons';

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import PrimaryButton from '../shared/Button';
import ModalCoiffeur from '../shared/modal';
import ModalOption from '../shared/modalOption';
import ModalPrestation from '../shared/modalPrestation';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from '../shared/cardCarousel';
import {connect} from 'react-redux';


// import PickerCascader  from 'react-native-picker-cascader';



function Shop(props) {

  const isCarousel = useRef(null)
  const [index, setIndex] = useState(0)
  // const [selectedPrestation, setSelectedPrestation] = useState("choixPrestation");
  // const [selectedOptions, setSelectedOptions] = useState("choixOptions");
  console.log(props.shopDetails)

  var data = [];
  for (let i= 0; i<props.shopDetails.shopImages.length; i++) {
    data.push({imgUrl: {uri: props.shopDetails.shopImages[i]}})
  }
  


 const hairdresser = {
  name: props.shopDetails.shopName,
  data: data,
  description: props.shopDetails.shopDescription,
  address: props.shopDetails.shopAddress,
  priceFork: props.shopDetails.priceFork,
  starRating: props.shopDetails.rating,
  shopFeatures: props.shopDetails.shopFeatures,

  }

  
  
           
  // const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [visible, setVisible] = useState(false);
  
 

  // useEffect(() => {
  //   (async () => {
     
  //     let locationGeo = await Location.geocodeAsync(hairdresser.address);
  //   setLocation(locationGeo)
    
  
  //     // console.log("LOCATION", locationGeo)
  //   })();
  // }, []);
//  console.log("LCOATINO SETTER", location)

  // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  function handleReturnButton(){
    console.log("return");
    props.navigation.goBack()
  }

 function handleChoixDuCoiffeur(){
  console.log("handled")

  props.navigation.navigate('ButtonTabSign')
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


  const toggleOverlay = () => {
    setVisible(!visible);
  };

const handleAvis = () => {
  console.log("avis")
}

const listComment = [
  {pseudo: "Juliette", message: "J'adore ce salon"},
  {pseudo: "Yaya", message: "J'adore ce salon"},
  {pseudo: "Raph", message: "J'adore ce salon"},
  {pseudo: "Bassem", message: "J'adore ce salon"},

]

var listCommentItem = listComment.map((l, i) => {return (
  <ListItem  key={i} bottomDivider>
    <ListItem.Content >
      <ListItem.Title>{l.pseudo}</ListItem.Title>
      <ListItem.Subtitle>{l.message}</ListItem.Subtitle>
    </ListItem.Content>
  </ListItem>
)})

  return (
    
    <View style={styles.card}>
      <Text style={[globalStyles.brand, {marginTop: 10}]}>'Stach</Text>
      <ScrollView>
      
      <View >
        <Card  >
        <View style={{ alignItems: "center"}}>
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
      </View>
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
        <Text style={{fontSize: 24, fontFamily: "graduate-regular", textAlign: 'center', marginBottom: 10}}>{hairdresser.name}</Text>

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
            <View style={styles.avis}>
           
          
            <TouchableOpacity style={styles.avis}  onPress={()=>handleAvis()}><Text style={styles.avisText}>Voir tout les Avis</Text></TouchableOpacity>
            </View>

            

          </View>

            <View style={styles.mapPosition}>
            {/* {location ? */}
            <MapView mapType={'standard'} showsTraffic ={false} style={styles.map}
              initialRegion={{
                latitude: props.shopDetails.latitude,
                longitude: props.shopDetails.longitude,
                latitudeDelta: 0.005757,
                longitudeDelta: 0.007866,
              }}
            >
               
             <Marker
                coordinate={{latitude: props.shopDetails.latitude, longitude: props.shopDetails.longitude}}
              />
           
            </MapView>
             {/* : null } */}
            </View>
            
        </View>

        <Card.Divider></Card.Divider>
        
      <View style={{flex: 1, flexDirection: "row"}}>
       <ModalCoiffeur></ModalCoiffeur>
       <ModalPrestation></ModalPrestation>
       <ModalOption></ModalOption>
     

       </View>
      
      </Card>
    

    </View>
    <View style={{flexDirection:"row", justifyContent:"space-evenly", margin: 20}}>
      <PrimaryButton title="Choisir Ce Salon" backgroundColor="#4280AB" color="white" onPress={() => handleChoixDuCoiffeur()}/>  
      <PrimaryButton title="retour" backgroundColor="#AB4242" color="white" onPress={() => handleReturnButton()}/>
      </View>
    
      <View style={{flex: 1, alignItems: "center", backgroundColor: "#FFCD41"}}>
        <Text style={{fontSize: 24, fontFamily: "graduate-regular"}}>Tout les avis du Salon</Text>
        
      </View>
      {listCommentItem}



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
   
  },
  avis: {
   
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "#FFCD41",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 1,
    width: 120
  },
  avisText: {
    fontWeight: "bold"
  }
});




function mapStateToProps(state) {
  return {shopDetails: state.shopDetails }
 }
  
 export default connect(
  mapStateToProps,
  null
 )(Shop);