import { IP_ADDRESS } from '../urlBackend';
import React, { useState, useEffect } from 'react';
import { globalStyles } from '../styles/Global';
import ButtonYaya from '../shared/Button';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';

function List(props) {

  const [shopsData, setShopsData] = useState([]);
  const [orderPriceSort, setOrderPriceSort] = useState(false);
  const [orderServicesSort, setOrderServicesSort] = useState(false);

  // var coiffeurs = [
  //   {
  //   shopName: 'Coup Tif',
  //   shopImages: ['https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260', 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'],
  //   shopAddress: '72 Boulevard Pereire, 75017, Paris',
  //   shopPhone: '0100000000',
  //   shopMail: 'couptif@gmail.com',
  //   shopDescription: 'lorem lorem lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem lorem',
  //   shopFeatures: ['wheelchair-alt', 'glass', 'gamepad'],
  //   comments: [],
  //   shopEmployees: ['Fred', 'Dany'],
  //   offers: ['Coupe Homme', 'Coupe Femme'],
  //   packages: ['Playstation'],
  //   schedule: [],
  //   atHome: false,
  //   appointments: [],
  //   priceFork: 1,
  //   rating: 4.2,
  //   },
  //   {
  //     shopName: 'Coiff',
  //     shopImages: ['https://images.pexels.com/photos/6171/hairstyle-hair-wedding-bride.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'],
  //     shopAddress: '23 rue Legendre, 75017, Paris',
  //     shopPhone: '0200000000',
  //     shopMail: 'coiff@gmail.com',
  //     shopDescription: 'lorem lorem lorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem loremlorem lorem',
  //     shopFeatures: ['coffee', 'leaf', 'paw'],
  //     comments: [],
  //     shopEmployees: ['Philippe', 'Emma'],
  //     offers: ['Coupe Homme', 'Coupe Femme', 'Coupe Enfant'],
  //     packages: ['à deux'],
  //     schedule: [],
  //     atHome: true,
  //     appointments: [],
  //     priceFork: 2,
  //     rating: 2.1,
  //     },
  // ]

  
  useEffect(() => {
    // Fetch request from search to BDD
    async function getShops() {
      let shopsFetch = await fetch(`${IP_ADDRESS}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: props.search }),
      });
      let body = await shopsFetch.json();

      setShopsData(body.filteredDistanceShopsList);
      var shopsDataCopy = body.filteredDistanceShopsList;
      props.saveShopsdata(shopsDataCopy);
    }

    getShops();

  }, [props.search]);



  function navigation(shopDetails) {
    props.navigation.navigate('Shop');
    props.saveChosenOffer(shopDetails);
  }

  function sortByPrice() {
    setOrderPriceSort(!orderPriceSort);
    var shopListCopy = [...shopsData];
    if (orderPriceSort === false) {
      var sortByPrice = shopListCopy.sort((a, b) => a.priceFork > b.priceFork);
    } else {
      var sortByPrice = shopListCopy.sort((a, b) => a.priceFork < b.priceFork);
    }
    setShopsData(sortByPrice);
  }

  function sortByNote() {
    setOrderServicesSort(!orderServicesSort);
    var shopListCopy = [...shopsData];
    if (orderServicesSort === false) {
      var sortByNote = shopListCopy.sort((a, b) => a.rating < b.rating);
    } else {
      var sortByNote = shopListCopy.sort((a, b) => a.rating > b.rating);
    }
    setShopsData(sortByNote);
  }

  return (
    <View style={globalStyles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingBottom: 10,
        }}
      >
        <ButtonYaya
          title='Filtrer'
          backgroundColor='#FFCD41'
          onPress={() => props.navigation.navigate('Filtres')}
        ></ButtonYaya>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <Button
          title='Trier par prix'
          buttonStyle={{
            backgroundColor: "#4280AB"
         }}
          
          onPress={() => sortByPrice()}
        ></Button>
        <Button
          title='Trier par note'
          buttonStyle={{
            backgroundColor: "#4280AB"
         }}
          onPress={() => sortByNote()}
        ></Button>
      </View>
      <ScrollView>
        {shopsData.length > 0
          ? shopsData.map((element, i) => {
              var priceTab = [];
              for (let y = 0; y < 3; y++) {
                var color = 'white';
                if (y < element.priceFork) {
                  color = 'black';
                }
                priceTab.push(
                  <FontAwesome
                    key={y}
                    name='euro'
                    size={15}
                    color={color}
                    style={styles.pad}
                  />
                );
              }

              var pictoTab = [];
              for (let z = 0; z < element.shopFeatures.length; z++) {
                pictoTab.push(
                  <FontAwesome
                    key={z}
                    name={element.shopFeatures[z]}
                    size={15}
                    color='black'
                    style={styles.pad}
                  />
                );
              }

              var starsTab = [];
              var flooredStarRating = Math.round(element.rating);
              for (let j = 0; j < 5; j++) {
                var color = 'black';
                if (j < flooredStarRating) {
                  color = 'gold';
                }
                starsTab.push(
                  <FontAwesome
                    key={j}
                    style={{ marginRight: 5 }}
                    name='star'
                    size={24}
                    color={color}
                  />
                );
              }

              return (
                <TouchableOpacity key={i} onPress={() => navigation(element)}>
                  <View
                    key={i}
                    style={styles.card}
                    onPress={() => navigation(element)}
                  >
                    <View style={styles.text}>
                      <View style={styles.div1}>
                        <Text style={{ fontWeight: 'bold' }}>
                          {element.shopName}
                        </Text>
                      </View>
                      <Text style={styles.pad}>{element.shopAddress}</Text>
                      <View style={styles.picto}>{priceTab}</View>
                      <View style={styles.picto}>{pictoTab}</View>
                      <View style={styles.picto}>{starsTab}</View>
                    </View>
                    <View style={styles.div2}>
                      <Image
                        source={{ uri: element.shopImages[0] }}
                        style={styles.image}
                      ></Image>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          : null}
      </ScrollView>
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
  div1: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  div2: { width: '40%' },
  card: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 5,
  },
  pad: { padding: 2 },
  text: { width: '60%', padding: 10 },
  image: { height: 145, width: 140 },
  picto: { display: 'flex', flexDirection: 'row' },
});

function mapDispatchToProps(dispatch) {
  return {
    saveChosenOffer: function (shopDetails) {
      dispatch({
        type: 'selectOffer',
        shopDetails: shopDetails,
      });
    },
    saveShopsdata: function (shopsData) {
      dispatch({
        type: 'saveShopsData',
        shopsData: shopsData,
      });
    },
  };
}

function mapStateToProps(state) {
  return { search: state.search };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
