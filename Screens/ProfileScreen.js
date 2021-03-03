import React, { useState } from 'react';
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

export default function Profile() {
  const [modalOpen, setModalOpen] = useState(false);

  const [comments, setComments] = useState([
    {
      id: 1,
      comment: 'Zelda, Breach of Fresh Air',
      rating: 5,
      date: '04/03/2021-21:32pm',
    },
  ]);

  // Add Comment
  const addComment = (comment) => {
    let newComment = {
      body: comment.body,
      rating: comment.rating,
    };

    setComments([newComment, ...comments]);
    setModalOpen(false);
  };

  let points = 562;
  let appointmentPrice = 67;
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.brand}>'Stach</Text>
      <View style={styles.userContent}>
        <Text style={styles.userName}>John Doe</Text>
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
          <Card>
            <View style={styles.cardHeader}>
              <Text style={styles.appointmentShop}>Chez Juliette</Text>
              <CustomBadge
                title={`${appointmentPrice}€`}
                color='#fff'
                backgroundColor='#E65100'
                width={40}
              />
            </View>
            <Text style={styles.appointmentAddresses}>
              56 Boulevard Pereire 75017 Paris
            </Text>
            <Text style={styles.appointmentDate}>Le 17 mars 2021 à 15:30</Text>
            <CustomButton
              title='Mon coiffeur'
              color='#fff'
              backgroundColor='#4280AB'
            />
          </Card>
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
            <CustomButton
              title='Mon coiffeur'
              color='#fff'
              backgroundColor='#4280AB'
            />
          </Card>
        </View>
        {/* Appointement Passed */}
        <View style={styles.appointmentBox}>
          <Text style={styles.appointmentTitle}>Rdv passés :</Text>
          <View style={styles.bottomTitle}></View>
          <Card>
            <View style={styles.cardHeader}>
              <Text style={styles.appointmentShop}>Chez Juliette</Text>
              <CustomBadge
                title={`${appointmentPrice}€`}
                color='#fff'
                backgroundColor='#16a085'
                width={40}
              />
            </View>
            <Text style={styles.appointmentAddresses}>
              56 Boulevard Pereire 75017 Paris
            </Text>
            <Text style={styles.appointmentDate}>Le 17 mars 2021 à 15:30</Text>
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
            <CustomButton
              title='Écrire un avis'
              color='#fff'
              backgroundColor='#4280AB'
              onPress={() => setModalOpen(true)}
              s
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
});
