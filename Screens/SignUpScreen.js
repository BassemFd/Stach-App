import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { globalStyles } from '../styles/Global';
import { FontAwesome } from '@expo/vector-icons';
import CustomButton from '../shared/Button';
import { IP_ADDRESS } from '@env';

export default function SignUp() {
  console.log(IP_ADDRESS);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.brand}>'Stach</Text>
        <View style={globalStyles.hr}></View>
        <View style={globalStyles.socialNetwork}>
          <View style={globalStyles.socialNetworkContent}>
            <Text>Inscris toi avec Gmail</Text>
            <Text>
              <FontAwesome
                name='google-plus-square'
                size={24}
                color='#DD4B39'
              />
            </Text>
          </View>
        </View>
        <View style={globalStyles.socialNetwork}>
          <View style={globalStyles.socialNetworkContent}>
            <Text>Inscris toi avec Facebook</Text>
            <Text>
              <FontAwesome name='facebook-square' size={24} color='#4267B2' />
            </Text>
          </View>
        </View>
        <ScrollView>
          <View style={globalStyles.textCredentialsInput}>
            <Text>...ou avec tes identifiants</Text>
          </View>
          <TextInput style={globalStyles.input} placeholder='Prénom' />
          {/* <Text style={globalStyles.errorText}>Error</Text> */}
          <TextInput style={globalStyles.input} placeholder='Nom' />
          <Text style={globalStyles.errorText}>Error</Text>
          <TextInput
            style={globalStyles.input}
            secureTextEntry={true}
            placeholder='Password'
          />
          {/* <Text style={globalStyles.errorText}>Error</Text> */}
          <TextInput
            style={globalStyles.input}
            keyboardType='numeric'
            placeholder='Téléphone'
          />
          {/* <Text style={globalStyles.errorText}>Error</Text> */}
          <TextInput style={globalStyles.input} placeholder='Email' />
          {/* <Text style={globalStyles.errorText}>Error</Text> */}
          <View style={styles.mtButton}>
            <CustomButton
              title='Valider'
              color='#fff'
              backgroundColor='#4280AB'
            />
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mtButton: {
    marginTop: 10,
  },
});
