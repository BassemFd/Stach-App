import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import { globalStyles } from '../styles/Global';
import { Card, ListItem, Overlay } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MapView, { Marker } from 'react-native-maps';
import PrimaryButton from '../shared/Button';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, {
  SLIDER_WIDTH,
  ITEM_WIDTH,
} from '../shared/cardCarousel';
import { connect } from 'react-redux';
import {IP_ADDRESS} from '../urlBackend';
import { useIsFocused } from '@react-navigation/native';

function Shop(props) {
  
const isFocused = useIsFocused();
const [favorite, setFavorite] = useState(false);

  useEffect( () => {
    
    async function getResponse(){
      
      if(props.token){
          let shopsFetch = await fetch(`${IP_ADDRESS}/favorites?token=${props.token}`);
            let body = await shopsFetch.json();
            for(let i = 0; i < body.favoriteShops.length; i++){
              if(body.favoriteShops[i]._id === props.shopDetails._id){
                setFavorite(true)
              }
            }
      }
    }
    getResponse()
      return () => {
        console.log("This will be logged on unmount");
      }
    
    }, [isFocused])


  var handleFavorite = async () => {

   if(props.token){
     
     if(favorite === false){
       
       props.favoriteShops(props.shopDetails._id);
       
    const FavoritePost =  await fetch(`${IP_ADDRESS}/favorites`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `token=${props.token}&id=${props.shopDetails._id}`
        }); 
        
        
        setFavorite(true)

      } else {
        
        const FavoriteDelete =   await fetch(`${IP_ADDRESS}/deleteFavorites`, {
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `token=${props.token}&id=${props.shopDetails._id}`
        }); 
        setFavorite(false)
        
      }
      
    } else {
      
      const NotConnectedAlert = () =>
      Alert.alert(
        'Connection Requise',
        'Connectez-vous ou Créez un compte pour rajouter des favoris',
        
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
        );
        NotConnectedAlert();
      }
      
      
    };
    
    var color;
    if (favorite === true) {
      color = '#e74c3c';
    } else {
      color = 'black';
    }
    //* Coiffeur
    
    const [coiffeurVisible, setCoiffeurVisible] = useState(false);
    const [coiffeurs, setCoiffeurs] = useState('Choix du Coiffeur');
    
  const coiffeurTab = props.shopDetails.shopEmployees.map((choix, i) => {
    return (
      <View key={i} style={{ flexDirection: 'row' }}>
        <Pressable
          
          style={[styles.button, styles.buttonOpen, styles.buttonZ]}
          onPress={() => {
            ChosenCoiffeur(choix);
          }}
        >
          <Text style={styles.textStyle}>{choix}</Text>
        </Pressable>
      </View>
    );
  });


  function ChosenCoiffeur(element) {
    setCoiffeurs(element);
    setCoiffeurVisible(false);
  }

  function closeCoiffeurs() {
    setCoiffeurs('Choix du Coiffeur');
    setCoiffeurVisible(false);
  }

  //* Experiences
  const [experiencesVisible, setExperiencesVisible] = useState(false);
  const [experiences, setExperiences] = useState(null);
  const [experiencePrice, setExperiencePrice] = useState();
  const [experienceDuration, setExperienceDuration] = useState();

   
  useEffect(() => {
  
  if(props.search.experience && experiences == null && quoi == null){
    setExperiences(props.search.experience);
    for(let i =0; i < props.shopDetails.packages.length; i++){
      if(props.shopDetails.packages[i].type === props.search.experience){
        setExperienceDuration(props.shopDetails.packages[i].duration)
        setExperiencePrice(props.shopDetails.packages[i].price)
        
      }
    }
  } else if(experiences == null){
  setExperiences("Choisir une Experience")
  }

  }, [experiences])
  



  const experienceTab = props.shopDetails.packages.map((choix, i) => {
    return (
      <View key={i} style={{ flexDirection: 'row' }}>
        <Pressable
          
          style={[styles.button, styles.buttonOpen, styles.buttonZ]}
          onPress={() => {
            ChosenExperiences(choix.type, choix.price, choix.duration);
          }}
        >
          <Text style={styles.textStyle}>{choix.type}</Text>
        </Pressable>
        <Pressable
         
          style={
            [styles.button, styles.buttonOpen, styles.buttonZ, styles.textStyle, {
              marginBottom: 10,
              marginLeft: 10,
              backgroundColor: '#58a2d6',
              borderRadius: 20,
              width: 80,
              alignItems: 'center',
              justifyContent: 'center'
          }]}
        >
          <Text style={styles.textStyle}>
            {choix.price}€
          </Text>
        </Pressable>
      </View>
    );
  });

  function ChosenExperiences(element, price, duration) {
    setExperiences(element);
    setExperiencePrice(price);
    setExperienceDuration(duration)
    setExperiencesVisible(false);
    setQuoi(null);
    
  }

  function closeExperiences() {
    setExperiencesVisible(false);
    setExperiences(null);
  }

  //* QUOI Prestation
  const [quoiVisible, setQuoiVisible] = useState(false);
  const [quoi, setQuoi] = useState(null);
  const [prestaPrice, setPrestaPrice] = useState();
  const [prestaDuration, setPrestaDuration] = useState(0);

  
   
  useEffect(() => {
    
    if(props.search.offer && experiences == null && quoi == null){
      setQuoi(props.search.offer)
      for(let i =0; i < props.shopDetails.offers.length; i++){
        if(props.shopDetails.offers[i].type === props.search.offer){
          setPrestaPrice(props.shopDetails.offers[i].price)
          setPrestaDuration(props.shopDetails.offers[i].duration)
        }
      }

    } else if(quoi == null){
    setQuoi('Choix de la Prestation')
  }
   
  }, [quoi])


  const prestationTab = props.shopDetails.offers.map((choix, i) => {
    return (
      <View key={i} style={{ flexDirection: 'row' }}>
        <Pressable
         
          style={[styles.button, styles.buttonOpen, styles.buttonZ, styles.textStyle]}
          onPress={() => ChosenQuoi(choix.type, choix.price, choix.duration)}
        >
          <Text style={styles.textStyle}>{choix.type}</Text>
        </Pressable>
        <Pressable
          
          style={
            [styles.button, styles.buttonOpen, styles.buttonZ, styles.textStyle, {
            marginBottom: 10,
            marginLeft: 10,
            backgroundColor: '#58a2d6',
            borderRadius: 20,
            width: 80,
            alignItems: 'center',
            justifyContent: 'center'
          }]
        }
        >
          <Text style={styles.textStyle}>
            {choix.price}€
          </Text>
        </Pressable>
      </View>
    );
  });

  function ChosenQuoi(element, price, duration) {
    setQuoi(element);
    setPrestaPrice(price);
    setQuoiVisible(false);
    setExperiences(null);
    setPrestaDuration(duration)
 
  }

  function closeQuoi() {
    setQuoiVisible(false);
    setQuoi(null);
  }

  //*QUOI END

  const [chosenVar, setChosenVar] = useState(props.chosenDate);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(chosenVar);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [chosenHour, setChosenHour] = useState();

  const isCarousel = useRef(null);
  const [index, setIndex] = useState(0);
  const scrollRef = useRef(null);

  

  //* Handling data for Carousel, using reducer
  var data = [];
  for (let i = 0; i < props.shopDetails.shopImages.length; i++) {
    data.push({ imgUrl: { uri: props.shopDetails.shopImages[i] } });
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
  };

  // * handling return button
  function handleReturnButton() {
    props.navigation.goBack();
  }

  //* handling validation button,
  

  function handleChoixDuSalon() {
    
    let convertedHour = convertMinsToTime(chosenHour);
 
    if ( chosenHour === undefined){
      const createTwoButtonAlert = () =>
      Alert.alert(
        'Choix Obligatoire',
        'Choix Date et Heure Obligatoire.',

        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    createTwoButtonAlert();
       } else if((quoi == 'Choix de la Prestation') && (experiences == "Choisir une Experience") ){
      
      
        const createTwoButtonAlert = () =>
          Alert.alert(
            'Choix Obligatoire',
            'Choix Prestation ou Experience Obligatoire.',
    
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
          );
        createTwoButtonAlert();
      } else {
    
      props.chosenAppointment(
        convertedHour,
        coiffeurs,
        quoi,
        prestaPrice,
        prestaDuration,
        experiences,
        experiencePrice,
        experienceDuration,
        date == null ? chosenVar : chosenVar, //? bug résolu
        props.shopDetails.shopName,
        props.shopDetails.shopAddress,
        props.shopDetails._id,
        props.shopDetails.shopImages[0]
      );

      props.token === ''
        ? props.navigation.navigate('ButtonTabSign')
        : props.navigation.navigate('Appointment');
    }
  }

  // * mapping on euro logo to showcase price range of saloon
  var priceTab = [];
  for (let y = 0; y < 3; y++) {
    var euroColor = 'grey';
    if (y < hairdresser.priceFork) {
      euroColor = 'black';
    }
    priceTab.push(
      <FontAwesome
        key={y}
        style={{ marginRight: 5 }}
        name='euro'
        size={24}
        color={euroColor}
      />
    );
  }

  //* mapping on black/golden star to set rating with average rating, rounded, so star rating is closest to reality
  var starTab = [];
  var flooredStarRating = Math.round(hairdresser.starRating);
  for (let i = 0; i < 5; i++) {
    var starColor = 'black';
    if (i < flooredStarRating) {
      starColor = 'gold';
    }
    starTab.push(
      <FontAwesome
        style={{ marginRight: 5 }}
        key={i}
        name='star'
        size={24}
        color={starColor}
      />
    );
  }

  //* mapping to showcase different utilities/extras/ using logos, accept animals, handi access etc...
  var pictoTab = [];
  for (let z = 0; z < hairdresser.shopFeatures.length; z++) {
    pictoTab.push(
      <FontAwesome
        key={z}
        name={hairdresser.shopFeatures[z]}
        size={24}
        color='black'
        style={{ marginRight: 5 }}
      />
    );
  }

  const handleAvis = () => {
    scrollRef.current?.scrollTo({
      y: 1200,
      animated: true,
    });
  };

  //*Comment section

  var listCommentItem = props.shopDetails.comments.map((l, i) => {
    //* mapping on stars for comments:
    var starCommentTab = [];
    for (let i = 0; i < 5; i++) {
      var starCommentColor = 'black';
      if (i < l.rating) {
        starCommentColor = 'gold';
      }
      starCommentTab.push(
        <FontAwesome
          style={{ marginRight: 5 }}
          key={i}
          name='star'
          size={24}
          color={starCommentColor}
        />
      );
    }
    return (
      
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>
            {starCommentTab} Moyenne: {l.rating}/5{' '}
          </ListItem.Title>
          <ListItem.Subtitle>{l.comment}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  });


  //* TIme stuff


  const convertMinsToTime = (mins) => {
    let hours = Math.floor(mins / 60);
    let minutes = mins % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes}`;
  };

  let hoursTab;
  let hoursArr = [];
  let appointmentTime = [];
  let appointDate = [];

  for (let z = 0; z < props.shopDetails.appointments.length; z++) {
    let zeroD = '';
    let zeroM = '';

    let startTime = new Date(props.shopDetails.appointments[z].startDate);
    let hourApp = startTime.getHours() - 1;
    let minuteApp = startTime.getMinutes();

    minuteApp = minuteApp < 10 ? '0' + minuteApp : minuteApp;
    let formatedTime = hourApp + ':' + minuteApp;
    appointmentTime.push(formatedTime);

    startTime.getDate() < 10 ? (zeroD = '0') : null;
    startTime.getMonth() < 10 ? (zeroM = '0') : null;
    let formatedDate =
      zeroD +
      startTime.getDate() +
      '-' +
      zeroM +
      (startTime.getMonth() + 1) +
      '-' +
      startTime.getFullYear();
    appointDate.push(formatedDate);
    
  }
const [dateToCompare, setDateToCompare] = useState()

  const handleConfirm = (choice) => {
    setDateToCompare(choice)
    var zeroDay = '';
    var zeroMonth = '';

    choice.getDate() < 10 ? (zeroDay = '0') : null;
    choice.getMonth() < 10 ? (zeroMonth = '0') : null;

    setIsDateSelected(true);
    let dateToSetter = null;
    dateToSetter =
      zeroDay +
      choice.getDate() +
      '-' +
      zeroMonth +
      (choice.getMonth() + 1) +
      '-' +
      choice.getFullYear();
    setChosenVar(dateToSetter);
    hideDatePicker();
  };

  if (chosenVar) {

    let dateGoodFormat =
      chosenVar.split('-')[2] +
      '-' +
      chosenVar.split('-')[1] +
      '-' +
      chosenVar.split('-')[0];
    let chosenDay = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ][new Date(dateGoodFormat).getDay()];

    let filteredSchedule = props.shopDetails.schedule.filter(
      (e) => e.dayOfTheWeek == chosenDay
    );

    if (filteredSchedule.length !== 0) {
      for (
        let i = filteredSchedule[0].openingHours;
        i <= filteredSchedule[0].closingHours;
        i += 30
      ) {
        hoursArr.push(i);

        let nowHours = new Date().getHours()
        let nowMinutes = new Date().getMinutes()
      
        let nowTotalTime = nowHours * 60 + nowMinutes + 20

        hoursTab = hoursArr.map((hour, i) => {
          
          var color = '#FFCD41';
          let disabled = false;
          if(nowTotalTime > hour && dateToCompare < new Date()){
            color ="grey"
            disabled = true;
          }

          if (chosenHour === hour) {
            color = '#4280AB';
          }
          let interTab = [];

          let isFull = 0;
          for (let y = 0; y < appointmentTime.length; y++) {
            if (
              appointmentTime[y] == convertMinsToTime(hour) &&
              chosenVar == appointDate[y]
            ) {
              isFull++;
            }
          }

          if (isFull >= props.shopDetails.shopEmployees.length) {
            
            interTab.push(
              <TouchableOpacity
                disabled={disabled}
                onPress={() => {
                  setChosenHour(hour);
                }}
                value={hour}
                key={i}
                style={{
                  padding: 10,
                  margin: 5,
                  backgroundColor: 'grey',
                  borderRadius: 8,
                  width: 70,
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                  {convertMinsToTime(hour)}
                </Text>
              </TouchableOpacity>
            );
          } else {
            interTab.push(
              <TouchableOpacity
                disabled={disabled}
                onPress={() => {
                  setChosenHour(hour);
                }}
                value={hour}
                key={i}
                style={{
                  padding: 10,
                  margin: 5,
                  backgroundColor: `${color}`,
                  borderRadius: 8,
                  width: 70,
                  alignItems: 'center',
                }}
              >
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                  {convertMinsToTime(hour)}
                </Text>
              </TouchableOpacity>
            );
          }
          return interTab;
        });
      }
    } else {
      hoursTab = <Text>Pas de dispo ou choisir une autre date</Text>;
    }
  }

  //*DATETIME PICKER ****************************************

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  var datePhrase = 'Choisir une Date';

  
//* Carousel

  var roundedRating = Math.round(hairdresser.starRating * 10) / 10;
  return (
    <View style={styles.card}>
      <Text style={[globalStyles.brand, { marginTop: -30 }]}></Text>
      <ScrollView ref={scrollRef}>
        <View>
          <Card>
            <View style={{ alignItems: 'center' }}>
              <Carousel
                layout='stack'
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
                backgroundColor: 'rgba(0, 0, 0, 0.92)',
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              tappableDots={true}
            />
            <Card.Divider />

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: 'graduate-regular',
                  textAlign: 'center',
                }}
              >
                {hairdresser.name}
              </Text>
              <FontAwesome
                onPress={() => handleFavorite()}
                name='heart'
                size={24}
                color={color}
              />
            </View>

            <Text style={{ marginBottom: 10 }}>{hairdresser.description}</Text>

            <Card.Divider />

            <View style={styles.containerMap}>
              <View style={{ width: 180 }}>
                <Text style={{ marginBottom: 10 }}>{hairdresser.address}</Text>

                <View style={styles.icons}>{priceTab}</View>

                <View style={styles.icons2}>{pictoTab}</View>

                <View style={styles.icons2}>
                  {starTab}

                  <Text>({roundedRating})</Text>
                </View>
                <View style={[styles.avis, { marginTop: 10 }]}>
                  <TouchableOpacity
                    style={styles.avis}
                    onPress={() => handleAvis()}
                  >
                    <Text style={styles.avisText}>Voir tout les Avis</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.mapPosition}>
                <MapView
                  mapType={'standard'}
                  showsTraffic={false}
                  style={styles.map}
                  initialRegion={{
                    latitude: props.shopDetails.latitude,
                    longitude: props.shopDetails.longitude,
                    latitudeDelta: 0.005757,
                    longitudeDelta: 0.007866,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: props.shopDetails.latitude,
                      longitude: props.shopDetails.longitude,
                    }}
                  />
                </MapView>
              </View>
            </View>

            <Card.Divider></Card.Divider>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.centeredView}>
                <Pressable
                  onPress={() => setCoiffeurVisible(true)}
                  style={[ styles.button, styles.buttonOpen, { width: 100 }]}
                >
                  <Text style={styles.textStyle}>{coiffeurs}</Text>
                </Pressable>
              </View>

              <View style={styles.centeredView}>
                <Pressable
                  onPress={() => setQuoiVisible(true)}
                  style={[styles.button, styles.buttonOpen]}
                >
                  
                    <Text style={styles.textStyle}>{quoi}</Text>
                 
                </Pressable>
              </View>

              <View style={styles.centeredView}>
                <Pressable
                  onPress={() => setExperiencesVisible(true)}
                  style={[styles.button, styles.buttonOpen]}
                >
                 
                    <Text style={styles.textStyle}>{experiences}</Text>
                  
                </Pressable>
              </View>
            </View>
          </Card>

          <Card>
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              {chosenVar !== null ? (
                <View style={{ width: 270 }}>
                  <PrimaryButton
                    backgroundColor='#4280AB'
                    color='white'
                    title={datePhrase}
                    onPress={showDatePicker}
                  />
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode='date'
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    minimumDate={new Date()}
                  />

                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: 'graduate-regular',
                      margin: 20,
                    }}
                  >
                    Pour le {chosenVar},
                  </Text>
                </View>
              ) : (
                <View style={{ width: 270 }}>
                  <PrimaryButton
                    backgroundColor='#4280AB'
                    color='white'
                    title={datePhrase}
                    onPress={showDatePicker}
                  />
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode='date'
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    minimumDate={new Date()}
                  />
                </View>
              )}
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'graduate-regular',
                  marginBottom: 10,
                  marginTop: 10,
                }}
              >
                Choisis l'heure du RDV :
              </Text>
              <View
                style={{ flexDirection: 'row', flexWrap: 'wrap', margin: 12 }}
              >
                {hoursTab}
              </View>
            </View>
          </Card>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            margin: 30,
          }}
        >
          <PrimaryButton
            title='retour'
            backgroundColor='#AB4242'
            color='white'
            onPress={() => handleReturnButton()}
          />
          <PrimaryButton
            title='Valider'
            backgroundColor='#4280AB'
            color='white'
            onPress={() => handleChoixDuSalon()}
          />
        </View>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: '#FFCD41',
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 24, fontFamily: 'graduate-regular' }}>
            Tout les avis du Salon
          </Text>
        </View>
        {listCommentItem}
      </ScrollView>

      <Overlay isVisible={quoiVisible}>
        <View style={{ alignItems: 'center'}}>
        {prestationTab}
        <Pressable
          style={[styles.buttonClose]}
          onPress={() => closeQuoi()}
        >
          <Text style={styles.textStyle}>Aucune</Text>
        </Pressable>
        </View>
      </Overlay>

      <Overlay  isVisible={experiencesVisible}>
      
        <View style={{ alignItems: 'center'}}>
        {experienceTab}
        <Pressable
        
          style={[styles.buttonClose]}
          onPress={() => closeExperiences()}
        >
          <Text style={styles.textStyle}>Aucune</Text>
        </Pressable>
        </View>
      </Overlay>

      <Overlay isVisible={coiffeurVisible}>
        <View style={{ alignItems: 'center'}}>
        {coiffeurTab}
        <Pressable
          style={[styles.buttonClose]}
          onPress={() => closeCoiffeurs()}
        >
          <Text style={styles.textStyle}>Aucun</Text>
        </Pressable>
        </View>
      </Overlay>
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
    width: '90%',
  },
  card: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#FFE082',
  },
  avis: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFCD41',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 1,
    width: 120,
  },
  avisText: {
    fontWeight: 'bold',
  },
  
  buttonOpen: {
    backgroundColor: '#4280AB',
  },
  buttonClose: {
    backgroundColor: '#AB4242',
    borderRadius: 20,
    padding: 10,
    width: 100,
    justifyContent: 'flex-end'
  },
  textStyle: {
    color: 'white',
    fontFamily: 'graduate-regular',
    textAlign: 'center',
    fontSize: 14,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 15,
    textAlign: "center",
    width: 110,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonZ: {
    width: 200,
    marginBottom: 10,
    textAlign: "center"
  },
 
});

function mapDispatchToProps(dispatch) {
  return {
    chosenAppointment: function (
      hour,
      coiffeurs,
      quoi,
      price,
      duration,
      experience,
      experiencePrice,
      experienceDuration,
      date,
      shopDetailsName,
      shopDetailsAddress,
      shopDetailsID,
      shopDetailsImage,
    ) {
      dispatch({
        type: 'finalAppointment',
        hour: hour,
        hairdresser: coiffeurs,
        prestation: quoi,
        prestationPrice: price,
        prestationDuration: duration,
        experience: experience,
        experiencePrice: experiencePrice,
        experienceDuration: experienceDuration,
        date: date,
        shopDetailsName: shopDetailsName,
        shopDetailsAddress: shopDetailsAddress,
        shopDetailsID: shopDetailsID,
        shopDetailsImage: shopDetailsImage
      });
    },

    //? isFocused remplace reducer dans la page favori
    
    favoriteShops: function(shopID){
      dispatch({
        type: 'favoriteShop',
        shopID: shopID
      })
      
    }
  };
}

function mapStateToProps(state) {
  return {
    shopDetails: state.shopDetails,
    chosenDate: state.search.date,
    search: state.search,
    token: state.token,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
