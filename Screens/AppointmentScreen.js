import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Modal, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { globalStyles } from '../styles/Global';
import Card from '../shared/Card';
import RadioButton from '../shared/RadioButton';
import CustomButton from '../shared/Button';
import {connect} from 'react-redux';

function Appointment(props) {
  // console.log("Details", props.appointment)
  const [paiement, setPaiement] = useState([
    { id: 1, value: true, name: 'Paiement en ligne', selected: true },
    { id: 2, value: false, name: 'Paiement sur place', selected: false },
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  const onRadioBtnClick = (item) => {
    let updatedState = paiement.map((paiement) =>
      paiement.id === item.id
        ? { ...paiement, selected: true }
        : { ...paiement, selected: false }
    );
    setPaiement(updatedState);
  };

  // <Image
  //   style={styles.icon}
  //   source={require('../assets/salon.png')}
  // />
  return (
    <View style={globalStyles.container}>
      <View style={styles.centeredView}>
        {/* Modal */}
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Rdv confirmé</Text>
              <Text style={styles.modalText}>
                Vous recevrez un sms de rappel 1 jour avant votre rendez-vous
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Ok</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <Text style={styles.HeaderText}>Récapitulatif du RDV</Text>
      <View style={globalStyles.hr}></View>
      <Card>
        <View style={styles.cardHeader}>
          <FontAwesome
            style={styles.icon}
            name='institution'
            size={45}
            color='#333'
          />
          <View>
            <Text style={styles.appointmentShop}>{props.appointment.shopDetailsName}</Text>
            <Text>{props.appointment.shopDetailsAddress}</Text>
            {/* <Text>92110 Clichy</Text> */}
          </View>
        </View>
        {props.appointment.hairdresser !== "Choix du Coiffeur" ?
        <Text>Professionnel : {props.appointment.hairdresser}</Text>
        :
        <Text>Professionnel : Vous n'avez pas de préférence de Coiffeur</Text>
}
        <Text>Date et heure : {props.appointment.date} - {props.appointment.hour}</Text>
     
          {props.appointment.prestation !== "Choix de la Prestation" ?
          <View style={styles.appoinTService}>
          <Text>Prestation : {props.appointment.prestation}</Text>
          <Text style={styles.appointPrice}>Total :  {props.appointment.prestationPrice}€</Text>
          </View>
          :
          <View style={styles.appoinTService}>

          <Text>Prestation : {props.appointment.experience}</Text>
          <Text style={styles.appointPrice}>Total :  {props.appointment.experiencePrice}€</Text>
          </View>
}

         
          
      
       
      </Card>
      <View style={styles.paiement}>
        {paiement.map((item) => (
          <RadioButton
            style={styles.radioItem}
            onPress={() => onRadioBtnClick(item)}
            selected={item.selected}
            key={item.id}
          >
            {item.name}
          </RadioButton>
        ))}
      </View>
      <CustomButton
        title='Valider'
        color='#fff'
        backgroundColor='#4280AB'
        onPress={() => setModalVisible(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderText: {
    textAlign: 'center',
    fontSize: 26,
    fontFamily: 'graduate-regular',
  },
  cardHeader: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    opacity: 0.5,
  },
  appointmentShop: {
    fontSize: 18,
    fontFamily: 'nunito-bold',
  },
  appoinTService: {
    marginVertical: 12,
  },
  appointPrice: {
    textAlign: 'center',
    fontFamily: 'nunito-bold',
    fontSize: 20,
  },
  radioItem: {
    paddingVertical: 18,
  },
  paiement: {
    marginVertical: 30,
    marginHorizontal: 50,
  },
  // Modal
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    marginVertical: 285,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#16A085',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});





function mapStateToProps(state) {
  return {appointment: state.details};
}

export default connect(
    mapStateToProps, 
    null
)(Appointment);