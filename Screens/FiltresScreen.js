import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import { globalStyles } from '../styles/Global';
import { Overlay, Card } from 'react-native-elements';
import { EvilIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';


export default function Filtres() {

  

  var coupes = ['COUPE HOMME','COUPE FEMME','COUPE HOMME + BARBE','COUPE HOMME COLORATION','COUPE FEMME COLORATION','COUPE FEMME AFRO', 'COUPE HOMME AFRO', 'COUPE FEMME BALAYAGE', 'COUPE FEMME PERMANENTE']

  var pictos = ['wheelchair-alt', 'glass', 'gamepad', 'coffee', 'leaf', 'paw']

  const [quandVisible, setQuandVisible] = useState(false);
  const [quand, setQuand] = useState(null);

  const [heureVisible, setHeureVisible] = useState(false);
  const [heure, setHeure] = useState(null)
  
  const [quoiVisible, setQuoiVisible] = useState(false);
  const [quoi, setQuoi] = useState(null);

  const [servicesVisible, setServicesVisible] = useState(false);
  const [services, setServices] = useState(null);

  



  // QUAND 
  function everyQuand() {
    setQuandVisible(false);
    setQuand(null);
  }

  //HEURE
  function everyHeure() {
    setHeureVisible(false);
    setHeure(null);
  }

  // QUOI
  var coupesTab = coupes.map((element, i) => {
    return(
      <Pressable key={i} style={[styles.button, styles.buttonOpen, styles.buttonZ]} onPress={() => closeQuoi(element)}>
        <Text style={styles.textStyle}>{element}</Text>
    </Pressable>
    )
  })
  
  function closeQuoi(element) {
    setQuoi(element)
    setQuoiVisible(false)
  }

  function everyQuoi() {
    setQuoiVisible(false);
    setQuoi(null);
  }

  // SERVICES

  var pictosTab = pictos.map((element, i) => {
    return(
      <Pressable key={i} style={[styles.button, styles.buttonOpen, styles.buttonZ]} onPress={() => closeServices(element)}>
        <FontAwesome name={element} size={15} color='black' style={styles.pad} />
      </Pressable>
    )
  })

  function closeServices(element) {
    setServices(element)
    setServicesVisible(false)
  }

  function everyServices() {
    setServicesVisible(false)
  }

  

  

  return (
    <View style={globalStyles.container}>
        <Text style={globalStyles.brand}>Filtres</Text>
        <View >

          <TouchableOpacity  onPress={() => setQuandVisible(true)}>
            <Text style={styles.title}>QUAND ?</Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Icon name='calendar' size={24} color="#4E342E" style={{margin: 5}}/>
              <Text style={globalStyles.paragraph}>{quand}</Text>
            </View>
            <Card.Divider></Card.Divider>
          </TouchableOpacity>

          <TouchableOpacity  onPress={() => setHeureVisible(true)}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Icon name='clock-o' size={24} color="#4E342E" style={{margin: 5}}/>
              <Text style={globalStyles.paragraph}>{heure}</Text>
            </View>
            <Card.Divider></Card.Divider>
          </TouchableOpacity>

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

          <TouchableOpacity onPress={() => setServicesVisible(true)}>
            <Text style={styles.title}>SERVICES ?</Text>
            <FontAwesome name={services} size={25} color='black' style={{padding: 5}} />
            <Card.Divider></Card.Divider>
          </TouchableOpacity>

          <Text style={styles.title}>PRIX ?</Text>
          <Text style={globalStyles.paragraph}>€€€</Text>
          <Text style={styles.title}>EXPERIENCES ?</Text>
          <Text style={globalStyles.paragraph}>BIEN ETRE</Text>
        </View>

        <Overlay isVisible={quandVisible}>
          <View style={{display: 'flex', alignItems: 'flex-end'}}>
              <EvilIcons name="close" size={24} color="black" onPress={() => everyQuand()} style={{margin: 5}}/>
            </View>
        </Overlay>

        <Overlay isVisible={heureVisible}>
          <View style={{display: 'flex', alignItems: 'flex-end'}}>
              <EvilIcons name="close" size={24} color="black" onPress={() => everyHeure()} style={{margin: 5}}/>
            </View>
        </Overlay>

        <Overlay isVisible={quoiVisible}>
            <View style={{display: 'flex', alignItems: 'flex-end'}}>
              <EvilIcons name="close" size={24} color="black" onPress={() => everyQuoi()} style={{margin: 5}}/>
            </View>
            {coupesTab}
        </Overlay>

        <Overlay isVisible={servicesVisible}>
            <View style={{display: 'flex', alignItems: 'flex-end'}}>
              <EvilIcons name="close" size={24} color="black" onPress={() => everyServices()} style={{margin: 5}}/>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              {pictosTab}
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
});