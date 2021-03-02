// https://blog.logrocket.com/using-react-native-to-implement-a-carousel/


import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH) * 0.8

const CarouselCardItem = ({ item, index }) => {
  return (
    <View  key={index}>
      <Image
        source={item.imgUrl}
        style={styles.image}
      />
    
    </View>
  )
}
const styles = StyleSheet.create({
 
  image: {
    width: ITEM_WIDTH,
    height: 300,
  },
})

export default CarouselCardItem;