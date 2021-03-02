import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { color } from "react-native-reanimated";
import Icon from 'react-native-vector-icons/FontAwesome';



const Modaltest = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState("TOUTES LES PRESTATIONS");

const prestation = [
  "TOUTES LES PRESTATIONS", "COUPE FEMME", "COUPE HOMME", "COLORATION"
]

const serviceTab = prestation.map((choix, i)=>{
    return (<Pressable key={i} style={[styles.button, styles.buttonOpen, styles.buttonW]} onPress={()=> {setSelectedService(choix); setModalVisible(!modalVisible)}}>
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
          Alert.alert("Vous n'avez pas selectionné de prestation");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {serviceTab}
          
            
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible); setSelectedService("TOUTES LES PRESTATIONS")}}
            >
              <Text style={styles.textStyle}>FERMER</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={{width:"95%", 
        marginBottom:30, 
        flex:1, 
        flexDirection:'row', 
        alignItems:'center',
        borderBottomColor: '#4280AB',
        borderBottomWidth: 1,
        marginBottom: 30,}}
        textStyle={{textDecorationLine: 'underline'}}
        onPress={() => setModalVisible(true)}
      > 
        <View style={{marginRight:10, marginBottom: 10}}>
        <Icon name='angle-double-down' size={36} color="#4E342E" onPress={() => setModalVisible(true)}/>
        </View>
        <Text style={{color : "black", fontSize:18, marginBottom: 10}}>{selectedService}</Text>
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
      width: 200,
      marginBottom: 10    
  }
  
  
});

export default Modaltest;