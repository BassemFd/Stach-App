import React, {useState} from 'react';
import {globalStyles} from '../styles/Global';
import Card from '../shared/Card'
import Button from '../shared/Button';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';




export default function List() {

  // const [priceTab, setpriceTab] = useState([]);
  const [featuresTab, setFeaturesTab] = useState([]);


  var coiffeurs = [
    {
    shopName: 'Coup Tif',
    shopImages: [require('../assets/coiffeur1.jpeg'), require('../assets/coiffeur2.jpeg')],
    shopAddress: '72 Boulevard Pereire, 75017, Paris',
    shopPhone: '0100000000',
    shopMail: 'couptif@gmail.com',
    shopDescription: 'lorem lorem lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem lorem',
    shopFeatures: ['wheelchair-alt', 'glass', 'gamepad'],
    comments: [],
    shopEmployees: ['Fred', 'Dany'],
    offers: ['coupe homme', 'coupe femme'], 
    packages: ['playstation'],
    schedule: [],
    atHome: false,
    appointments: [],
    priceFork: 1,
    rating: 5,
    },
    {
      shopName: 'Coiff',
      shopImages: [require('../assets/coiffeur3.jpeg'), require('../assets/coiffeur4.jpeg')],
      shopAddress: '23 rue Legendre, 75017, Paris',
      shopPhone: '0200000000',
      shopMail: 'coiff@gmail.com',
      shopDescription: 'lorem lorem lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem lorem',
      shopFeatures: ['coffee', 'leaf', 'paw'],
      comments: [],
      shopEmployees: ['Philippe', 'Emma'],
      offers: ['coupe homme', 'coupe femme', 'coupe enfant'], 
      packages: ['à deux'],
      schedule: [],
      atHome: true,
      appointments: [],
      priceFork: 2,
      rating: 7,
      }
  ]  



  return (
    <View style={globalStyles.container}>
      <ScrollView>
        
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingTop: 30, paddingBottom: 10}}>
          <Button title="Filtrer" backgroundColor="#FFCD41" ></Button>
          <Button title="Trier" backgroundColor="#FFCD41"></Button>
        </View>

        {coiffeurs.length > 0 ?
          coiffeurs.map((element, i) => {
            var priceTab = [];
            for (let y=0; y<3; y++) {
              var color = 'white'
              if (y<element.priceFork) {
                color='black'
              }
              priceTab.push(<FontAwesome name="euro" size={15} color={color} style={styles.pad} />)
            }
            
            var pictoTab = [];
            for (let z=0; z<element.shopFeatures.length; z++) {
              pictoTab.push(<FontAwesome name={element.shopFeatures[z]} size={15} color="black" style={styles.pad}/>)
            }
      

            return (
              <View key= {i} style={styles.card}>
                <View style={styles.text}>
                  <View style={styles.div1}>
                    <Text style={{fontWeight: 'bold'}}>{element.shopName}</Text>
                    <FontAwesome name="heart-o" size={15} color="black" />
                  </View>
                  <Text style={styles.pad}>{element.shopAddress}</Text>
                  <View style={styles.picto}>
                    {priceTab}
                  </View>
                  <View style={styles.picto}>{pictoTab}</View>
                  
                  <FontAwesome style={{marginRight: 5}} name="star" size={24} color="gold" />
                </View>
                <View style={styles.div2}>
                  <Image source={element.shopImages[0]} style={styles.image}></Image>
                </View>    
              </View> 
            )
          })
        : null }

      </ScrollView>
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
  div1: {display: 'flex', flexDirection: 'row', justifyContent: 'space-between'},
  div2: {width: '40%'},
  card: { 
    display: 'flex', 
    flexDirection: 'row', 
    backgroundColor: 'white' 
  },
  pad: {padding: 2},
  text: {width: '60%', padding: 10},
  image: {height: 140, width: 140},
  picto: {display: 'flex', flexDirection: 'row'},

});
