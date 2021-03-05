import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Button, Pressable
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

function Shop(props) {
  
  //* Coiffeur

  const [coiffeurVisible, setCoiffeurVisible] = useState(false);
  const [coiffeurs, setCoiffeurs] = useState ('Choix du Coiffeur');

  const coiffeurTab = props.shopDetails.shopEmployees.map((choix, i)=> {
    return (<View style={{ flexDirection: 'row'}}>
    <Pressable key={i} style={[styles.button, styles.buttonOpen, styles.buttonZ]} 
  onPress={()=> {
    ChosenCoiffeur(choix)
    }}>
  <Text style={styles.textStyle}>{choix}</Text>
</Pressable>
</View>)
  })
  function ChosenCoiffeur(element) {
    setCoiffeurs(element);
    setCoiffeurVisible(false);
  }
  
  function closeCoiffeurs() {
    setCoiffeurs("Choix du Coiffeur");
    setCoiffeurVisible(false);
  }


  //* Experiences
  const [experiencesVisible, setExperiencesVisible] = useState(false);
  const [experiences, setExperiences] = useState("Choix de l'Expérience");
  const [experiencePrice, setExperiencePrice] = useState();

  const experienceTab = props.shopDetails.packages.map((choix, i)=>{
    return (<View style={{ flexDirection: 'row'}}>
      <Pressable key={i} style={[styles.button, styles.buttonOpen, styles.buttonZ]} 
    onPress={()=> {
      ChosenExperiences(choix.type, choix.price)
      }}>
    <Text style={styles.textStyle}>{choix.type}</Text>
</Pressable>
<Pressable key={i} style={{padding: 10, marginBottom: 10, marginLeft:10, backgroundColor: '#58a2d6', borderRadius: 20, width: 70, alignItems: 'center'}}><Text style={{fontWeight: 'bold', fontSize: 18, color: 'white'}}>{choix.price}€</Text></Pressable></View>)
})

function ChosenExperiences(element, price) {
  setExperiences(element);
  setExperiencePrice(price)
  setExperiencesVisible(false);
  setQuoi("Choix de la Prestation");
}

function closeExperiences() {
  setExperiencesVisible(false);
  setExperiences("Choix de l'Expérience");
}
  
  //* QUOI Prestation
   const [quoiVisible, setQuoiVisible] = useState(false);
  const [quoi, setQuoi] = useState("Choix de la Prestation");
  const [prestaPrice, setPrestaPrice] = useState()

   const prestationTab = props.shopDetails.offers.map((choix, i)=>{
  
    return (
    <View style={{ flexDirection: 'row'}}>
    <Pressable key={i} style={[styles.button, styles.buttonOpen, styles.buttonZ]}
     onPress={() => ChosenQuoi(choix.type, choix.price)}>
      <Text style={styles.textStyle}>{choix.type}</Text>
    </Pressable>
    <Pressable key={i} style={{padding: 10, marginBottom: 10, marginLeft:10, backgroundColor: '#58a2d6', borderRadius: 20, width: 70, alignItems: 'center'}}><Text style={{fontWeight: 'bold', fontSize: 18, color: 'white'}}>{choix.price}€</Text></Pressable>
    </View>)
})

  
  function ChosenQuoi(element, price) {
    setQuoi(element)
    setPrestaPrice(price)
    setQuoiVisible(false)
    setExperiences("Choix de l'Expérience")
  }

  function closeQuoi() {
    setQuoiVisible(false);
    setQuoi("Choix de la Prestation");
  }

//*QUOI END

  const [chosenVar, setChosenVar] = useState(props.chosenDate);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(chosenVar);
  const [isDateSelected, setIsDateSelected] = useState(false);

  const isCarousel = useRef(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [chosenHour, setChosenHour] = useState();
  const [favorite, setFavorite] = useState(false);

  const scrollRef = useRef(null);

  var handleFavorite = () => {
    setFavorite(!favorite);
  };
  var color;
  if (favorite === true) {
    color = '#e74c3c';
  } else {
    color = 'black';
  }

  const toggleOverlay = () => {
    setVisible(!visible);
  };

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
  //!! see what to send to SignIn/SignOut or Reducer
  function handleChoixDuSalon() {
    let convertedHour = convertMinsToTime(chosenHour);

    if (
      quoi === "Choix de la Prestation" && experiences === "Choix de l'Expérience"
      ||
      chosenHour === undefined 
    ) {
      console.log('Choisir une prestation BIS');

    } else {

    props.chosenAppointment(
      convertedHour,
      coiffeurs,
      quoi,
      prestaPrice,
      experiences,
      experiencePrice,
      date == null ? chosenVar : chosenVar,
      props.shopDetails.shopName,
      props.shopDetails.shopAddress,
      props.shopDetails._id
    );

    props.token === ''
      ? props.navigation.navigate('ButtonTabSign')
      : props.navigation.navigate('Appointment');
  } }

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

  //! should navigate to lower screen to check comments
  const handleAvis = () => {
    // ScrollView.scrollToEnd({animated: true})
    scrollRef.current?.scrollTo({
      y: 1200,
      animated: true,
    });
  };

  const listComment = [
    { pseudo: 'Juliette', message: "J'adore ce salon" },
    { pseudo: 'Yaya', message: "J'adore ce salon" },
    { pseudo: 'Raph', message: "J'adore ce salon" },
    { pseudo: 'Bassem', message: "J'adore ce salon" },
  ];
console.log(props.shopDetails.comments)
  var listCommentItem = props.shopDetails.comments.map((l, i) => {
     //* mapping on stars for comments: 
  var starCommentTab = [];
  for(let i = 0; i<5; i++){
    var starCommentColor = 'black';
    if(i<l.rating){
      starCommentColor = 'gold';
    }
      starCommentTab.push(  
      <FontAwesome style={{ marginRight: 5 }}
        key={i}
        name='star'
        size={24}
        color={starCommentColor}
      />
      );
    }
    return (
   
      <ListItem  key={i} bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{starCommentTab} Moyenne: {l.rating}/5 </ListItem.Title>
          
          <ListItem.Subtitle>{l.comment}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
   
    );
  });

  const convertMinsToTime = (mins) => {
    let hours = Math.floor(mins / 60);
    let minutes = mins % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes}`;
  };

  // const hours =  [{mon: {open: 570, close: 1080 }}]
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

  const handleConfirm = (choice) => {
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
    // console.log("final date?:", chosenVar)

    //  datePhrase = dateToReducer
    hideDatePicker();
  };

  // let weeklyTab = ["Monday", "Tuesday",
  // "Wednesday",
  // "Thursday",
  // "Friday",
  // "Saturday",
  // "Sunday",]
  // // props.shopDetails.schedule.map((schedule)=>{
  // //   console.log("DAY OF THE WEEK", schedule.dayOfTheWeek);
  // //   weeklyTab.push(schedule.dayOfTheWeek)
  // // })

  // console.log(weeklyTab)

  // let isOpen = false
  // for(let dayOftheTab = 0; dayOftheTab < weeklyTab.length; dayOftheTab ++){
  // if(weeklyTab[dayOftheTab] === props.shopDetails.schedule[dayOftheTab].dayOfTheWeek){
  // isOpen = true
  // }}

  if (chosenVar) {
    // console.log("PROPS Schedule ", props.shopDetails.schedule)
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
    // console.log("GOOD FORMAT", dateGoodFormat)
    if (filteredSchedule.length !== 0) {
      for (
        let i = filteredSchedule[0].openingHours;
        i <= filteredSchedule[0].closingHours;
        i += 30
      ) {
        hoursArr.push(i);

        hoursTab = hoursArr.map((hour, i) => {
          var color = '#FFCD41';

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
                disabled={true}
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
                disabled={false}
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

  // if (isDateSelected) {
  //
  //     datePhrase = zeroDay + date.getDate() + "/" + zeroMonth + (date.getMonth() + 1) +"/"+ date.getFullYear();

  //   } else {
  //     datePhrase = "TOUTES LES DATES"
  //  }

  //**************************************** */


 

  return (
    <View style={styles.card}>
      <Text style={[globalStyles.brand, { marginTop: 10 }]}>'Stach</Text>
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

                  <Text>({hairdresser.starRating})</Text>
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
              <Pressable onPress={() => setCoiffeurVisible(true)} style={[styles.button, styles.buttonOpen, styles.buttonW, {width : 100}]}>
                <Text style={styles.textStyle}>{coiffeurs}</Text>
              </Pressable>
              </View>
             
            <View style={styles.centeredView}>
              <Pressable onPress={() => setQuoiVisible(true)} style={[styles.button, styles.buttonOpen, styles.buttonW]}>
                <Text style={styles.textStyle}>{quoi}</Text>
              </Pressable>
            </View>

             
            <View style={styles.centeredView}>
              <Pressable onPress={() => setExperiencesVisible(true)} style={[styles.button, styles.buttonOpen, styles.buttonW]}>
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
            {prestationTab}
            <Pressable    style={[styles.button, styles.buttonClose, styles.buttonW]}
              onPress={() => closeQuoi()}>
            <Text style={styles.textStyle}>Aucune</Text>
            </Pressable>
        </Overlay>
    

      <Overlay isVisible={experiencesVisible}>
            {experienceTab}
            <Pressable    style={[styles.button, styles.buttonClose, styles.buttonW]}
            onPress={()=>closeExperiences()}>
              <Text style={styles.textStyle}>Aucune</Text>
            </Pressable>
      </Overlay>


      <Overlay isVisible={coiffeurVisible}>
            {coiffeurTab}
            <Pressable    style={[styles.button, styles.buttonClose, styles.buttonW]}
            onPress={()=> closeCoiffeurs()}>
              <Text style={styles.textStyle}>Aucun</Text>
            </Pressable>
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#4280AB",
  },
  buttonClose: {
    backgroundColor: "#AB4242",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 4
  },
  buttonZ: {
    width: 200,
    marginBottom: 10    
}
});

function mapDispatchToProps(dispatch) {
  return {
    chosenAppointment: function (
      hour,
      coiffeurs,
      quoi,
      price,
      experience,
      experiencePrice,
      date,
      shopDetailsName,
      shopDetailsAddress,
      shopDetailsID
    ) {
      dispatch({
        type: 'finalAppointment',
        hour: hour,
        hairdresser: coiffeurs,
        prestation: quoi,
        prestationPrice: price,
        experience: experience,
        experiencePrice: experiencePrice,
        date: date,
        shopDetailsName: shopDetailsName,
        shopDetailsAddress: shopDetailsAddress,
        shopDetailsID: shopDetailsID,
      });
    },
  };
}

function mapStateToProps(state) {
  return {
    shopDetails: state.shopDetails,
    chosenDate: state.search.date,
    token: state.token,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
