import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { globalStyles } from '../styles/Global';
import { FontAwesome } from '@expo/vector-icons';
import CustomButton from '../shared/Button';
import { IP_ADDRESS } from '../urlBackend';
import { connect } from 'react-redux';

import { StackActions } from '@react-navigation/native';

function SignUp({ navigation, onAddToken, token }) {
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhoneNumber, setSignUpPhoneNumber] = useState('');
  const [signUpFirstName, setSignUpFirstName] = useState('');
  const [signUpLastName, setSignUpLastName] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const [passwordError, setPasswordError] = useState(null);       //pas eu le temps de traiter, erreur plus spécifique sur chaque input
  const [emailError, setEmailError] = useState(null);
  const [firstNameError, setFirstNameError] = useState(null);     //pas eu le temps de traiter, erreur plus spécifique sur chaque input
  const [lastNameError, setLastNameError] = useState(null);       //pas eu le temps de traiter, erreur plus spécifique sur chaque input
  const [phoneNumberError, setPhoneNumberError] = useState(null); //pas eu le temps de traiter, erreur plus spécifique sur chaque input
  const [inputError, setInputError] = useState(null);


  //double sécurité au cas ou l'user connecté arrive sur cette page
  if (token !== '') {
    const popAction = StackActions.pop(0);
    navigation.dispatch(popAction);
  }

  const popAction = StackActions.pop(0);
  

  const handleSubmitSignin = async () => {
    const data = await fetch(`${IP_ADDRESS}/users/signUp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        phoneNumber: signUpPhoneNumber,
        email: signUpEmail,
        password: signUpPassword,
      }),
    });

    const body = await data.json();

    if (!body.result) {
      setEmailError(body.emaiExist);
      setPasswordError(body.invalidPassword);
    } else {
      onAddToken(body.token);
      navigation.dispatch(popAction);
    }

    if (body.error) {
      setInputError("Un des champs n'est pas valide");
    } else {
      setInputError(null);
    }
  };

  return (
    <ScrollView style={globalStyles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
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
            placeholder='Prénom'
            onChangeText={(value) => setSignUpFirstName(value)}
          />
          <TextInput
            style={globalStyles.input}
            placeholder='Nom'
            onChangeText={(value) => setSignUpLastName(value)}
          />
          <TextInput
            style={globalStyles.input}
            secureTextEntry={true}
            placeholder='Mot de passe'
            onChangeText={(value) => setSignUpPassword(value)}
          />
          <TextInput
            style={globalStyles.input}
            keyboardType='numeric'
            placeholder='Téléphone'
            onChangeText={(value) => setSignUpPhoneNumber(value)}
          />
          <TextInput
            style={globalStyles.input}
            placeholder='E-mail'
            onChangeText={(value) => setSignUpEmail(value)}
          />
          {emailError !== null && (
            <Text style={globalStyles.errorText}>{emailError}</Text>
          )}
          {inputError !== null && (
            <Text style={globalStyles.errorText}>{inputError}</Text>
          )}
          <View style={styles.mtButton}>
            <CustomButton
              title='Valider'
              color='#fff'
              backgroundColor='#4280AB'
              onPress={() => handleSubmitSignin()}
            />
          </View>
        </KeyboardAvoidingView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
