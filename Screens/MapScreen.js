import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Button from '../shared/Button';
import { Overlay } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';



function Map(props) {
  const [shopsList, setShopsList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [shopDetails, setShopDetails] = useState({});
  const [euros, setEuros] = useState([]);
  const [features, setFeatures] = useState([]);
  const [rating, setRating] = useState([]);
  const [url, setUrl] = useState('');
  const [latitude, setLatitude] = useState(47.902964);
  const [longitude, setLongitude] = useState(1.909251);
  const [latitudeDelta, setLatitudeDelta] = useState(10);
  const [longitudeDelta, setLongitudeDelta] = useState(10);

  useEffect(() => {
    setShopsList(props.shopsData);
 
    if (props.search.latitude != undefined && props.search.longitude != undefined) {
        setLatitude(props.search.latitude);
        setLongitude(props.search.longitude);
        setLatitudeDelta(0.12);
        setLongitudeDelta(0.09);
    }

  }, []);

  var overlay = (element) => {
    setVisible(true);
    setShopDetails(element);

    var priceTab = [];
    for (let y = 0; y < 3; y++) {
      var color = 'white';
      if (y < element.priceFork) {
        color = 'black';
      }
      priceTab.push(
        <FontAwesome key={y} name='euro' size={15} color={color} style={styles.pad} />
      );
    }
    setEuros(priceTab);

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
    setFeatures(pictoTab);

    var starsTab = [];
    for (let j = 0; j < 5; j++) {
      var color = 'black';
      if (j < element.rating) {
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
    setRating(starsTab);

    var image = element.shopImages[0];
    setUrl(image);
  };

  function navigation(shopDetails) {
    props.navigation.navigate('Shop');
    setVisible(false);
    props.saveChoosenOffer(shopDetails);
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 30,
          paddingBottom: 10,
          marginTop: 87,
        }}
      >
        <Button
          title='Filtrer'
          backgroundColor='#FFCD41'
          onPress={() => props.navigation.navigate('Filtres')}
        ></Button>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: longitudeDelta,
          longitudeDelta: latitudeDelta,
        }}
      >
        {props.search.latitude ? (
          <Marker
            coordinate={{
              latitude: props.search.latitude,
              longitude: props.search.longitude,
            }}
            title='votre adresse'
            pinColor='#AB4242'
          />
        ) : null}

        {shopsList.length > 0
          ? shopsList.map((element, i) => {
              return (
                <Marker
                  key={i}
                  coordinate={{
                    latitude: element.latitude,
                    longitude: element.longitude,
                  }}
                  pinColor='#4280AB'
                  onPress={() => overlay(element)}
                />
              );
            })
          : null}
      </MapView>
      <Overlay isVisible={visible}>
        <View>
        <View style={styles.card}>
          <View style={styles.text}>
            <View style={styles.div1}>
              <Text style={{ fontWeight: 'bold' }}>{shopDetails.shopName}</Text>
            </View>
            <Text style={styles.pad}>{shopDetails.shopAddress}</Text>
            <View style={styles.picto}>{euros}</View>
            <View style={styles.picto}>{features}</View>
            <View style={styles.picto}>{rating}</View>
          </View>
          <View style={styles.div2}>
            <Image source={{ uri: url }} style={styles.image}></Image>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <Button
            title='Choisir ce salon'
            color='white'
            backgroundColor='#4280AB'
            onPress={() => navigation(shopDetails)}
          />
          <Button
            title='Retour'
            color='white'
            backgroundColor='#AB4242'
            onPress={() => setVisible(false)}
          />
        </View>
        </View>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE082',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.85,
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
    saveChoosenOffer: function (shopDetails) {
      dispatch({
        type: 'selectOffer',
        shopDetails: shopDetails,
      });
    },
  };
}

function mapStateToProps(state) {
  return { shopsData: state.shopsData, search: state.search };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
