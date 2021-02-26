import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function Contact() {
  return (
    <View style={styles.container}>
        <Text>Contact</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});