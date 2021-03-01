import React from 'react';
import {globalStyles} from '../styles/Global';
import Card from '../shared/Card'
import Button from '../shared/Button';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';



export default function List() {
  return (
    <View style={globalStyles.container}>
      <ScrollView>
        <Text>List</Text>

        <View style={styles.card}>

          <View style={styles.text}>
            <View style={styles.div1}>
              <Text>NOM COIFFEUR</Text>
              <FontAwesome name="heart-o" size={15} color="black" />
            </View>
            <Text style={styles.pad}>Adresse</Text>
            <MaterialIcons name="euro" size={15} color="black" style={styles.pad} />
            <FontAwesome name="coffee" size={15} color="black" style={styles.pad}/>
            <AntDesign name="staro" size={15} color="black" style={styles.pad} />

          </View>
          <View style={styles.div2}>
            <Image source={require('../assets/picture-2.jpg')} style={styles.image}></Image>
          </View>    

        </View> 

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
  pad: {padding: 4},
  text: {width: '60%', padding: 10},
  image: {height: 140, width: 140}

});
