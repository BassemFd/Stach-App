import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon, Badge } from 'react-native-elements'


export default function List() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>List</Text>
        <Card >
          <Card.Image source={require('../assets/picture-2.jpg')}></Card.Image>
                                 
        </Card> 
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
});
