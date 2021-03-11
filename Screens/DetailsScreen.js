import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { globalStyles } from '../styles/Global';
import Button from '../shared/Button';
import { EvilIcons } from '@expo/vector-icons';
import { Overlay, Card } from 'react-native-elements';
import {IP_ADDRESS} from '../urlBackend';


function Details(props) {  

  const gender  = ['un homme', 'une femme'];

  const [errorText, setErrorText] = useState('');

  const [genderChosen, setGenderChosen] = useState(null);
  const [genderVisible, setGenderVisible] = useState(false);
  

  const [lengthVisible, setLengthVisible] = useState(false);
  const [length, setLength] = useState(null);

  const [typeVisible, setTypeVisible] = useState(false);
  const [type, setType] = useState(null);

  const [hairCutVisible, setHairCutVisible] = useState(false);
  const [hairCut, setHairCut] = useState(null);

  const [validationVisible, setValidationVisible] = useState(false);

    
  useEffect(() => {

    setGenderChosen(props.communication.user.gender);
    setLength(props.communication.user.hairLength);
    setType(props.communication.user.hairType);
    setHairCut(props.communication.user.hairCut);
  }, []);



  //GENDER
  var genderTab = gender.map((element, i) => {
    return(
      <Pressable key={i} style={[styles.button, styles.buttonOpen, styles.buttonZ]} onPress={() => chosenGender(element)}>
        <Text style={styles.textStyle}>{element}</Text>
      </Pressable>
    )
  })

  const chosenGender = (element) => {
    setGenderChosen(element);
    setGenderVisible(false);
    setLength(null);
    setType(null);
    setHairCut(null);
    setErrorText("")
  }

  var closeGender = () => {
    setGenderVisible(false);
    setGenderChosen(null);
    setLength(null);
    setType(null)
    setHairCut(null);
  }

  //LENGTH
  var imageLength;
  if (genderChosen === 'une femme') {
      if (length === 'très court') {
        imageLength = 
            <Image style={{width: 70, height: 90}}source={require('../assets/Wlength1.png')} />
      } else if (length === 'court') {
        imageLength = 
          <Image style={{width: 70, height: 90}}source={require('../assets/Wlength2.png')} /> 
      } else if (length === 'mi-long') {
        imageLength = 
          <Image style={{width: 70, height: 90}}source={require('../assets/Wlength3.png')} />
      } else if (length === 'long') {
        imageLength = 
          <Image style={{width: 70, height: 90}}source={require('../assets/Wlength4.png')} />      
      } else if (length === 'très long') {
        imageLength = 
          <Image style={{width: 70, height: 90}}source={require('../assets/Wlength5.png')} />
      }
  } else {
    if (length === 'très court') {
      imageLength = 
          <Image style={{width: 50, height: 70}}source={require('../assets/Mlength1.png')} />
    } else if (length === 'court') {
      imageLength = 
        <Image style={{width: 50, height: 70}}source={require('../assets/Mlength2.png')} />     
    } else if (length === 'mi-long') {
      imageLength = 
        <Image style={{width: 50, height: 70}}source={require('../assets/Mlength3.png')} />
    } else if (length === 'long') {
      imageLength = 
        <Image style={{width: 50, height: 70}}source={require('../assets/Mlength4.png')} />      
    } 
  }

  var openLength = () => {
    if (genderChosen != null) {
      setLengthVisible(true)
    } else {
      setErrorText('Veuillez indiquer votre sexe')
    }
  }

  var chosenLength = (longueur) => {
    setLength(longueur);
    setLengthVisible(false);
  }
  
  var closeLength = () => {
    setLengthVisible(false);
    setLength(null)
  };

  //TYPE
  var openType = () => {
    if (genderChosen != null) {
      setTypeVisible(true)
    } else {
      setErrorText('Veuillez indiquer votre sexe')
    }
  }

  var closeType = () => {
    setTypeVisible(false);
    setType(null);
  }

  var chosenType = (type) => {
    setType(type);
    setTypeVisible(false);
  }

  var imageType;
  if (genderChosen === 'une femme') {
      if (type=== 'raide') {
        imageType = 
            <Image style={{width: 70, height: 90}}source={require('../assets/Wtype1.png')} />
      } else if (type === 'ondulé') {
        imageType = 
          <Image style={{width: 70, height: 90}}source={require('../assets/Wtype2.png')} />     
      } else if (type === 'bouclé') {
        imageType = 
          <Image style={{width: 70, height: 90}}source={require('../assets/Wtype3.png')} />
      } else if (type === 'frisé') {
        imageType = 
          <Image style={{width: 70, height: 90}}source={require('../assets/Wtype4.png')} />     
      } else if (type === 'crépu') {
        imageType = 
          <Image style={{width: 70, height: 90}}source={require('../assets/Wtype5.png')} />
      }
  } else {
    if (type === 'raide') {
      imageType = 

          <Image style={{width: 50, height: 70}}source={require('../assets/Mtype1.png')} />
    } else if (type === 'ondulé') {
      imageType = 
        <Image style={{width: 50, height: 70}}source={require('../assets/Mtype2.png')} />
    } else if (type === 'bouclé') {
      imageType = 
        <Image style={{width: 50, height: 70}}source={require('../assets/Mtype3.png')} />
    } else if (type === 'crépu') {
      imageType = 
        <Image style={{width: 50, height: 70}}source={require('../assets/Mtype4.png')} />   
    } 
  }

  //HairCut
  var openHairCut = () => {
    if (genderChosen != null) {
      setHairCutVisible(true)
    } else {
      setErrorText('Veuillez indiquer votre sexe')
    }
  }

  var closeHairCut = () => {
    setHairCutVisible(false);
    setHairCut(null);
  }

  var chosenHairCut = (type) => {
    setHairCut(type);
    setHairCutVisible(false);
  }

  var imageHairCut;
  if (genderChosen === 'une femme') {
      if (hairCut=== 'rebelle') {
        imageHairCut = 
            <Image style={{width: 70, height: 90}}source={require('../assets/whairstyle1.jpg')} />
      } else if (hairCut === 'classique') {
        imageHairCut = 
          <Image style={{width: 70, height: 90}}source={require('../assets/whairstyle2.jpg')} />     
      } else if (hairCut === 'star') {
        imageHairCut = 
          <Image style={{width: 70, height: 90}}source={require('../assets/whairstyle3.jpg')} />
      } else if (hairCut === 'meche') {
        imageHairCut = 
          <Image style={{width: 70, height: 90}}source={require('../assets/whairstyle4.jpg')} />     
      } else if (hairCut === 'droite') {
        imageHairCut = 
          <Image style={{width: 70, height: 90}}source={require('../assets/whairstyle5.jpg')} />
      }
  } else {
    if (hairCut === 'décontracté') {
      imageHairCut = 
          <Image style={{width: 50, height: 70}}source={require('../assets/hairstyle1.jpg')}/>
    } else if (hairCut === 'frange') {
      imageHairCut = 
        <Image style={{width: 50, height: 70}}source={require('../assets/hairstyle2.jpg')} />
    } else if (hairCut === 'rasé') {
      imageHairCut = 
        <Image style={{width: 50, height: 70}}source={require('../assets/hairstyle3.jpg')} />
    } else if (hairCut === 'mi-long') {
      imageHairCut = 
        <Image style={{width: 50, height: 70}}source={require('../assets/hairstyle4.jpg')} />   
    } 
  }

  var validation = async () => {
    var newCommunication = props.communication;
    if (genderChosen) {
      newCommunication.user.gender = genderChosen;
      newCommunication.user.hairLength = length;
      newCommunication.user.hairType = type;
      newCommunication.user.hairCut = hairCut; 
      props.saveCommunication(newCommunication);
      if (type && length) {
          await fetch(`${IP_ADDRESS}/users/myDetails`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `token=${props.token}&gender=${genderChosen}&hairType=${type}&hairLength=${length}`
          });
          setValidationVisible(true);
          setTimeout(() => {
            setValidationVisible(false);
            props.navigation.navigate('Profile')
          }, 3000);
        
      } else if (type) {
          await fetch(`${IP_ADDRESS}/users/myDetails`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `token=${props.token}&gender=${genderChosen}&hairType=${type}`
          });
          setValidationVisible(true);
          setTimeout(() => {
          setValidationVisible(false);
          props.navigation.navigate('Profile')
          }, 3000);
      } else if (length) {
        await fetch(`${IP_ADDRESS}/users/myDetails`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `token=${props.token}&gender=${genderChosen}&hairLength=${length}`
          });
          setValidationVisible(true);
          setTimeout(() => {
          setValidationVisible(false);
          props.navigation.navigate('Profile')
          }, 3000);
      } else {
        await fetch(`${IP_ADDRESS}/users/myDetails`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `token=${props.token}&gender=${genderChosen}`
          });
          setValidationVisible(true);
          setTimeout(() => {
          setValidationVisible(false);
          props.navigation.navigate('Profile')
          }, 3000);
      }
    } else {
      setErrorText('Veuillez indiquer votre sexe')
    }
  }

  return (
    <ScrollView>
    <View style={globalStyles.container}>
      <Text style={[{textAlign: 'center', padding: 10, margin: 10, fontFamily: "graduate-regular", color: 'black', fontSize: 30}]}>Je communique mes préférences:</Text>
      <View style={{backgroundColor: 'white',padding: 20, borderRadius: 20}}>
      <View>
          <Pressable  onPress={() => setGenderVisible(true)}>
            <Text style={styles.title}>JE SUIS: </Text>
            <View style={{padding: 10}}>
            {genderChosen != null ?
            <Text style={ {textAlign: 'center', fontSize: 20}}>{genderChosen}</Text>
            : <Text >Choisir</Text>
            }
            </View>
            <Card.Divider style={{backgroundColor: '#4280AB', height: 1}}></Card.Divider>
            <Text style={{color: 'red'}}>{errorText}</Text>
          </Pressable>
      </View>

      <View>
            <Pressable onPress={() => openLength()}>
              <Text style={styles.title}>J'AI LES CHEVEUX: </Text>
              <View style={{padding: 10}}>
              {length != null ? 
              <View style={{display: 'flex', alignItems: 'center'}}>{imageLength}<Text>{length}</Text></View>
              : 
              <Text>Choisir</Text>
              }
              </View>
              <Card.Divider style={{backgroundColor: '#4280AB', height: 1}}></Card.Divider>
            </Pressable>
      </View>

      <View>
            <Pressable onPress={() => openType()}>
              <Text style={styles.title}>ET: </Text>
              <View style={{padding: 10}}>
              {type != null ? 
              <View style={{display: 'flex', alignItems: 'center'}}>{imageType}<Text>{type}</Text></View>
              : 
              <Text>Choisir</Text>
              }
              </View>
              <Card.Divider style={{backgroundColor: '#4280AB', height: 1}}></Card.Divider>
            </Pressable>
      </View>

      <View>
            <Pressable onPress={() => openHairCut()}>
              <Text style={styles.title}>JE VOUDRAIS UNE COUPE: </Text>
              <View style={{padding: 10}}>
              {hairCut != null ? 
              <View style={{display: 'flex', alignItems: 'center'}}>{imageHairCut}<Text>{hairCut}</Text></View>
              : 
              <Text>Choisir</Text>
              }
              </View>
              <Card.Divider style={{backgroundColor: '#4280AB', height: 1}}></Card.Divider>
            </Pressable>
      </View>
      </View>
      <View style={{margin: 20, alignItems: 'center'}}>
        <Button  title='Envoyer à mon coiffeur' backgroundColor='#4280AB' color='white' onPress={() => validation()}></Button>
      </View>

      <View style={{margin: 20, alignItems: 'center'}}>
        <Button width={150} title='Retour' backgroundColor='#AB4242' color='white' onPress={() => props.navigation.navigate('Profile')}></Button>
      </View>
      

      <Overlay isVisible={genderVisible}>
            <View style={styles.cross}>
              <EvilIcons name="close" size={24} color="black" onPress={() => closeGender()} style={{margin: 5}}/>
            </View>
            {genderTab}
        </Overlay>

        <Overlay isVisible={lengthVisible}>
            <View style={styles.cross}>
              <EvilIcons name="close" size={24} color="black" onPress={() => closeLength()} style={{margin: 5}}/>
            </View>
            {genderChosen === 'une femme' ? 
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Pressable style={styles.image} onPress={() => chosenLength('très court')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Wlength1.png')} />
                <Text style={styles.miniText}>très court</Text>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenLength('court')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Wlength2.png')}/>
                <Text style={styles.miniText}>court</Text>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenLength('mi-long')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Wlength3.png')}/>
                <Text style={styles.miniText}>mi-long</Text>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenLength('long')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Wlength4.png')}/>
                <Text style={styles.miniText}>long</Text>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenLength('très long')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Wlength5.png')}/>
                <Text style={styles.miniText}>très long</Text>
              </Pressable>
            </View>
            : 
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Pressable style={styles.image} onPress={() => chosenLength('très court')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Mlength1.png')} />
                <Text style={styles.miniText}>très court</Text>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenLength('court')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Mlength2.png')}/>
                <Text style={styles.miniText}>court</Text>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenLength('mi-long')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Mlength3.png')}/>
                <Text style={styles.miniText}>mi-long</Text>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenLength('long')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Mlength4.png')}/>
                <Text style={styles.miniText}>long</Text>
              </Pressable>
            </View>
            }
        </Overlay>

        <Overlay isVisible={typeVisible}>
            <View style={styles.cross}>
              <EvilIcons name="close" size={24} color="black" onPress={() => closeType()} style={{margin: 5}}/>
            </View>
            {genderChosen === 'une femme' ? 
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Pressable style={styles.image} onPress={() => chosenType('raide')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Wtype1.png')} />
                <Text style={styles.miniText}>raide</Text>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenType('ondulé')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Wtype2.png')}/>
                <Text style={styles.miniText}>ondulé</Text>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenType('bouclé')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Wtype3.png')}/>
                <Text style={styles.miniText}>bouclé</Text>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenType('frisé')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Wtype4.png')}/>
                <Text style={styles.miniText}>frisé</Text>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenType('crépu')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Wtype5.png')}/>
                <Text style={styles.miniText}>crépu</Text>
              </Pressable>
            </View>
            : 
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Pressable style={styles.image} onPress={() => chosenType('raide')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Mtype1.png')} />
                <Text style={styles.miniText}>raide</Text>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenType('ondulé')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Mtype2.png')}/>
                <Text style={styles.miniText}>ondulé</Text>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenType('bouclé')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Mtype3.png')}/>
                <Text style={styles.miniText}>bouclé</Text>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenType('crépu')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Mtype4.png')}/>
                <Text style={styles.miniText}>crépu</Text>
              </Pressable>
            </View>
            }
        </Overlay>

        <Overlay isVisible={hairCutVisible}>
            <View style={styles.cross}>
              <EvilIcons name="close" size={24} color="black" onPress={() => closeHairCut()} style={{margin: 5}}/>
            </View>
            {genderChosen === 'une femme' ? 
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Pressable style={styles.image} onPress={() => chosenHairCut('rebelle')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/whairstyle1.jpg')} />
                <Text style={styles.miniText}>rebelle</Text>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenHairCut('classique')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/whairstyle2.jpg')}/>
                <Text style={styles.miniText}>classique</Text>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenHairCut('star')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/whairstyle3.jpg')}/>
                <Text style={styles.miniText}>star</Text>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenHairCut('meche')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/whairstyle4.jpg')}/>
                <Text style={styles.miniText}>meche</Text>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenHairCut('droite')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/whairstyle5.jpg')}/>
                <Text style={styles.miniText}>droite</Text>
              </Pressable>
            </View>
            : 
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Pressable style={styles.image} onPress={() => chosenHairCut('décontracté')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/hairstyle1.jpg')} />
                <Text style={styles.miniText}>décontracté</Text>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenHairCut('frange')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/hairstyle2.jpg')}/>
                <Text style={styles.miniText}>frange</Text>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenHairCut('rasé')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/hairstyle3.jpg')}/>
                <Text style={styles.miniText}>rasé</Text>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenHairCut('mi-long')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/hairstyle4.jpg')}/>
                <Text style={styles.miniText}>mi-long</Text>
              </Pressable>
            </View>
            }
        </Overlay>

        <Overlay isVisible={validationVisible}>
          <Text style={{textAlign: 'center', fontFamily: 'nunito-bold', fontSize: 18}}> Félicitations! Vos informations ont été envoyées à votre coiffeur !</Text>
        </Overlay>

    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleText: {fontFamily: 'nunito-bold', fontSize: 22, color: '#333', marginTop: 5},
  cross: {display: 'flex', alignItems: 'flex-end'}, 
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5,
  },
  buttonOpen: {
    backgroundColor: "#4280AB",
  },
  buttonClose: {
    backgroundColor: "#AB4242",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  image: {padding: 5},
  title: {fontWeight : "bold", fontSize: 18, marginTop:10, color: 'black', fontFamily: 'graduate-regular'},
  miniText: {fontSize: 10, textAlign: 'center'}
});

const mapStateToProps = (state) => {
  return { token: state.token, communication: state.communication };
};

function mapDispatchToProps(dispatch) {
  return {
    saveCommunication: function(communication) {
      dispatch({
        type: 'saveCommunication',
        communication: communication,
      })
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);