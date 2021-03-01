import React, { useState } from 'react';
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
import { IP_ADDRESS, IP_ADDRESS_HOME } from '@env';

export default function SignIn() {
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const handleSubmitSignin = async () => {
    console.log(IP_ADDRESS_HOME, signInEmail, signInPassword);
    // try {
    // const data = fetch(`${IP_ADDRESS_HOME}/users/signIn`, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email: signInEmail,
    //     password: signInPassword,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log(responseJson);
    //     return responseJson;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    // console.log(JSON.parse(data), 'ss');
    // } catch (error) {
    //   console.log(error);
    // }

    // if (body.result === true) {
    //   onAddToken(body.tokenSignIn);
    //   setUserExists(true);
    // } else {
    //   setErrorsSignin(body.error);
    // }
  };

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
          <TextInput
            style={globalStyles.input}
            placeholder='Email'
            onChangeText={(value) => setSignInEmail(value)}
          />
          {/* <Text style={globalStyles.errorText}>Error</Text> */}
          <TextInput
            style={globalStyles.input}
            secureTextEntry={true}
            placeholder='Password'
            onChangeText={(value) => setSignInPassword(value)}
          />
          <Text style={globalStyles.errorText}>Error</Text>
          <View style={styles.mtButton}>
            <CustomButton
              title='Valider'
              color='#fff'
              backgroundColor='#4280AB'
              onPress={() => handleSubmitSignin()}
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
