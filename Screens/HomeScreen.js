import React, {useEffect, useState, useRef} from 'react';
import {Text, View, ScrollView} from 'react-native';
import {Button, Input, Card, CheckBox  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';
import { globalStyles } from '../styles/Global';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { SafeAreaView } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function HomeScreen(props) {

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isTimeSelected, setIsTimeSelected] = useState(false);

  const [selectType, setSelectType] = useState('salon')
  const [address, setAddress] = useState(null)
  const [service, setService] = useState('toutes les prestations')

  const ref = useRef();
  const GOOGLE_PLACES_API_KEY = 'AIzaSyDhW13-YcWkEnPgvmEfBPu_IOJ2go6Evws';

  console.log("service", service);
  console.log("type", selectType);
  console.log("date", date);
  console.log("address", address);

  useEffect(() => {
  
  }, []);


  const onChange = async (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    if (mode == 'date') {
      setIsDateSelected(true)
    } else if (mode == 'time') {
      setIsTimeSelected(true)
    }
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
    
  };

  const showTimepicker = () => {
    showMode('time');
  };

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

  var displayDate;
  var displayTime;

  if (isDateSelected) {
    displayDate = date.getDate() + "/" + (date.getMonth() + 1) +"/"+ date.getFullYear();
  } else {
    displayDate = "TOUTES LES DATES"
  }

  if (isTimeSelected) {
    displayTime = "" + date.getHours() +":"+ date.getMinutes();
  } else {
    displayTime = "TOUTES LES HEURES"
  }

  const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
  const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};


  return (


    <SafeAreaView style={{flex:1, backgroundColor: "#FFE082", alignItems:"center"}}>
<ScrollView style={{flex:1, height:"100%"}} contentContainerStyle={{alignItems:"center"}} keyboardShouldPersistTaps='always' listViewDisplayed={false}>
    <Text style={globalStyles.brand}>'Stach</Text>
    
    <View style={{flex:1, flexDirection:"row", backgroundColor: "#FFE082", justifyContent:'space-around', width:'50%', marginTop:10}}>
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
    <View style={{flex:1, flexDirection:"row", alignItems:'center'}}>
    <View>

    <GooglePlacesAutocomplete
      enableHighAccuracyLocation={true}
      minLength={2}
      autoFocus={false}
      fetchDetails={true}
      placeholder='SAISISR UNE ADRESSE'
      onPress={(data, details = null) => {
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
        rightIcon:{ type: 'font-awesome', name: 'map-marker' },
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
    </View>
    </View>

    <Text style={{fontWeight : "bold", fontSize: 20, marginTop:10,}}>{props.pseudo}QUAND ?</Text>
    <TouchableOpacity onPress={showDatepicker}>
    <Input
            inputStyle={{marginLeft: 10}}
            placeholder="N'IMPORTE QUELLE DATE"
            leftIcon={
                <Icon
                name='calendar'
                size={24}
                color="#4E342E"
                onPress={showDatepicker}
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
    
    <TouchableOpacity onPress={showTimepicker}>
    <Input
            inputStyle={{marginLeft: 10}}
            placeholder="N'IMPORTE QUELLE HEURE"
            leftIcon={
                <Icon
                name='clock-o'
                size={24}
                color="#4E342E"
                onPress={showTimepicker}
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

    {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          style={{width: 320, backgroundColor: "white"}}
        />

      )}
    <Text style={{fontWeight : "bold", fontSize: 20, marginTop:10,}}>{props.pseudo}QUOI ?</Text>
    <Picker
        selectedValue={service}
        style={{ height: 50, width: "100%"}}
        onValueChange={(itemValue, itemIndex) => setService(itemValue)}
      > 
        <Picker.Item label="TOUTES LES PRESTATIONS" value="toutes les prestations" />
        <Picker.Item label="COUPE FEMME" value="coupe femme" />
        <Picker.Item label="COUPE HOMME" value="coupe homme" />
        <Picker.Item label="COLORATION" value="coloration" />
      </Picker>
    

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
    snapToInterval={360}
     
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
