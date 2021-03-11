import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { globalStyles } from '../styles/Global';
import CustomBadge from '../shared/Badge';
import CustomButton from '../shared/Button';
import Card from '../shared/Card';
import CommentFormScreen from './CommentFormScreen';
import { IP_ADDRESS } from '../urlBackend';
import { connect } from 'react-redux';


function Profile({ token, saveChoosenOffer, navigation, saveCommunication }) {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [shops, setShops] = useState([]);
  const [shopId, setShopId] = useState('');
  const [appointmentId, setAppointmentId] = useState('');

  // ADRESSE INVERSÉES SUR LES RDV À RÉGLER

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      const data = await fetch(`${IP_ADDRESS}/users/myProfile/${token}`);
      const body = await data.json();

      setUser(body.user);
      setShops(body.shops);
      setAppointments(body.appointments);
      setLoading(false);
    };

    getUser();
  }, [token]);

  // Format appointment date
  const formatAppointDate = (date) => {
    const event = new Date(date);

    let displayDate;
    let displayTime;

    let weekday = [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
    ][event.getDay()];

    let month = [
      'Janvier',
      'Fevrier',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Aout',
      'Septembre',
      'Octobre',
      'Novembre',
      'Decembre',
    ][event.getMonth()];

    let zeroDay = '';
    let zeroMonth = '';
    event.getDate() < 10 ? (zeroDay = '0') : null;
    event.getMonth() < 10 ? (zeroMonth = '0') : null;
    displayDate = `${weekday} ${zeroDay}${event.getDate()} ${month} ${event.getFullYear()}`;

    let zeroHour = '';
    let zeroMinute = '';
    event.getHours() < 10 ? (zeroHour = '0') : null;
    event.getMinutes() < 10 ? (zeroMinute = '0') : null;
    displayTime = `à ${zeroHour}${
      event.getHours() - 1
    }:${zeroMinute}${event.getMinutes()}`;

    let finalDate = `${displayDate} ${displayTime}`;
    return finalDate;
  };

  // Add Comment
  const addComment = async (comment) => {
    var newComment = await fetch(`${IP_ADDRESS}/users/addcomment`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `comment=${comment.avis}&rating=${comment.rating}&shop_id=${shopId}&token=${token}&appointmentId=${appointmentId}`,
    });
    await newComment.json();

    const getUser = async () => {
      const data = await fetch(`${IP_ADDRESS}/users/myProfile/${token}`);
      const body = await data.json();
      setUser(body.user);
      setShops(body.shops);
      setAppointments(body.appointments);
    };

    getUser();
    setModalOpen(false);
  };

  const openComment = (shop_id, appointment_id) => {
    setAppointmentId(appointment_id);
    setShopId(shop_id);
    setModalOpen(true);
  };

  const openShop = async (myShopId) => {
    var data = await fetch(`${IP_ADDRESS}/shop/${myShopId}`);
    var body = await data.json();
    saveChoosenOffer(body.shop);
    navigation.navigate('Shop');
  };

  const openCommunication = (shopSelected) => {
    var communication = {
      shopMail: shopSelected.shopMail,
      shopName: shopSelected.shopName,
      user: user,
    };
    saveCommunication(communication);
    navigation.navigate('Details');
  };


  let points = user.loyaltyPoints;
  let msgInfo = false;
  const newDate = new Date();
  const dateNow = newDate;


  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.brand}></Text>
      {loading ? (
        <ActivityIndicator size='large' color='#121212' />
      ) : (
        <View style={styles.userContent}>
          <Text style={styles.userName}>
            {user.firstName} {user.lastName}
          </Text>
          <CustomBadge
            title={`${points} Points`}
            color='#fff'
            backgroundColor='#FFCD41'
            width={110}
          />
        </View>
      )}
      <View style={globalStyles.hr}></View>
      <ScrollView>
        {loading ? (
          <ActivityIndicator size='large' color='#121212' />
        ) : (
          <View style={styles.appointmentBox}>
            <Text style={styles.appointmentTitle}>Rdv à venir :</Text>
            <View style={styles.bottomTitle}></View>

            {appointments.map((appointment, i) => {
              if (new Date(appointment.startDate) > dateNow) {
                return (
                  <Card key={appointment._id}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.appointmentShop}>
                        {shops[i].shopName}
                      </Text>
                      <CustomBadge
                        title={`${appointment.chosenPrice}€`}
                        color='#fff'
                        backgroundColor={
                          appointment.chosenPayment === 'online'
                            ? '#16a085'
                            : '#E65100'
                        }
                        width={50}
                      />
                    </View>
                    <Text style={styles.appointmentAddresses}>
                      {shops[i].shopAddress}
                    </Text>
                    <Text>{appointment.chosenOffer}</Text>
                    <Text style={styles.appointmentDate}>
                      {formatAppointDate(appointment.startDate)}
                    </Text>
                    <CustomButton
                      title='Communique avec ton coiffeur'
                      color='#fff'
                      backgroundColor='#4280AB'
                      onPress={() => openCommunication(shops[i])}
                    />
                  </Card>
                );
              } else {
               
                <Text style={styles.noAppoints}>Pas de Rdv à venir</Text>
                
              }
            })}
          </View>
        )}

        {loading ? (
          <ActivityIndicator size='large' color='#121212' />
        ) : (
          <View style={styles.appointmentBox}>
            <Text style={styles.appointmentTitle}>Rdv passés :</Text>
            <View style={styles.bottomTitle}></View>
            {appointments.map((appointment, i) => {
              if (new Date(appointment.startDate) < dateNow) {
                return (
                  <Card key={appointment._id}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.appointmentShop}>
                        {shops[i].shopName}
                      </Text>
                      <CustomBadge
                        title={`${appointment.chosenPrice}€`}
                        color='#fff'
                        backgroundColor='#16a085'
                        width={40}
                      />
                    </View>
                    <Text style={styles.appointmentAddresses}>
                      {shops[i].shopAddress}
                    </Text>
                    <Text>{appointment.chosenOffer}</Text>
                    <Text style={styles.appointmentDate}>
                      {formatAppointDate(appointment.startDate)}
                    </Text>
                    <Modal  visible={modalOpen} animationType='slide'>
                      <TouchableWithoutFeedback
                        onPress={() => Keyboard.dismiss()}
                      >
                        <View style={[styles.modalContent, {backgroundColor: '#FFE082'}]} >
                          
                          <View style={{alignItems: 'center', padding: 20, backgroundColor: '#FFE082'}}>
                            <CustomButton
                              title='Retour'
                              color='#fff'
                              backgroundColor='#AB4242'
                              onPress={() => setModalOpen(false)}
                              width={100}
                              
                            />
                            </View>
                          <CommentFormScreen addComment={addComment} />
                        </View>
                      </TouchableWithoutFeedback>
                    </Modal>
                    {appointment.commentExists ? (
                      <CustomButton
                        title='Reprendre Rendez-vous'
                        color='#fff'
                        backgroundColor='#AB4242'
                        onPress={() => openShop(shops[i]._id)}
                      />
                    ) : (
                      <CustomButton
                        title='Écrire un avis'
                        color='#fff'
                        backgroundColor='#4280AB'
                        onPress={() =>
                          openComment(shops[i]._id, appointment._id)
                        }
                      />
                    )}
                  </Card>
                );
              } else {
                
                <Text key={i} style={styles.noAppoints}>
                  Pas de Rdv passés
                </Text>
                
              }
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  userContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userName: {
    textAlign: 'center',
    fontSize: 26,
    fontFamily: 'graduate-regular',
  },
  appointmentTitle: {
    fontSize: 18,
    fontFamily: 'nunito-bold',
  },
  bottomTitle: {
    borderBottomColor: '#333',
    borderBottomWidth: 1.5,
    width: 102,
  },
  appointment: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    textShadowRadius: 2,
    marginHorizontal: 2,
    marginVertical: 6,
    paddingVertical: 0,
    paddingTop: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentShop: {
    fontFamily: 'graduate-regular',
  },
  appointmentAddresses: {
    marginVertical: 3,
    fontFamily: 'nunito-regular',
  },
  appointmentDate: {
    fontFamily: 'nunito-bold',
    marginBottom: 5,
  },
  modalToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
    marginTop: 10,
  },
  noAppoints: {
    fontSize: 30,
    fontFamily: 'nunito-regular',
    textAlign: 'center',
    marginVertical: 30,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    saveChoosenOffer: function (shopDetails) {
      dispatch({
        type: 'selectOffer',
        shopDetails: shopDetails,
      });
    },
    saveCommunication: function (communication) {
      dispatch({
        type: 'saveCommunication',
        communication: communication,
      });
    },
  };
}

const mapStateToProps = (state) => {
  return { token: state.token };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
