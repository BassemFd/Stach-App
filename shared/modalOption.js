import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import {connect} from 'react-redux';



const ModalOption = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Expérience ++");

// const experience = [
//     "PlayStation", "Café avec les copains", "Coupe & Cocktail", "Détente, massage, spa"
// ]

const experienceTab = props.shopDetails.packages.map((choix, i)=>{
    return (<View style={{ flexDirection: 'row'}}><Pressable key={i} style={[styles.button, styles.buttonOpen, styles.buttonZ]} onPress={()=> {setSelectedOption(choix); setModalVisible(!modalVisible)}}>
    <Text style={styles.textStyle}>{choix}</Text>
</Pressable>
<Pressable key={i} style={{padding: 10, marginBottom: 10, marginLeft:10, backgroundColor: '#58a2d6', borderRadius: 20, width: 70, alignItems: 'center'}}><Text style={{fontWeight: 'bold', fontSize: 18, color: 'white'}}>50€</Text></Pressable></View>)
})


  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Aucune prestation choisi");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {experienceTab}
          
            
            <Pressable
              style={[styles.button, styles.buttonClose, styles.buttonW]}
              onPress={() => {setModalVisible(!modalVisible); setSelectedOption("Expérience ++")}}
            >
              <Text style={styles.textStyle}>Non, Merci!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen, styles.buttonW]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>{selectedOption}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
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
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  selected: {
      backgroundColor: "#2196F3"
  }, 
  buttonW: {
      width: 100,
      marginBottom: 10    
  },
  
  buttonZ: {
    width: 200,
    marginBottom: 10    
}
  
  
});


function mapStateToProps(state) {
  return {shopDetails: state.shopDetails }
 }
  
 export default connect(
  mapStateToProps,
  null
 )(ModalOption);