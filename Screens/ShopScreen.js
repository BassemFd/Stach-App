import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Button} from 'react-native';
import { globalStyles } from '../styles/Global';
import { Card, ListItem} from 'react-native-elements';
import { FontAwesome} from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MapView, { Marker } from 'react-native-maps';
import PrimaryButton from '../shared/Button';
import ModalCoiffeur from '../shared/modal';
import ModalOption from '../shared/modalOption';
import ModalPrestation from '../shared/modalPrestation';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from '../shared/cardCarousel';
import {connect} from 'react-redux';
import { color } from 'react-native-reanimated';



function Shop(props) {

  const isCarousel = useRef(null)
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false);
  const [chosenHour, setChosenHour] = useState()
  const [favorite, setFavorite] = useState(false)
  
  var handleFavorite = () => {
    setFavorite(!favorite);
  }
  var color;
  if(favorite === true ){
    color = "#e74c3c"
  } else {
    color = "black"
  }

  const toggleOverlay = () => {
    setVisible(!visible);
  };
 

//* Handling data for Carousel, using reducer
  var data = [];
  for (let i= 0; i<props.shopDetails.shopImages.length; i++) {
    data.push({imgUrl: {uri: props.shopDetails.shopImages[i]}})
  }
  

// * setting up all info to display on shop screen, using reducer
 const hairdresser = {
  name: props.shopDetails.shopName,
  data: data,
  description: props.shopDetails.shopDescription,
  address: props.shopDetails.shopAddress,
  priceFork: props.shopDetails.priceFork,
  starRating: props.shopDetails.rating,
  shopFeatures: props.shopDetails.shopFeatures,
  }


  // * handling return button
  function handleReturnButton(){
    props.navigation.goBack()
  }


  //* handling validation button, 
  //!! see what to send to SignIn/SignOut or Reducer
 function handleChoixDuSalon(){
   console.log(chosenHour)
   
  props.chosenAppointment(chosenHour, props.hairdresser, props.prestation, props.experience, props.chosenDate, props.shopDetails)
  props.navigation.navigate('ButtonTabSign')
  }


  // * mapping on euro logo to showcase price range of saloon
    var priceTab = [];
    for (let y=0; y<3; y++) {
      var euroColor = 'grey'
      if (y<hairdresser.priceFork) {
        euroColor='black'
      }
      priceTab.push(
      <FontAwesome key={y} style={{marginRight: 5}} name="euro" size={24} color={euroColor} />)
    }


//* mapping on black/golden star to set rating with average rating, rounded, so star rating is closest to reality
    var starTab = [];
    var flooredStarRating = Math.round(hairdresser.starRating)
    for (let i = 0; i<5; i++){
    var starColor = "black"
    if(i < flooredStarRating){
      starColor = "gold"
    }
    starTab.push( <FontAwesome style={{marginRight: 5}} key={i} name="star" size={24} color={starColor} />)
    }


//* mapping to showcase different utilities/extras/ using logos, accept animals, handi access etc...
    var pictoTab = [];
    for (let z=0; z<hairdresser.shopFeatures.length; z++) {
      pictoTab.push(<FontAwesome key={z} name={hairdresser.shopFeatures[z]} size={24} color="black" style={{marginRight: 5}}/>)
    }


  
//! should navigate to lower screen to check comments
const handleAvis = () => {
  // console.log("avis")
// ScrollView.scrollToEnd({animated: true})
// ScrollView.ScrollTo({x: 0, y: 0, animated: true})
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


const hours =  [{mon: {open: 570, close: 1080 }}]
  // console.log(hours[0].mon.close)

const convertMinsToTime = (mins) => {
  
  let hours = Math.floor(mins / 60);
  let minutes = mins % 60;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutes}`;
}
// console.log("CONVERTER", convertMinsToTime(1000))



let hoursTab;
let hoursArr = [];
  for(let i = 570; i <= 1080; i+=30){
    hoursArr.push(i)
    hoursTab = hoursArr.map((hour, i)=>{
      var color = '#FFCD41'
        if(chosenHour === hour){
          color = '#4280AB'
        } 

      return <TouchableOpacity disabled={false} onPress={()=> {setChosenHour(hour)}} value={hour} key={i} style={{padding: 10, margin: 5, backgroundColor: `${color}`, borderRadius: 8, width: 70, alignItems: 'center'}} ><Text style={{fontWeight: 'bold', fontSize: 18}}>{convertMinsToTime(hour)}</Text></TouchableOpacity>
   
  })
    
  }

  // console.log("Hairdresser from shop screen:", props.hairdresser)
  // console.log("Prestation from Shop Screen:", props.prestation)
  // console.log("Experience from Shop Screen:", props.experience)

  //*DATETIME PICKER ****************************************

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isDateSelected, setIsDateSelected] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
var datePhrase;
// if(datePhrase === undefined){
//   datePhrase= "Choisir une date"
// }
  const handleConfirm = (choice) => {
    console.log("A date has been picked: ", choice);
    setDate(choice)
    setIsDateSelected(true)
    let dateToReducer = null;
     
    isDateSelected ? dateToReducer = zeroDay + date.getDate() + "-" + zeroMonth + (date.getMonth() + 1) +"-"+ date.getFullYear() : null;

    console.log("final date?:", dateToReducer)
    

    datePhrase = dateToReducer
    hideDatePicker();
  };
  if (isDateSelected) {
    var zeroDay = "";
    var zeroMonth = "";
    date.getDate() <10 ? zeroDay="0" : null;
    date.getMonth() <10 ? zeroMonth="0" : null; 
    datePhrase = zeroDay + date.getDate() + "/" + zeroMonth + (date.getMonth() + 1) +"/"+ date.getFullYear();
  } else {
    datePhrase = "TOUTES LES DATES"
  }




//**************************************** */
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
            <Card.Divider/>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>       
              <Text style={{fontSize: 24, fontFamily: "graduate-regular", textAlign: 'center'}}>{hairdresser.name}</Text>
              <FontAwesome onPress={()=> handleFavorite()}  name="heart" size={24} color={color} />
            </View>

        <Text style={{marginBottom: 10}}>
          {hairdresser.description}
        </Text>

        <Card.Divider/>

        <View style={styles.containerMap}>
          <View style={{width: 180}}>

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
            <View style={[styles.avis, {marginTop: 10}]}>
           
          
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

        <Card>
        <View style={{alignItems: "center", marginTop: 10}}>
              {(props.chosenDate !== undefined) ?
              (<Text style={{fontSize: 20, fontFamily: "graduate-regular", marginBottom: 10}}>Pour le {props.chosenDate},</Text>)
                  : 
                (  <View style={{width: 270}}>
                <PrimaryButton  backgroundColor="#4280AB" color="white" title={datePhrase} onPress={showDatePicker} />
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    minimumDate={new Date()}
                  />
                  </View>)
                  }
            <Text style={{fontSize: 20, fontFamily: "graduate-regular", marginBottom: 10, marginTop: 10}}>Choisis l'heure du RDV :</Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', margin: 12}}>
            {hoursTab}
            </View>
          </View>
        </Card>

     </View>

    <View style={{flexDirection:"row", justifyContent:"space-evenly", margin: 30}}>
      <PrimaryButton title="Choisir Ce Salon" backgroundColor="#4280AB" color="white" onPress={() => handleChoixDuSalon()}/>  
      <PrimaryButton title="retour" backgroundColor="#AB4242" color="white" onPress={() => handleReturnButton()}/>
      </View>
    
      <View style={{flex: 1, alignItems: "center", backgroundColor: "#FFCD41", marginTop: 10}}>
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


function mapDispatchToProps(dispatch){
    return {
      chosenAppointment: function(hour, hairdresser, prestation, experience, date, shopDetails){
              dispatch({
                type: 'finalAppointment',
                hour: hour, 
                hairdresser: hairdresser, 
                prestation: prestation, 
                experience: experience,
                date: date,
                shopDetails: shopDetails
              })
                  }
                }
              }



function mapStateToProps(state) {
  return {shopDetails: state.shopDetails, hairdresser: state.hairdresser, prestation: state.prestation, experience: state.experience, chosenDate: state.search.date }
 }
  
 export default connect(
  mapStateToProps,
  mapDispatchToProps
 )(Shop);

