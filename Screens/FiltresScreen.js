import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import { globalStyles } from '../styles/Global';
import { Overlay, Card } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {connect} from 'react-redux';
import Button from '../shared/Button'


function Filtres(props) {

  var coupes = ['COUPE HOMME','COUPE FEMME','COUPE HOMME + BARBE','COUPE HOMME COLORATION','COUPE FEMME COLORATION','COUPE FEMME AFRO', 'COUPE HOMME AFRO', 'COUPE FEMME BALAYAGE', 'COUPE FEMME PERMANENTE']

  var pictos = ['wheelchair-alt', 'glass', 'gamepad', 'coffee', 'leaf', 'paw'];

  var prix = ['€', '€€', '€€€'];

  var nosExperiences = ['MOMENT A DEUX', 'APERO COIF', 'PLAY HARD CUT HARD', 'BIEN ETRE'];

  const [salonOrHome, setSalonOrHome] = useState(null);
  const [address, setAddress] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [completeDate, setCompleteDate] = useState(null);
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(null);
  
  const [quoiVisible, setQuoiVisible] = useState(false);
  const [quoi, setQuoi] = useState(null);

  const [servicesVisible, setServicesVisible] = useState(false);
  const [services, setServices] = useState(null);

  const [priceVisible, setPriceVisible] = useState(false);
  const [price, setPrice] = useState(null);
  const [afficherPrice, setAfficherPrice] = useState(null);

  const [experiencesVisible, setExperiencesVisible] = useState(false);
  const [experiences, setExperiences] = useState(null);

  const [noteVisible, setNoteVisible] = useState(false);
  const [note, setNote] = useState(null);


  // QUOI
  var coupesTab = coupes.map((element, i) => {
    return(
      <Pressable key={i} style={[styles.button, styles.buttonOpen, styles.buttonZ]} onPress={() => ChosenQuoi(element)}>
        <Text style={styles.textStyle}>{element}</Text>
    </Pressable>
    )
  })
  
  function ChosenQuoi(element) {
    setQuoi(element)
    setQuoiVisible(false)
    setExperiences(null)
  }

  function closeQuoi() {
    setQuoiVisible(false);
    setQuoi(null);
  }

  // SERVICES
  var pictosTab = pictos.map((element, i) => {
    return(
      <Pressable key={i} style={[styles.button, styles.buttonOpen, styles.buttonZ]} onPress={() => ChosenServices(element)}>
        <FontAwesome name={element} size={15} color='black' style={styles.pad} />
      </Pressable>
    )
  })

  function ChosenServices(element) {
    setServices(element)
    setServicesVisible(false)
  }

  function closeServices() {
    setServicesVisible(false)
    setServices(null);
  }

  //PRIX
  var prixTab = prix.map((element, i) => {
    return(
      <Pressable key={i} style={[styles.button, styles.buttonOpen, styles.buttonZ]} onPress={() => ChosenPrices(element)}>
        <Text style={styles.textStyle}>{element}</Text>
      </Pressable>
    )
  })  

  function ChosenPrices(element) {
    setAfficherPrice(element);
    if (element === '€') {
      setPrice(1);
    } else if (element === '€€')  {
      setPrice(2) 
    } else if (element === '€€€') {
      setPrice(3)
    }
    setPriceVisible(false)
  };
  
  function closePrice() {
    setPriceVisible(false);
    setAfficherPrice(null)
    setPrice(null)
  }

  //EXPERIENCES
  var experiencesTab = nosExperiences.map((element, i) => {
    return(
      <Pressable key={i} style={[styles.button, styles.buttonOpen, styles.buttonZ]} onPress={() => ChosenExperiences(element)}>
        <Text style={styles.textStyle}>{element}</Text>
    </Pressable>
    )
  })

  function ChosenExperiences(element) {
    setExperiences(element);
    setExperiencesVisible(false);
    setQuoi(null);
  }

  function closeExperiences() {
    setExperiencesVisible(false);
    setExperiences(null);
  }

  //RATING

  var starsTab = []
  for (let i=0; i<note; i++) {
    starsTab.push(<FontAwesome key={i} style={{marginRight: 5}} name="star" size={24} color='#AB4242' />)
  }

  function chosenNote(note) {
    setNote(note);
    setNoteVisible(false);
  }
  
  function closeNote() {
    setNoteVisible(false);
    setNote(null);
  }

  //USE EFFECT ENTREE
  useEffect( () => {
    setDate(props.search.date);
    setHour(props.search.hour);
    setCompleteDate(props.search.completeDate);
    setQuoi(props.search.offer);
    setExperiences(props.search.experience);
    setSalonOrHome(props.search.salonOrHome);
    setAddress(props.search.address);
    setLatitude(props.search.latitude)
    setLongitude(props.search.longitude)
    setServices(props.search.service)
    setPrice(props.search.priceFork)
    if (props.search.priceFork === 1) {
      setAfficherPrice('€');
    } else if (props.search.priceFork === 2)  {
      setAfficherPrice('€€'); 
    } else if (props.search.priceFork === 3) {
      setAfficherPrice('€€€');
    }
    setNote(props.search.rating)
  }, []);
  
  //VALIDATION
  function validation() {
    props.addToSearch(date, hour, quoi, services, price, experiences, note, salonOrHome, address, latitude, longitude, completeDate);
    props.navigation.navigate('ButtonTabShop', {screen: 'List'})
  }

  return (
    <View style={globalStyles.container}>
        <Text style={globalStyles.brand}>Filtres</Text>
        <View >

          <TouchableOpacity onPress={() => setQuoiVisible(true)}>
            <Text style={styles.title}>QUOI ?</Text>
            <Text style={globalStyles.paragraph}>{quoi}</Text>
            <Card.Divider></Card.Divider>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setServicesVisible(true)}>
            <Text style={styles.title}>SERVICES ?</Text>
            <FontAwesome name={services} size={25} color='black' style={{padding: 5}} />
            <Card.Divider></Card.Divider>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setPriceVisible(true)}>
            <Text style={styles.title}>PRIX ?</Text>
            <Text style={globalStyles.paragraph}>{afficherPrice}</Text>
            <Card.Divider></Card.Divider>
          </TouchableOpacity>

          
          <TouchableOpacity onPress={() => setExperiencesVisible(true)}>
            <Text style={styles.title}>EXPERIENCE ?</Text>
            <Text style={globalStyles.paragraph}>{experiences}</Text>
            <Card.Divider></Card.Divider>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setNoteVisible(true)}>
            <Text style={styles.title}>NOTE ?</Text>
            <Text style={globalStyles.paragraph}>{starsTab}</Text>
            <Card.Divider></Card.Divider>
          </TouchableOpacity>

          <Button title='Valider' onPress={() => validation()} color='white' backgroundColor='#4280AB'></Button>
        </View>

        <Overlay isVisible={quoiVisible}>
            <View style={styles.cross}>
              <EvilIcons name="close" size={24} color="black" onPress={() => closeQuoi()} style={{margin: 5}}/>
            </View>
            {coupesTab}
        </Overlay>

        <Overlay isVisible={servicesVisible}>
            <View style={styles.cross}>
              <EvilIcons name="close" size={24} color="black" onPress={() => closeServices()} style={{margin: 5}}/>
            </View>
            <View style={styles.row}>
              {pictosTab}
            </View>
        </Overlay>

        <Overlay isVisible={priceVisible}>
            <View style={styles.cross}>
              <EvilIcons name="close" size={24} color="black" onPress={() => closePrice()} style={{margin: 5}}/>
            </View>
            <View style={styles.row}>
              {prixTab}
            </View>
        </Overlay>

        <Overlay isVisible={experiencesVisible}>
            <View style={styles.cross}>
              <EvilIcons name="close" size={24} color="black" onPress={() => closeExperiences()} style={{margin: 5}}/>
            </View>
            {experiencesTab}
        </Overlay>

        <Overlay isVisible={noteVisible}>
            <View style={styles.cross}>
              <EvilIcons name="close" size={24} color="black" onPress={() => closeNote()} style={{margin: 5}}/>
            </View >
            
              <Pressable style={[styles.button, styles.buttonOpen, styles.buttonZ]} onPress={() => chosenNote(1)}>
                <View style={styles.row}>
                  <FontAwesome style={{marginRight: 5}} name="star" size={24} color='gold' />
                  <Text style={styles.starsText}>Minimum une étoile</Text>
                </View>
              </Pressable>


              <Pressable style={[styles.button, styles.buttonOpen, styles.buttonZ]} onPress={() => chosenNote(2)}>
                <View style={styles.row}>
                  <FontAwesome style={{marginRight: 5}} name="star" size={24} color='gold' />
                  <FontAwesome style={{marginRight: 5}} name="star" size={24} color='gold' />
                  <Text style={styles.starsText}>Minimum deux étoiles</Text>
                </View>
              </Pressable>


              <Pressable style={[styles.button, styles.buttonOpen, styles.buttonZ]} onPress={() => chosenNote(3)}>
                <View style={styles.row}>
                  <FontAwesome style={{marginRight: 5}} name="star" size={24} color='gold' />
                  <FontAwesome style={{marginRight: 5}} name="star" size={24} color='gold' />
                  <FontAwesome style={{marginRight: 5}} name="star" size={24} color='gold' />
                  <Text style={styles.starsText}>Minimum trois étoiles</Text>
                </View>
              </Pressable>


              <Pressable style={[styles.button, styles.buttonOpen, styles.buttonZ]} onPress={() => chosenNote(4)}>
                <View style={styles.row}>
                  <FontAwesome style={{marginRight: 5}} name="star" size={24} color='gold' />
                  <FontAwesome style={{marginRight: 5}} name="star" size={24} color='gold' />
                  <FontAwesome style={{marginRight: 5}} name="star" size={24} color='gold' />
                  <FontAwesome style={{marginRight: 5}} name="star" size={24} color='gold' />
                  <Text style={styles.starsText}>Minimum quatres étoiles</Text>
                </View>
              </Pressable>


              <Pressable style={[styles.button, styles.buttonOpen, styles.buttonZ]} onPress={() => chosenNote(5)}>
                <View style={styles.row}>
                  <FontAwesome style={{marginRight: 5}} name="star" size={24} color='gold' />
                  <FontAwesome style={{marginRight: 5}} name="star" size={24} color='gold' />
                  <FontAwesome style={{marginRight: 5}} name="star" size={24} color='gold' />
                  <FontAwesome style={{marginRight: 5}} name="star" size={24} color='gold' />
                  <FontAwesome style={{marginRight: 5}} name="star" size={24} color='gold' />
                  <Text style={styles.starsText}>Minimum cinq étoiles</Text>
                </View>
              </Pressable>
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
  },
  title: {fontWeight : "bold", fontSize: 20, marginTop:10,},
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
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
  pad: {padding: 2},
  starsText : {color: 'white'},
  cross: {display: 'flex', alignItems: 'flex-end'}, 
  row: {display: 'flex', flexDirection: 'row'}
});



function mapStateToProps(state){
  return {search: state.search}
}

function mapDispatchToProps(dispatch){
  return {
    addToSearch: function(date, hour, quoi, services, price, experiences, note, salonOrHome, address, latitude, longitude, completeDate){
      dispatch({type: 'createSearch', 
        salonOrHome : salonOrHome, 
        completeDate : completeDate,
        date : date, 
        hour : hour, 
        address : address, 
        latitude : latitude, 
        longitude : longitude, 
        offer : quoi, 
        experience : experiences, 
        service : services, 
        priceFork : price, 
        rating: note})
    }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps,
)(Filtres);

