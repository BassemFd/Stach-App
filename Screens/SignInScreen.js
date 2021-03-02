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
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const handleSubmitSignin = async () => {
    const data = await fetch(`${IP_ADDRESS}/users/signIn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    });

    const body = await data.json();

    if (!body.result) {
      setEmailError(body.emailNotFound);
      setPasswordError(body.invalidPassword);
    }
    switch (body.error) {
      case '"email" is not allowed to be empty':
        setEmailError("L'email ne doit pas être vide");
        break;
      case '"email" must be a valid email':
        setEmailError("L'email doit être une adresse e-mail valide");
        break;
      case '"email" length must be at least 6 characters long':
        setEmailError(
          "La longueur de l'email doit comporter au moins 6 caractères"
        );
        break;
      case '"password" length must be at least 6 characters long':
        setPasswordError(
          'La longueur du mot de passe doit comporter au moins 6 caractères'
        );
        break;
      case '"password" is not allowed to be empty':
        setPasswordError('Le mot de passe ne doit pas être vide ');
        break;

      default:
        break;
    }

    // if (body.result === true) {
    //   onAddToken(body.tokenSignIn);
    //   setUserExists(true);
    // } else {
    //   setErrorsSignin(body.error);
    // }
  };

  console.log(emailError, 'res');
  console.log(passwordError, 'er');

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
          {emailError !== null && (
            <Text style={globalStyles.errorText}>{emailError}</Text>
          )}
          <TextInput
            style={globalStyles.input}
            secureTextEntry={true}
            placeholder='Password'
            onChangeText={(value) => setSignInPassword(value)}
          />
          {passwordError !== null && (
            <Text style={globalStyles.errorText}>{passwordError}</Text>
          )}
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
