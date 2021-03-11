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
import { IP_ADDRESS } from '../urlBackend';
import { connect } from 'react-redux';

import { StackActions } from '@react-navigation/native';

function SignIn({ navigation, onAddToken, token }) {
  
  if (token !== '') {
    const popAction = StackActions.pop(1);
    navigation.dispatch(popAction);
  }

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  const popAction = StackActions.pop(0);

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
    } else {
      onAddToken(body.token);
      navigation.dispatch(popAction);
    }

    switch (body.error) {
      case '"email" is not allowed to be empty':
        setEmailError("L'e-mail ne doit pas être vide");
        break;
      case '"email" must be a valid email':
        setEmailError("L'e-mail doit être une adresse e-mail valide");
        break;
      case '"email" length must be at least 6 characters long':
        setEmailError(
          "La longueur de l'e-mail doit comporter au moins 6 caractères"
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
  };

  return (
    <ScrollView style={globalStyles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
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

          <View style={globalStyles.textCredentialsInput}>
            <Text>...ou avec tes identifiants</Text>
          </View>
          <TextInput
            style={globalStyles.input}
            placeholder='E-mail'
            onChangeText={(value) => setSignInEmail(value)}
          />
          {emailError !== null && (
            <Text style={globalStyles.errorText}>{emailError}</Text>
          )}
          <TextInput
            style={globalStyles.input}
            secureTextEntry={true}
            placeholder='Mot de passe'
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
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mtButton: {
    marginTop: 10,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    onAddToken: (token) => {
      dispatch({ type: 'ADD_TOKEN', token });
    },
  };
};

const mapStateToProps = (state) => {
  return { token: state.token };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
