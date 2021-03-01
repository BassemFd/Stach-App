import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../styles/Global';
import CustomBadge from '../shared/Badge';

export default function Profile() {
  let points = 562;
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.brand}>'Stach</Text>
      <Text style={styles.userName}>John Doe</Text>
      <View style={styles.parentBadge}>
        <CustomBadge
          title={`${points} Points`}
          color='#fff'
          backgroundColor='#FFCD41'
          width={130}
        />
      </View>
      <View style={globalStyles.hr}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  userName: {
    textAlign: 'center',
    fontSize: 26,
  },
  parentBadge: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
