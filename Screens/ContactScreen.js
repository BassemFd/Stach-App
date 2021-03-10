import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View, Linking, ScrollView } from 'react-native';
import { globalStyles } from '../styles/Global';
import CustomButton from '../shared/Button';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from '../shared/cardCarousel';



export default function Contact(props) {

  const isCarousel = useRef(null)
  const [index, setIndex] = useState(0)

  //* Handling data for Carousel, using reducer
  var imageUrl = ["https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260", "https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"]
  var data = [];
  for (let i= 0; i<imageUrl.length; i++) {
    data.push({imgUrl: {uri: imageUrl[i]}})
  }

  return (
    
    <View style={styles.container}>
      <ScrollView>
      <View>
      <Text style={globalStyles.brand}></Text>
      <View style={{marginTop:10, marginBottom:50, padding:50, alignItems:'center'}}>

        <Text style={{marginBottom:60}}>Une équipe de passionnés à votre écoute jour et nuit pour une coiffure sereine, pour toute question, si vous ne savez pas coiffeur alors envoyez nous un e-mail</Text>
        
        <CustomButton

        title="CONTACTEZ-NOUS"
        onPress={() => Linking.openURL('mailto:contact@stach.com')}
        backgroundColor='white'
        
        /> 

        </View>
        </View>
        <View >
        <Carousel
        layout="stack"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
        
        />
        </View>
              <Pagination
                dotsLength={data.length}
                activeDotIndex={index}
                carouselRef={isCarousel}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.92)'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
            />
      </ScrollView>          
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
});