import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { StackActions } from '@react-navigation/native';


function LogOutScreen(props) {
  return (
    <View style={styles.container}>
        <Text style={{fontSize: 24, margin: 20, textAlign:'center', marginBottom:40, fontFamily: "graduate-regular"}}>Voulez-vous vraiment vous déconnecter ?</Text>
       
        <Pressable style={styles.buttonD} onPress={() =>{
            props.onRemoveToken();
            props.navigation.dispatch(StackActions.popToTop());
            props.navigation.navigate('Home')}}>
            <Text style={styles.textD}>Se deconnecter</Text></Pressable>
        <Pressable style={[styles.buttonD, {backgroundColor: '#AB4242'}]}  onPress={() => props.navigation.goBack()}><Text style={styles.textD}>Retour</Text></Pressable>
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
  buttonD: {
    backgroundColor: '#4280AB',
   borderRadius: 20,
   padding: 20,
   marginBottom: 20
  },
  textD:{
    color: 'white',
    fontFamily: 'graduate-regular',
    fontSize: 20
  }
});

const mapDispatchToProps = (dispatch) => {
    return {
      onRemoveToken: () => {
        dispatch({ type: 'REMOVE_TOKEN'});
      },
    };
  };
const mapStateToProps = (state) => {
  return { token: state.token };
};
export default connect(mapStateToProps, mapDispatchToProps)(LogOutScreen);