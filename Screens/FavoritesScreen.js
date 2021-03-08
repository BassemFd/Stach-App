import React, {useState, useEffect} from 'react';
import ButtonYaya from '../shared/Button';

import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {globalStyles} from '../styles/Global';

import { connect } from 'react-redux';
import {IP_ADDRESS} from '@env';



 const FavoritesScreen = (props) => {

    const [favoriteTab, setFavoriteTab] = useState({})

    useEffect( () => {
        async function getResponse(){
          if(props.token){
              let shopsFetch = await fetch(`${IP_ADDRESS}/favorites?token=${props.token}`);
                let body = await shopsFetch.json();
                
                setFavoriteTab(body.favoriteShops)
                // for(let i = 0; i < body.favoriteShops.length; i++){
                 
                // }
          }
        }
        getResponse()
          return () => {
            console.log("This will be logged on unmount");
            
          }
        
        }, [])


        function navigation(shopDetails) {
          
           props.saveChosenOffer(shopDetails)
           props.navigation.navigate('Shop');
        console.log("SHOPDETAILS", shopDetails)
          }

console.log("FAVORITE TAB", favoriteTab)

    return (
        <View style={globalStyles.container}>
            <ScrollView>
        

        {favoriteTab.length > 0 ?
          favoriteTab.map((element, i) => {
            var priceTab = [];
            for (let y=0; y<3; y++) {
              var color = 'white'
              if (y<element.priceFork) {
                color='black'
              }
              priceTab.push(<FontAwesome key={y} name="euro" size={15} color={color} style={styles.pad} />)
            }
            
            var pictoTab = [];
            for (let z=0; z<element.shopFeatures.length; z++) {
              pictoTab.push(<FontAwesome key={z} name={element.shopFeatures[z]} size={15} color="black" style={styles.pad}/>)
            }

            var starsTab = [];
            var flooredStarRating = Math.round(element.rating);
            for (let j=0; j<5; j++) {
              var color = 'black';
              if (j<flooredStarRating) {
                color = 'gold'
              }
              starsTab.push(<FontAwesome key={j} style={{marginRight: 5}} name="star" size={24} color={color} />)
            }

            
            return (

              <TouchableOpacity key={i} onPress={()=>navigation(element)}>
                <View key={i} style={styles.card} onPress={()=>navigation(element)}>
                  <View style={styles.text}>
                    <View style={styles.div1}>
                      <Text style={{fontWeight: 'bold'}}>{element.shopName}</Text>
                      <FontAwesome name="heart-o" size={15} color="black" />
                    </View>
                    <Text style={styles.pad}>{element.shopAddress}</Text>
                    <View style={styles.picto}>
                      {priceTab}
                    </View>
                    <View style={styles.picto}>{pictoTab}</View>
                    <View style={styles.picto}>{starsTab}</View>
                  </View>
                  <View style={styles.div2}>
                    <Image 
                    source={{uri: element.shopImages[0]}}
                    style={styles.image}></Image>
                  </View>    
                </View> 
              </TouchableOpacity>

            )
          })
        : null }
    </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    div1: {display: 'flex', flexDirection: 'row', justifyContent: 'space-between'},
    div2: {width: '40%'},
    card: { 
      display: 'flex', 
      flexDirection: 'row', 
      backgroundColor: 'white',
      marginBottom: 5,
    },
    pad: {padding: 2},
    text: {width: '60%', padding: 10},
    image: {height: 145, width: 140},
    picto: {display: 'flex', flexDirection: 'row'},
  
  });




  function mapStateToProps(state) {
    return {
      favorite: state.favorite,
      token: state.token,
    };
  }

  function mapDispatchToProps(dispatch){
    return {
      saveChosenOffer: function(shopDetails){
        dispatch({
          type: 'selectOffer',
          shopDetails: shopDetails,
        })
      },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen)


