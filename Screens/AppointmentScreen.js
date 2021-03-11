import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Modal, Pressable } from 'react-native';
import { globalStyles } from '../styles/Global';
import Card from '../shared/Card';
import RadioButton from '../shared/RadioButton';
import CustomButton from '../shared/Button';
import { connect } from 'react-redux';
import { IP_ADDRESS } from '../urlBackend';

function Appointment(props) {
  const [paiement, setPaiement] = useState([
    { id: 1, value: true, name: 'Paiement en ligne', selected: true },
    { id: 2, value: false, name: 'Paiement sur place', selected: false },
  ]);
  const [modalVisible, setModalVisible] = useState(false);

  const [serviceChoice, setServiceChoice] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceDuration, setServiceDuration] = useState(0);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);

  useEffect(() => {
    if (props.appointment.experience === 'Choisir une Experience') {
      setServiceChoice(props.appointment.prestation);
      setServicePrice(props.appointment.prestationPrice);
      setServiceDuration(props.appointment.prestationDuration);
      setLoyaltyPoints(50);
    } else {
      setServiceChoice(props.appointment.experience);
      setServicePrice(props.appointment.experiencePrice);
      setServiceDuration(props.appointment.experienceDuration);
      setLoyaltyPoints(100);
    }
  }, []);

  const onRadioBtnClick = (item) => {
    let updatedState = paiement.map((paiement) =>
      paiement.id === item.id
        ? { ...paiement, selected: true }  //mettre à jour la clé valeur d'un objet avec le spread operator
        : { ...paiement, selected: false }
    );
    setPaiement(updatedState);
  };

  //? ON a tous réutilisé les même fonction ce qui nous a permis de comprendre l'interêt d'utiliser MOMENT.JS
  let day = props.appointment.date.slice(0, 2);
  let month = props.appointment.date.slice(3, 5);
  let year = props.appointment.date.slice(6);
  let hour = props.appointment.hour.slice(0, 2);
  let min = props.appointment.hour.slice(3);
  let sec = '00';

  // let prefixHour = '';
  // if (hour[0] === '8' || hour[0] === '9') {
  //   prefixHour = '0' + hour;
  // } else {
  //   prefixHour = hour;
  // }

  //? on rajoute les + pour transformer en nombre comme un parseInt() / Syntaxe ES6
  let startDateAppoint = new Date(
    +year,
    +month - 1,
    +day,
    +hour + 1,
    +min,
    +sec
  );

  let endDateAppoint = new Date(
    +year,
    +month - 1,
    +day,
    +hour + 1,
    +min + serviceDuration,
    +sec
  );

  const handleConfirm = async () => {
   
    const data = await fetch(`${IP_ADDRESS}/addappointment/${props.token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chosenOffer: serviceChoice,
        chosenPrice: servicePrice,
        chosenEmployee: props.appointment.hairdresser,
        startDate: startDateAppoint.toISOString(),
        endDate: endDateAppoint.toISOString(),
        chosenPayment: 'onshop',
        appointmentStatus: 'validated',
        shop_id: props.appointment.shopDetailsID,
        loyaltyPoints: loyaltyPoints,
      }),
    });
    setModalVisible(true);
    props.navigation.navigate('Profile');
  };

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
          <Image
            style={styles.tinyLogo}
            source={{ uri: props.appointment.shopDetailsImage }}
          ></Image>

     

          <View>
            <Text style={styles.appointmentShop}>
              {props.appointment.shopDetailsName}
            </Text>
            <Text style={{ marginLeft: 10, width: 200 }}>
              {props.appointment.shopDetailsAddress}
            </Text>
        
          </View>
        </View>
        {props.appointment.hairdresser !== 'Choix du Coiffeur' ? (
          <Text>Professionnel : {props.appointment.hairdresser}</Text>
        ) : (
          <Text>Professionnel : Aucun Coiffeur Choisi</Text>
        )}
        <Text>
          Date et heure : {props.appointment.date} - {props.appointment.hour}
        </Text>

        {props.appointment.prestation !== 'Choix de la Prestation' ? (
          <View style={styles.appoinTService}>
            <Text>Prestation : {props.appointment.prestation}</Text>
            <Text style={styles.appointPrice}>
              Total : {props.appointment.prestationPrice}€
            </Text>
          </View>
        ) : (
          <View style={styles.appoinTService}>
            <Text>Prestation : {props.appointment.experience}</Text>
            <Text style={styles.appointPrice}>
              Total : {props.appointment.experiencePrice}€
            </Text>
          </View>
        )}
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
        onPress={() => handleConfirm()}
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
    marginLeft: 10,
  },
  appoinTService: {
    marginVertical: 12,
  },
  appointPrice: {
    textAlign: 'right',
    fontFamily: 'nunito-bold',
    fontSize: 20,
    margin: 10,
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
  tinyLogo: {
    width: 100,
    height: 100,
  },
});

function mapStateToProps(state) {
  return { token: state.token, appointment: state.details };
}

export default connect(mapStateToProps, null)(Appointment);
