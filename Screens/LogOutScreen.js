import { useLinkProps, CommonActions  } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { StackActions } from '@react-navigation/native';



function LogOutScreen(props) {
  return (
    <View style={styles.container}>
        <Text style={{fontSize: 24, margin: 20, textAlign:'center', marginBottom:40}}>Voulez-vous vraiment vous déconnecter ?</Text>
        <Button  title="Se deconnecter" onPress={() =>{
            props.onRemoveToken();
            props.navigation.dispatch(StackActions.popToTop());
            props.navigation.navigate('Home')}}/>
        <Button color="#f194ff" title="Retour" onPress={() => props.navigation.goBack()}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: '#FFE082',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
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