
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';



export default function TemporaryPage(props) {
  return (
    <View style={styles.container}>
        <Text style={{fontSize: 24, margin: 20}}>TemporaryPage</Text>
        <Button  title="Home" onPress={() => props.navigation.navigate('Home')}/>
        <Button color="#f194ff" title="Liste et Map" onPress={() => props.navigation.navigate('ButtonTabShop')}/>
        <Button title="Shop" onPress={() => props.navigation.navigate('Shop')}/>
        <Button color="#f194ff" title="SignIn et SignUp" onPress={() => props.navigation.navigate('ButtonTabSign')}/>
        <Button title="Appointment" onPress={() => props.navigation.navigate('Appointment')}/>
        <Button color="#f194ff" title="Details" onPress={() => props.navigation.navigate('Details')}/>
        <Button title="Profile" onPress={() => props.navigation.navigate('Profile')}/>
        <Button color="#f194ff" title="Contact" onPress={() => props.navigation.navigate('Contact')}/>
        <Button title="Filtres" onPress={() => props.navigation.navigate('Filtres')}/>
        <Button color="#f194ff" title="Favorites" onPress={() => props.navigation.navigate('Favorites')}/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE082',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

