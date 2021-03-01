import React from 'react';
import {globalStyles} from '../styles/Global';
import Card from '../shared/Card'
import Button from '../shared/Button';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';



export default function List() {
  return (
    <View style={globalStyles.container}>
      <ScrollView>
        <Text>List</Text>

        <View style={{ display: 'flex', flexDirection: 'row', backgroundColor: 'white' }}>

          <View style={{width: '70%', padding: 5}}>
            <Text>NOM COIFFEUR</Text>
            <Text>Adresse</Text>
            <MaterialIcons name="euro" size={15} color="black" />

          </View>
          <View style={{width: '30%'}}>
            <Image source={require('../assets/picture-2.jpg')} style={{height: 100, width: 100}}></Image>
          </View>    

        </View> 

      </ScrollView>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
