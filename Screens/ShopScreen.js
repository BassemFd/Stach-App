import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles }from '../styles/Global';
import { Card, Button, Icon, TextInput } from 'react-native-elements';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import MapView from 'react-native-maps';



export default function Shop() {

  const [selectedCoiffeur, setSelectedCoiffeur] = useState("choixCoiffeur");
  const [selectedPrestation, setSelectedPrestation] = useState("choixPrestation");
  const [selectedOptions, setSelectedOptions] = useState("choixOptions");

// const hairdresser = {

// }



  return (
    <View style={styles.card}>
      <View >
        <Card >

        <Card.Image source={require('../assets/HairShop-1.jpg')}> 
        </Card.Image>
        <Card.Title style={globalStyles.titleText}>HairDresser Name</Card.Title>

        <Text style={{marginBottom: 10}}>
          Description and history and more details about the hairdresser 
        </Text>
        <Card.Divider/>

        <View style={styles.containerMap}>

          <View>

            <Text >
              67 rue Dulong
            </Text>

            <Text style={{marginBottom: 10}}>
              75017, Paris
            </Text>
          
            <View style={styles.icons}>
            <FontAwesome style={{marginRight: 5}} name="euro" size={24} color="black" />
            <FontAwesome style={{marginRight: 5}} name="euro" size={24} color="grey" />
            <FontAwesome style={{marginRight: 5}} name="euro" size={24} color="grey" />
            </View>
                  
            <View style={styles.icons2}>
            <FontAwesome5 style={{marginRight: 5}} name="dog" size={24} color="black" />
            <FontAwesome style={{marginRight: 5}} name="coffee" size={24} color="black" />
            <FontAwesome style={{marginRight: 5}} name="wheelchair-alt" size={24} color="black" />
            <FontAwesome style={{marginRight: 5}} name="glass" size={24} color="black" />
            <FontAwesome style={{marginRight: 5}} name="gamepad" size={24} color="black" />
            </View>

            <View style={styles.icons2}>
            <FontAwesome style={{marginRight: 5}} name="star" size={24} color="gold" />
            <FontAwesome style={{marginRight: 5}} name="star" size={24} color="gold" />
            <FontAwesome style={{marginRight: 5}} name="star" size={24} color="gold" />
            <FontAwesome style={{marginRight: 5}} name="star" size={24} color="black" />
            <FontAwesome style={{marginRight: 5}} name="star" size={24} color="black" />
            <Text>(4.5)</Text>
            </View>

            

          </View>

            <View style={styles.mapPosition}>
            <MapView mapType={'standard'} showsTraffic ={false} style={styles.map}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
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
    </View>
  );
}

const styles = StyleSheet.create({
  icons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 20,
  },
  icons2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 20,
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