import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { globalStyles } from '../styles/Global';
import CustomBadge from '../shared/Badge';
import CustomButton from '../shared/Button';
import Card from '../shared/Card';
import CommentFormScreen from './CommentFormScreen';
import { IP_ADDRESS, IP_ADDRESS_HOME } from '@env';
import { connect } from 'react-redux';

function Profile({ token }) {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [shops, setShops] = useState([]);

  // const [comments, setComments] = useState([
  //   {
  //     id: 1,
  //     comment: 'Zelda, Breach of Fresh Air',
  //     rating: 5,
  //     date: '04/03/2021-21:32pm',
  //   },
  // ]);

  // This token will come from the Reducer
  // let token = '3OwxOaPpQyh3lM6FrrVWJdGlUfXKUIUa';

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

  // console.log(shops, 'shops');
  // console.log(appointments);

  // Format appointment date
  const formatAppointDate = (date) => {
    const event = new Date(date);
    // event.getHours() - 1;
    // console.log(event, 'e');

    // Get the day of the week with a long date
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Africa/Dakar', // Pck UTC de Dakar == UTC+0 idem que ce qu'on enregistre en BDD
    };

    // console.log(date, 'da');
    date = event.toLocaleString('fr-FR', options);
    const dateFirstUpper = `${date[0].toUpperCase() + date.slice(1)}`;
    return dateFirstUpper;
  };

  // Add Comment
  const addComment = (comment) => {
    //
    console.log(comment);
    

    // setComments([newComment, ...comments]);
    setModalOpen(false);
  };

  let points = 562;
  let appointmentPrice = 67;
  let msgInfo = false;
  const dateNow = new Date();
  // const dateNow = new Date(Date.now()).toString();
  // console.log(dateNow);
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.brand}>'Stach</Text>
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
      <View style={globalStyles.hr}></View>
      <ScrollView>
        <View style={styles.appointmentBox}>
          <Text style={styles.appointmentTitle}>Rdv à venir :</Text>
          <View style={styles.bottomTitle}></View>

          {appointments.map((appointment, i) => {
            return appointment.startDate < dateNow ? (
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
                    width={40}
                  />
                </View>
                <Text style={styles.appointmentAddresses}>
                  {shops[i].shopAddress}
                </Text>
                <Text style={styles.appointmentDate}>
                  {formatAppointDate(appointment.startDate)}
                </Text>
                <CustomButton
                  title='Mon coiffeur'
                  color='#fff'
                  backgroundColor='#4280AB'
                />
              </Card>
            ) : (
              <Text style={styles.noAppoints}>Pas de Rdv à venir</Text>
            );
          })}
        </View>
        {/* Appointement Passed */}
        <View style={styles.appointmentBox}>
          <Text style={styles.appointmentTitle}>Rdv passés :</Text>
          <View style={styles.bottomTitle}></View>
          {appointments.map((appointment, i) => {
            {
              /* if (i > 0 && i < 2) {
              msgInfo = true;
            } */
            }

            console.log('IF');
            console.log(appointment.startDate, 'Start');
            console.log(dateNow, 'Date now');

            if (appointment.startDate > dateNow) {
              <Card key={appointment._id}>
                <View style={styles.cardHeader}>
                  <Text style={styles.appointmentShop}>
                    {shops[i].shopAddress}
                  </Text>
                  <CustomBadge
                    title={`${appointmentPrice}€`}
                    color='#fff'
                    backgroundColor='#16a085'
                    width={40}
                  />
                </View>
                <Text style={styles.appointmentAddresses}>
                  {shops[i].shopAddress}
                </Text>
                <Text style={styles.appointmentDate}>
                  {formatAppointDate(appointment.startDate)}
                </Text>
                <Modal visible={modalOpen} animationType='slide'>
                  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.modalContent}>
                      <FontAwesome
                        style={{ ...styles.modalToggle, ...styles.modalClose }}
                        name='close'
                        color='#E65100'
                        size={24}
                        onPress={() => setModalOpen(false)}
                      />
                      <CommentFormScreen addComment={addComment} />
                    </View>
                  </TouchableWithoutFeedback>
                </Modal>
                <CustomButton
                  title='Écrire un avis'
                  color='#fff'
                  backgroundColor='#4280AB'
                  onPress={() => setModalOpen(true)}
                />
              </Card>;
            } else if (msgInfo === true) {
              return (
                <Text key={appointment._id} style={styles.noAppoints}>
                  Pas de Rdv passés
                </Text>
              );
            }
          })}
          <Card>
            <View style={styles.cardHeader}>
              <Text style={styles.appointmentShop}>Chez Bassem</Text>
              <CustomBadge
                title={`${appointmentPrice}€`}
                color='#fff'
                backgroundColor='#16a085'
                width={40}
              />
            </View>
            <Text style={styles.appointmentAddresses}>
              15 Square des Sports 95500 Gonesse
            </Text>

            <Text style={styles.appointmentDate}>Le 5 mars 2021 à 17:00</Text>
            <Modal visible={modalOpen} animationType='slide'>
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.modalContent}>
                  <FontAwesome
                    style={{ ...styles.modalToggle, ...styles.modalClose }}
                    name='close'
                    color='#E65100'
                    size={24}
                    onPress={() => setModalOpen(false)}
                  />
                  <CommentFormScreen addComment={addComment} />
                </View>
              </TouchableWithoutFeedback>
            </Modal>
            <CustomButton
              title='Écrire un avis'
              color='#fff'
              backgroundColor='#4280AB'
              onPress={() => setModalOpen(true)}
            />
          </Card>
        </View>
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
  appointmentBox: {
    // borderRadius: 2,
    // elevation: 1,
    // shadowColor: '#333',
    // textShadowRadius: 2,
    // marginVertical: 6,
    // paddingVertical: 3,
    // paddingHorizontal: 3,
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

const mapStateToProps = (state) => {
  return { token: state.token };
};
export default connect(mapStateToProps)(Profile);
