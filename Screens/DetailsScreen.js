import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { connect } from 'react-redux';
import { globalStyles } from '../styles/Global';
import Button from '../shared/Button';
import { EvilIcons } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements';


function Details(props) {

  console.log(props.communication)

  useEffect(() => {
    
  }, []);

  const gender  = ['un homme', 'une femme'];

  const [errorText, setErrorText] = useState('');

  const [genderChosen, setGenderChosen] = useState(null);
  const [genderVisible, setGenderVisible] = useState(false);
  const [genderText, setGenderText] = useState('Choisir');

  const [lengthVisible, setLengthVisible] = useState(false);
  //const [lengthText, setLengthText] = useState('Choisir');
  const [length, setLength] = useState(null);

  const [typeVisible, setTypeVisible] = useState(false);
  //const [typeText, setTypeText] = useState('Choisir');
  const [type, setType] = useState(null);
  const [validationVisible, setValidationVisible] = useState(false);

  

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
    setGenderText(element);
    setLength(null);
    setType(null);
    //setLengthText('Choisir');
  }

  var closeGender = () => {
    setGenderVisible(false);
    setGenderChosen(null);
    setGenderText('Choisir');
    setLength(null);
    setType(null)
    //setLengthText('Choisir');
  }

  //LENGTH
  var imageLength;
  if (genderChosen === 'une femme') {
      if (length === 'très court') {
        imageLength = 
          <Pressable style={styles.image} onPress={() => openLength()}>
            <Image style={{width: 70, height: 90}}source={require('../assets/Wlength1.png')} />
          </Pressable>
      } else if (length === 'court') {
        imageLength = 
        <Pressable style={styles.image} onPress={() => openLength()}>
          <Image style={{width: 70, height: 90}}source={require('../assets/Wlength2.png')} />
        </Pressable>
         
      } else if (length === 'mi-long') {
        imageLength = 
        <Pressable style={styles.image} onPress={() => openLength()}>
          <Image style={{width: 70, height: 90}}source={require('../assets/Wlength3.png')} />
        </Pressable>
      } else if (length === 'long') {
        imageLength = 
        <Pressable style={styles.image} onPress={() => openLength()}>
          <Image style={{width: 70, height: 90}}source={require('../assets/Wlength4.png')} />
        </Pressable>        
      } else if (length === 'très long') {
        imageLength = 
        <Pressable style={styles.image} onPress={() => openLength()}>
          <Image style={{width: 70, height: 90}}source={require('../assets/Wlength5.png')} />
        </Pressable> 
      }
  } else {
    if (length === 'très court') {
      imageLength = 
        <Pressable style={styles.image} onPress={() => openLength()}>
          <Image style={{width: 50, height: 70}}source={require('../assets/Mlength1.png')} />
        </Pressable>
    } else if (length === 'court') {
      imageLength = 
      <Pressable style={styles.image} onPress={() => openLength()}>
        <Image style={{width: 50, height: 70}}source={require('../assets/Mlength2.png')} />
      </Pressable>
       
    } else if (length === 'mi-long') {
      imageLength = 
      <Pressable style={styles.image} onPress={() => openLength()}>
        <Image style={{width: 50, height: 70}}source={require('../assets/Mlength3.png')} />
      </Pressable>
    } else if (length === 'long') {
      imageLength = 
      <Pressable style={styles.image} onPress={() => openLength()}>
        <Image style={{width: 50, height: 70}}source={require('../assets/Mlength4.png')} />
      </Pressable>        
    } 
  }



  var openLength = () => {
    if (genderText != 'Choisir') {
      setLengthVisible(true)
    } else {
      setErrorText('Veuillez indiquer votre sexe')
    }
  }

  var chosenLength = (longueur) => {
    setLength(longueur);
    //setLengthText(longueur);
    setLengthVisible(false);
  }
  
  var closeLength = () => {
    setLengthVisible(false);
    //setLengthText('Choisir');
    setLength(null)
  };

  //TYPE
  var openType = () => {
    if (genderText != 'Choisir') {
      setTypeVisible(true)
    } else {
      setErrorText('Veuillez indiquer votre sexe')
    }
  }

  var closeType = () => {
    setTypeVisible(false);
    //setTypeText('Choisir');
    setType(null);
  }

  var chosenType = (type) => {
    setType(type);
    //setTypeText(type);
    setTypeVisible(false);
  }



  var imageType;
  if (genderChosen === 'une femme') {
      if (type=== 'raide') {
        imageType = 
          <Pressable style={styles.image} onPress={() => openType()}>
            <Image style={{width: 70, height: 90}}source={require('../assets/Wtype1.png')} />
          </Pressable>
      } else if (type === 'ondulé') {
        imageType = 
        <Pressable style={styles.image} onPress={() => openType()}>
          <Image style={{width: 70, height: 90}}source={require('../assets/Wtype2.png')} />
        </Pressable>
         
      } else if (type === 'bouclé') {
        imageType = 
        <Pressable style={styles.image} onPress={() => openType()}>
          <Image style={{width: 70, height: 90}}source={require('../assets/Wtype3.png')} />
        </Pressable>
      } else if (type === 'frisé') {
        imageType = 
        <Pressable style={styles.image} onPress={() => openType()}>
          <Image style={{width: 70, height: 90}}source={require('../assets/Wtype4.png')} />
        </Pressable>        
      } else if (type === 'crépu') {
        imageType = 
        <Pressable style={styles.image} onPress={() => openType()}>
          <Image style={{width: 70, height: 90}}source={require('../assets/Wtype5.png')} />
        </Pressable> 
      }
  } else {
    if (type === 'raide') {
      imageType = 
        <Pressable style={styles.image} onPress={() => openType()}>
          <Image style={{width: 50, height: 70}}source={require('../assets/Mtype1.png')} />
        </Pressable>
    } else if (type === 'ondulé') {
      imageType = 
      <Pressable style={styles.image} onPress={() => openType()}>
        <Image style={{width: 50, height: 70}}source={require('../assets/Mtype2.png')} />
      </Pressable>
       
    } else if (type === 'bouclé') {
      imageType = 
      <Pressable style={styles.image} onPress={() => openType()}>
        <Image style={{width: 50, height: 70}}source={require('../assets/Mtype3.png')} />
      </Pressable>
    } else if (type === 'crépu') {
      imageType = 
      <Pressable style={styles.image} onPress={() => openType()}>
        <Image style={{width: 50, height: 70}}source={require('../assets/Mtype4.png')} />
      </Pressable>        
    } 
  }

  var validation = () => {
    setValidationVisible(true);
    setTimeout(() => {
      setValidationVisible(false);
      props.navigation.navigate('Profile')
    }, 3000)
  }

  console.log('details', props.communication)
  return (
    <View style={globalStyles.container}>
      <View style={{display: 'flex', alignItems: 'center', marginTop: 30}}>
        <Text style={styles.titleText}>Je suis:</Text>
        <Button title={genderText} color='white' backgroundColor='#4280AB' onPress={() => setGenderVisible(true)}></Button>
      </View>
      <Text style={{textAlign: 'center', paddingTop: 5}}>{errorText}</Text>

      <View style={{display: 'flex', alignItems: 'center', marginTop: 30}}>
        <Text style={styles.titleText}>J'ai les cheveux:</Text>
        { length != null ? 
        imageLength
        : <Button title='Choisir' onPress={() => openLength()} color='white' backgroundColor='#4280AB'/>
        }
      </View>

      <View style={{display: 'flex', alignItems: 'center', marginTop: 30}}>
        <Text style={styles.titleText}>Et:</Text>
        {type != null ?
        imageType
      : <Button title='Choisir' onPress={() => openType()} color='white' backgroundColor='#4280AB'/>
      }
      </View>
      <View style={{margin: 20}}>
        <Button title='Envoyer à mon coiffeur' backgroundColor='#AB4242' color='white' onPress={() => validation()}></Button>
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
            {genderText === 'une femme' ? 
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Pressable style={styles.image} onPress={() => chosenLength('très court')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Wlength1.png')} />
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenLength('court')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Wlength2.png')}/>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenLength('mi-long')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Wlength3.png')}/>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenLength('long')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Wlength4.png')}/>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenLength('très long')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Wlength5.png')}/>
              </Pressable>
            </View>
            : 
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Pressable style={styles.image} onPress={() => chosenLength('très court')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Mlength1.png')} />
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenLength('court')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Mlength2.png')}/>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenLength('mi-long')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Mlength3.png')}/>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenLength('long')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Mlength4.png')}/>
              </Pressable>
            </View>
            }
        </Overlay>

        <Overlay isVisible={typeVisible}>
            <View style={styles.cross}>
              <EvilIcons name="close" size={24} color="black" onPress={() => closeType()} style={{margin: 5}}/>
            </View>
            {genderText === 'une femme' ? 
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Pressable style={styles.image} onPress={() => chosenType('raide')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Wtype1.png')} />
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenType('ondulé')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Wtype2.png')}/>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenType('bouclé')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Wtype3.png')}/>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenType('frisé')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Wtype4.png')}/>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenType('crépu')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Wtype5.png')}/>
              </Pressable>
            </View>
            : 
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Pressable style={styles.image} onPress={() => chosenType('raide')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Mtype1.png')} />
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenType('ondulé')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Mtype2.png')}/>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenType('bouclé')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Mtype3.png')}/>
              </Pressable>
              <Pressable style={styles.image} onPress={() => chosenType('crépu')}>
                <Image style={{width: 50, height: 70}}source={require('../assets/Mtype4.png')}/>
              </Pressable>
            </View>
            }
        </Overlay>

        <Overlay isVisible={validationVisible}>
          <Text style={{textAlign: 'center', fontFamily: 'nunito-bold', fontSize: 18}}> Féliciations! Vos informations ont été envoyés à votre coiffeur !</Text>
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
  },
  title: {fontFamily: 'caveat-regular', fontSize: 30, marginTop:10, textAlign: 'center'},
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
  image: {padding: 5}
});

const mapStateToProps = (state) => {
  return { token: state.token, communication: state.communication };
};

export default connect(mapStateToProps, null)(Details);