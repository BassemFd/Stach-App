import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import {connect} from 'react-redux';



const Modaltest = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoiffeur, setSelectedCoiffeur] = useState("Choix du Coiffeur");

// const coiffeur = [
//     "Charlotte", "Raph", "Yaya", "Bassem"
// ]
// console.log(props.shopDetails)
const coiffeurTab = props.shopDetails.shopEmployees.map((choix, i)=>{
  
    return (<Pressable key={i} style={[styles.button, styles.buttonOpen, styles.buttonZ]} onPress={()=> {props.chosenHairdresser(choix); setSelectedCoiffeur(choix); setModalVisible(!modalVisible)}}>
    <Text style={styles.textStyle}>{choix}</Text>
</Pressable>)

})



  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Aucun Coiffeur Choisi");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {coiffeurTab}
          
            
            <Pressable
              style={[styles.button, styles.buttonClose, styles.buttonW]}
              onPress={() => {setModalVisible(!modalVisible); setSelectedCoiffeur("Choix du Coiffeur"), props.chosenHairdresser("Peu Importe")}}
            >
              <Text style={styles.textStyle}>Peu Importe</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen, styles.buttonW]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>{selectedCoiffeur}</Text>
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



function mapDispatchToProps(dispatch){
  return {
    chosenHairdresser: function(hairdresser){
            dispatch({
              type: 'hairdresser',
              hairdresser: hairdresser
            })
                }
              }
            }

function mapStateToProps(state) {
  return {shopDetails: state.shopDetails }
 }
  
 export default connect(
  mapStateToProps,
  mapDispatchToProps
 )(Modaltest);