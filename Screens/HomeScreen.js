import React, {useEffect, useState, useRef} from 'react';
import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Button, Input, Card, CheckBox, Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SafeAreaView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Location from 'expo-location';
import { Dimensions } from 'react-native';
import {connect} from 'react-redux';
	
import ModalService from '../shared/ModalService';

function HomeScreen(props) {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');

  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isTimeSelected, setIsTimeSelected] = useState(false);

  const [selectType, setSelectType] = useState('salon')
  const [address, setAddress] = useState(null)

  const [position, setPosition] = useState({latitude : null, longitude : null});
  const [visible, setVisible] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [service, setService] = useState(null);
  const [priceFork, setPriceFork] = useState(null);
  const [rating, setRating] = useState(null) 

  const GOOGLE_PLACES_API_KEY = 'AIzaSyDhW13-YcWkEnPgvmEfBPu_IOJ2go6Evws';
  const ref = useRef();
  
  // Adjusting slider to window screen
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // Value to change according to different type of screen display problems
  let snapToIntervalValue = 50;
  windowWidth < 380 ? snapToIntervalValue = 50 : null;



  useEffect(() => {
    ref.current?.setAddressText('');
  }, []);

    //Checking console.log to see what are user's inputs


    //Overlay states to display
    const [dataOverlay, setDataOverlay] = useState({})
    const [isOverlayVisible, setIsOverlayVisible] = useState(false)

    const toggleOverlay = (experience) => {
      setDataOverlay(experience);
      setIsOverlayVisible(!isOverlayVisible);
    };

    //Experience data

    const dataExperience = [
      {image_url: require('../assets/picture1.jpg'), title : "MOMENT A DEUX", description : "Un moment unique en couple, redécouvrez vous tout en découvrant une nouvelle coupe"},
      {image_url: require('../assets/picture2.jpg'), title : "APERO COIF", description : "Pas le temps d'aller chez le coiffeur avant votrer soirée, pas besoin de choisir, commencez une before avec vos amis tout en vous faisant coiffer"},
      {image_url: require('../assets/picture3.jpg'), title : "PLAY HARD CUT HARD", description : "Jouez à vos jeux préférés et devenez le champion du salon de coiffure"},
      {image_url: require('../assets/picture4.jpg'), title : "BIEN ETRE", description : "Si vous êtes un peu stressé à l'idée d'avoir une nouvelle coupe, alors détendez vous et profitez d'un massage"}
    ]

    // Date and Time functions
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const handleConfirm = (choice) => {
      if (mode == 'date') {

        let chosenDate = choice.getDate();
        let chosenMonth = choice.getMonth();
        let chosenYear = choice.getFullYear();

        let newDate = new Date(date.setDate(chosenDate));
        let newDateBis = new Date(newDate.setMonth(chosenMonth));
        let newDateTer = new Date(newDateBis.setFullYear(chosenYear));

        setDate(newDateTer)
        setIsDateSelected(true)
      } else if (mode == 'time') {
        let chosenHour = choice.getHours();
        let chosenMinutes = choice.getMinutes();
        let newDate = new Date (date.setHours(chosenHour+1))
        let newDateBis = new Date (newDate.setMinutes(chosenMinutes))
        setDate(newDateBis)
        setIsTimeSelected(true)
      }
      hideDatePicker();
    };

    var displayDate;
    var displayTime;

    if (isDateSelected) {
      var zeroDay = "";
      var zeroMonth = "";
      date.getDate() <10 ? zeroDay="0" : null;
      date.getMonth() <10 ? zeroMonth="0" : null; 
      displayDate = zeroDay + date.getDate() + "/" + zeroMonth + (date.getMonth() + 1) +"/"+ date.getFullYear();
    } else {
      displayDate = "TOUTES LES DATES"
    }

    if (isTimeSelected) {
      var zeroHour = "";
      var zeroMinute = "";
      date.getHours() <10 ? zeroHour="0" : null;
      date.getMinutes() <10 ? zeroMinute="0" : null;
      displayTime = "" + zeroHour + date.getHours()-1 +":"+ zeroMinute + date.getMinutes();
    } else {
      displayTime = "TOUTES LES HEURES"
    }

    // Location function
    async function locateMe(){
      { var { status } = await Location.requestPermissionsAsync();
        
        if (status === 'granted'){
         setVisible(true)
         let points = await Location.getCurrentPositionAsync()
         setPosition({latitude : points.coords.latitude, longitude : points.coords.longitude})
          ;}
          setAddress('Votre position')
          ref.current?.setAddressText('Votre position');
          setVisible(false)
    }
    }

    // Validation button -> sending info to reducer

    function validationButton(){
      setDataOverlay({});

      if (ref.current.getAddressText() != "" && ref.current.getAddressText() != address) {
        setErrorMessage("Veuillez resaisir votre addresse")
      } else {
      
      let completeDateToReducer = null;

      isDateSelected ? completeDateToReducer = date : null;

      let dateToReducer = null;
      var zeroDay = "";
      var zeroMonth = "";
      date.getDate() <10 ? zeroDay="0" : null;
      date.getMonth() <10 ? zeroMonth="0" : null; 
      isDateSelected ? dateToReducer = zeroDay + date.getDate() + "-" + zeroMonth + (date.getMonth() + 1) +"-"+ date.getFullYear() : null;

      let timeToReducer = null;
      var zeroHour = "";
      var zeroMinute = "";
      date.getHours() <11 ? zeroHour="0" : null;
      date.getMinutes() <10 ? zeroMinute="0" : null;
      isTimeSelected ? timeToReducer = "" + zeroHour + (date.getHours()-1) +":"+ zeroMinute + date.getMinutes() : null;

      let serviceToReducer = null;
      if (props.selectedService != "TOUTES LES PRESTATIONS"){
        serviceToReducer = props.selectedService 
      }

      let experienceToReducer = null;
      if (dataOverlay.title != undefined) {
        experienceToReducer = dataOverlay.title
        serviceToReducer = null;
      }    

      props.onSubmitSearch(selectType, completeDateToReducer, dateToReducer, timeToReducer, address, position.latitude, position.longitude, serviceToReducer, experienceToReducer, service, priceFork, rating);
      
      props.navigation.navigate('ButtonTabShop');
      if (isOverlayVisible) {
        setIsOverlayVisible(!isOverlayVisible)
      }
      }
    }


  return (
  <SafeAreaView style={{flex:1, backgroundColor: "#FFE082", alignItems:"center"}}>
  <ScrollView style={{flex:1, height:"100%"}} contentContainerStyle={{alignItems:"center"}} keyboardShouldPersistTaps='always' >
    
    <Text style={{marginTop:0}}></Text>
    
    <View style={{flex:1, flexDirection:"row", backgroundColor: "#FFE082", justifyContent:'space-around', width:'70%'}}>
    
    </View>

    <View style={{flex:6, backgroundColor: "white", width:'90%', padding:15, borderRadius:20}}>
    <Text style={{fontWeight : "bold", fontSize: 20, marginTop:10,}}>OU ?</Text>
    <View style={{flex:1, flexDirection:"row", alignItems:'center', alignContent:'center'}}>
    <GooglePlacesAutocomplete
      ref={ref}
      enableHighAccuracyLocation={true}
      minLength={2}
      autoFocus={false}
      fetchDetails={true}
      placeholder="SAISIR UNE ADRESSE"
      onPress={async (data, details = null) => {
        setErrorMessage("")
        let newPosition = await Location.geocodeAsync(details.formatted_address)
        
        setPosition({latitude : newPosition[0].latitude, longitude : newPosition[0].longitude})
        setAddress((details.address_components[0].long_name + " " + details.address_components[1].long_name + ", " + details.address_components[2].long_name + ", " + details.address_components[5].long_name))   
      }}
      
      onFail={(error) => console.error(error)}
      
      query={{
        key: GOOGLE_PLACES_API_KEY,
        types: 'address',
        language: 'fr',
        components: 'country:fr',
      }}
      getDefaultValue={() => {
        return ''; // text input default value
      }}
      textInputProps={{
        InputComp: Input,
        leftIcon: { type: 'font-awesome', name: 'search' },
        errorStyle: { color: 'red' },

      }}
      requestUrl={{
        url:
          'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
        useOnPlatform: 'web',
      }}
      keyboardShouldPersistTaps ='handled'
      listViewDisplayed="auto"
      styles={{textInput:{backgroundColor: 'transparent', fontSize: 19,}}}
      autoFillOnNotFound={true}
      // GooglePlacesDetailsQuery={{ fields: 'formatted_address' }}
      debounce={300}
    />
    <View style={{marginBottom:30}}>
    <Icon name='map-marker' size={36} color="#4E342E" onPress={locateMe}/>
    </View>
    
    <Overlay isVisible={visible} backdropStyle={{backgroundColor:'transparent', borderColor:"transparent"}} >
      <View style={{flex:0.1, alignItems:'center'}}>
    <Text style={{marginBottom:12}}>Localisation en cours...</Text>
    <Icon name='globe' size={36} color="#4E342E"/>
    </View>
    </Overlay>

    </View>
    <Text style={{color:"red"}}>{errorMessage}</Text>
    <Text style={{fontWeight : "bold", fontSize: 20}}>{props.pseudo}QUAND ?</Text>
    <TouchableOpacity onPress={async()=>{await setMode('date'); showDatePicker()}}>
    <Input
            inputStyle={{marginLeft: 10}}
            placeholder="N'IMPORTE QUELLE DATE"
            leftIcon={
                <Icon
                name='calendar'
                size={24}
                color="#4E342E"
                onPress={async()=>{await setMode('date'); showDatePicker()}}
                />
            }
            value={displayDate}
            editable={false}
    />
    </TouchableOpacity>
    
    <CheckBox
      containerStyle={{backgroundColor: "white", borderWidth: 0}}
      title='Toutes les dates'
      checkedIcon='dot-circle-o'
      uncheckedIcon='circle-o'
      checked={!isDateSelected}
      onPress={() => setIsDateSelected(!isDateSelected)}
    />
    
    <TouchableOpacity onPress={async()=>{await setMode('time'); showDatePicker()}}>
    <Input
            inputStyle={{marginLeft: 10}}
            placeholder="N'IMPORTE QUELLE HEURE"
            leftIcon={
                <Icon
                name='clock-o'
                size={24}
                color="#4E342E"
                onPress={async()=>{await setMode('time'); showDatePicker()}}
                />
            }
            value={displayTime}
            editable={false}
    />
    </TouchableOpacity>
    <CheckBox
      containerStyle={{backgroundColor: "white", borderWidth: 0}}
      title='Toutes les heures'
      checkedIcon='dot-circle-o'
      uncheckedIcon='circle-o'
      checked={!isTimeSelected}
      onPress={() => setIsTimeSelected(!isTimeSelected)}
    />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
      />

    <Text style={{fontWeight : "bold", fontSize: 20, marginTop:10,}}>QUOI ?
    </Text>
    
    <ModalService/>

    <Button

    title="VALIDER"
    type="solid"
    onPress={() => validationButton()}
    buttonStyle = {{backgroundColor : "#4280AB"}}
    />
    
    
    </View>
    
    <View style={{flex:1, backgroundColor: "#FFE082"}}>
    <Text style={{fontWeight : "bold", fontSize: 20, marginLeft:35, marginTop:25, marginBottom:10}}>EXPERIENCES</Text>
    <ScrollView
    horizontal={true}
    contentContainerStyle={{ width: `${100*4}%`}}
    showsHorizontalScrollIndicator={false}
    scrollEventThrottle={200}
    decelerationRate="fast"
    pagingEnabled
    snapToInterval={windowWidth - snapToIntervalValue}
    >
{dataExperience.map((experience,i)=>
    (<Card key={i} containerStyle={{ padding : 0, width : "20%", marginBottom:20, backgroundColor : "#4280AB", borderRadius:20, borderColor:"transparent"}} >
      <Card.Image style={{width : "100%", borderTopLeftRadius:20, borderTopRightRadius:20}} source={experience.image_url} onPress={() => toggleOverlay(experience)}/>
      <Card.Divider/>
      <Text onPress={() => toggleOverlay(experience)} style={{marginBottom: 10, textAlign:"center", color:'white', fontWeight:'bold'}}>{experience.title}</Text>
    </Card>)
)} 
      <Overlay isVisible={isOverlayVisible} onBackdropPress={toggleOverlay} overlayStyle={{padding:0, margin:0, height:"60%", borderRadius:25, borderColor:"transparent"}} backdropStyle={{backgroundColor:'transparent', borderColor:"transparent"}}>
      <Card containerStyle={{ padding : 0, margin:0, width : "90%", height:"100%", backgroundColor: 'white', borderRadius: 25, borderColor:"transparent"}}>
      <Card.Image style={{width : "100%", borderTopLeftRadius:25, borderTopRightRadius:25}} source={dataOverlay.image_url}/>
      <Card.Divider/>
      <Card.Title style={{marginBottom: 20, marginTop:10, textAlign:"center", fontWeight:'bold', fontSize:24}}>{dataOverlay.title}</Card.Title>
      <Text style={{textAlign:"center", fontWeight:'bold', padding:40}}>{dataOverlay.description}</Text>
      <Button

      title="VIVRE CETTE EXPERIENCE"
      type="solid"
      onPress={() => validationButton()}
      buttonStyle = {{backgroundColor : "#4280AB", width:"70%", alignSelf:'center'}}
      />

      </Card>
      </Overlay>
    </ScrollView>
    </View>
  </ScrollView>
  
  </SafeAreaView>    
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onSubmitSearch: function(salonOrHome, completeDate, date, hour, address, latitude, longitude, offer, experience, service, priceFork, rating) { 
      dispatch({type: 'createSearch', salonOrHome : salonOrHome, completeDate : completeDate, date : date, hour : hour, address : address, latitude : latitude, longitude : longitude, offer : offer, experience : experience, service : service, priceFork : priceFork, rating: rating}) 
    },

  }
}

function mapStateToProps(state) {
  return {search: state.search, selectedService: state.selectedService};
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(HomeScreen);