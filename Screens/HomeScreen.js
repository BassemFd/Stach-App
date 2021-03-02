import React, {useEffect, useState, useRef} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Button, Input, Card, CheckBox, Overlay} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalStyles } from '../styles/Global';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Location from 'expo-location';
import { Dimensions } from 'react-native';
	
import ModalService from '../shared/ModalService';

export default function HomeScreen(props) {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');

  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isTimeSelected, setIsTimeSelected] = useState(false);

  const [selectType, setSelectType] = useState('salon')
  const [address, setAddress] = useState(null)
  const [service, setService] = useState('toutes les prestations')

  const [position, setPosition] = useState({latitude : null, longitude : null});
  const [visible, setVisible] = useState(false);
  
  // Adjusting slider to window screen
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // Value to change according to different type of screen display problems
  let snapToIntervalValue = 50;
  windowWidth < 380 ? snapToIntervalValue = 50 : null;

  // console.log(windowHeight, windowWidth)

  const ref = useRef();

  useEffect(() => {
    ref.current?.setAddressText('');
  }, []);

  const GOOGLE_PLACES_API_KEY = 'AIzaSyDhW13-YcWkEnPgvmEfBPu_IOJ2go6Evws';

    //Checking console.log to see what are user's inputs
    console.log("service", service);
    console.log("type", selectType);
    console.log("date", date);
    console.log("address", address);
    console.log("position",position)
    console.log("inputAddress", ref.current.getAddressText())

    //Handling colors of top buttons
    var colorButtonSalon;
    var colorButtonDomicile;
  
    if (selectType == 'salon') {
      colorButtonSalon = {
        backgroundColor : "#FFCD41"
      }
    }  else {
      colorButtonSalon = {
        backgroundColor : "#FFECB2"
      }
    }
  
    if (selectType == 'chez toi') {
      colorButtonDomicile = {
        backgroundColor : "#FFCD41"
      }
    }  else {
      colorButtonDomicile = {
        backgroundColor : "#FFECB2"
      }
    }

    // Date and Time functions
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const handleConfirm = (choice) => {
      if (mode == 'date') {
        setDate(choice)
        setIsDateSelected(true)
      } else if (mode == 'time') {
        setDate(choice)
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
      displayTime = "" + zeroHour + date.getHours() +":"+ zeroMinute + date.getMinutes();
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

  return (
  <SafeAreaView style={{flex:1, backgroundColor: "#FFE082", alignItems:"center"}}>
  <ScrollView style={{flex:1, height:"100%"}} contentContainerStyle={{alignItems:"center"}} keyboardShouldPersistTaps='always' listViewDisplayed={false}>
    
    <Text style={[globalStyles.brand, {marginTop:50}]}>'Stach</Text>
    
    <View style={{flex:1, flexDirection:"row", backgroundColor: "#FFE082", justifyContent:'space-around', width:'70%', marginTop:10}}>
    <Button
            containerStyle={{width : "45%"}}
            title="SALON"
            type="solid"
            onPress={() => setSelectType('salon')}
            buttonStyle = {colorButtonSalon}
    />
    <Button
            containerStyle={{width : "45%"}}
            title="CHEZ TOI"
            type="solid"
            onPress={() => setSelectType('chez toi')}
            buttonStyle = {colorButtonDomicile}
    />
    </View>

    <View style={{flex:6, backgroundColor: "#FFE082", width:'90%', marginTop:10}}>
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
        let newPosition = await Location.geocodeAsync(details.formatted_address)
        
        setPosition({latitude : newPosition[0].latitude, longitude : newPosition[0].longitude})
        setAddress(details.formatted_address)   
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
      listViewDisplayed="false"
      styles={{textInput:{backgroundColor: 'transparent', fontSize: 19,}}}
      autoFillOnNotFound={true}
      GooglePlacesDetailsQuery={{ fields: 'formatted_address' }}
      debounce={300}
    />
    <View style={{marginBottom:30}}>
    <Icon name='map-marker' size={36} color="#4E342E" onPress={locateMe}/>
    </View>
    <Overlay isVisible={visible} >
      <View style={{flex:0.1, alignItems:'center'}}>
    <Text>Localisation en cours...</Text>
    <Icon name='globe' size={36} color="#4E342E"/>
    </View>
    </Overlay>

    </View>

    <Text style={{fontWeight : "bold", fontSize: 20, marginTop:10,}}>{props.pseudo}QUAND ?</Text>
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
      containerStyle={{backgroundColor: "#FFE082", borderWidth: 0}}
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
      containerStyle={{backgroundColor: "#FFE082", borderWidth: 0}}
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
      />

    <Text style={{fontWeight : "bold", fontSize: 20, marginTop:10,}}>{props.pseudo}QUOI ?
    </Text>
    
    <ModalService/>

    <Button

    title="VALIDER"
    type="solid"
    onPress={() => validationButton()}
    buttonStyle = {{backgroundColor : "#4280AB"}}
    />

    <Text style={{fontWeight : "bold", fontSize: 20, marginTop:10,}}>EXPERIENCES</Text>
    </View>

    <View style={{flex:1, alignItems:'center', backgroundColor: "#FFE082"}}>
    <ScrollView
    horizontal={true}
    contentContainerStyle={{ width: `${100*4}%`}}
    showsHorizontalScrollIndicator={false}
    scrollEventThrottle={200}
    decelerationRate="fast"
    pagingEnabled
    snapToInterval={windowWidth - snapToIntervalValue}
    >
    
    <Card containerStyle={{ padding : 0, width : "20%", marginBottom:20, backgroundColor : "#FFECB2"}}>
      <Card.Image style={{width : "100%"}} source={require('../assets/picture1.jpg')}/>
      <Card.Divider/>
      <Text style={{marginBottom: 10, textAlign:"center"}}>MOMENT A DEUX</Text>
    </Card>

    <Card containerStyle={{ padding : 0, width : "20%", marginBottom:20, backgroundColor : "#FFECB2"}}>
      <Card.Image style={{width : "100%"}} source={require('../assets/picture2.jpg')}/>
      <Card.Divider/>
      <Text style={{marginBottom: 10, textAlign:"center"}}>APERO COIF</Text>
    </Card>

    <Card containerStyle={{ padding : 0,width : "20%", marginBottom:20, backgroundColor : "#FFECB2"}}>
      <Card.Image style={{width : "100%"}} source={require('../assets/picture3.jpg')}/>
      <Card.Divider/>
      <Text style={{marginBottom: 10, textAlign:"center"}}>PLAY HARD CUT HARD</Text>
    </Card>

    <Card containerStyle={{ padding : 0, width : "20%", marginBottom:20, backgroundColor : "#FFECB2"}}>
      <Card.Image style={{width : "100%"}} source={require('../assets/picture4.jpg')}/>
      <Card.Divider/>
      <Text style={{marginBottom: 10, textAlign:"center"}}>BIEN ETRE</Text>
    </Card>
    
    </ScrollView>
    </View>
  </ScrollView>
  </SafeAreaView>    
  );
}
