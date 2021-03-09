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
import { IP_ADDRESS, IP_ADDRESS_HOME } from '@env';
import { connect } from 'react-redux';

function SignUp({ navigation, onAddToken, appointment }) {
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhoneNumber, setSignUpPhoneNumber] = useState('');
  const [signUpFirstName, setSignUpFirstName] = useState('');
  const [signUpLastName, setSignUpLastName] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setLastNameError] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const [inputError, setInputError] = useState(null);

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
      if (appointment.date) {
        navigation.navigate('Appointment');
      } else {
        navigation.navigate('Home');
      }
    }

    if (body.error) {
      setInputError("Un des champs n'est pas valide");
    } else {
      setInputError(null);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={globalStyles.container}
      >
        <ScrollView>
        <Text style={globalStyles.brand}></Text>
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
            placeholder='Password'
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
            placeholder='Email'
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
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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

function mapStateToProps(state) {
  return { appointment: state.details };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
