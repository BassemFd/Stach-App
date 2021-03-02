import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';


export default function TemporaryPage(props) {
  return (
    <View style={styles.container}>
        <Text>TemporaryPage</Text>
        <Button title="Home" onPress={() => props.navigation.navigate('Home')}/>
        <Button title="Liste et Map" onPress={() => props.navigation.navigate('ButtonTabShop')}/>
        <Button title="Shop" onPress={() => props.navigation.navigate('Shop')}/>
        <Button title="SignIn et SignUp" onPress={() => props.navigation.navigate('ButtonTabSign')}/>
        <Button title="Appointment" onPress={() => props.navigation.navigate('Appointment')}/>
        <Button title="Details" onPress={() => props.navigation.navigate('Details')}/>
        <Button title="Profile" onPress={() => props.navigation.navigate('Profile')}/>
        <Button title="Contact" onPress={() => props.navigation.navigate('Contact')}/>
        <Button title="Filtres" onPress={() => props.navigation.navigate('Filtres')}/>
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