import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';


const PrimaryButton = ({ title, onPress, color, backgroundColor, width }) => {
  // let backgroundColor = '#4280AB';
  // let test = { ...styles.button, backgroundColor };
  // let width = 150;
  // console.log(test);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ ...styles.button, backgroundColor, width }}>
        <Text style={{ ...styles.buttonTitle, color }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 10, // Android    
   },
  buttonTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PrimaryButton;
