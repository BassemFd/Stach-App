// https://blog.logrocket.com/using-react-native-to-implement-a-carousel/


import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH)

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
    width: 300,
    height: 300,
  },
})

export default CarouselCardItem;