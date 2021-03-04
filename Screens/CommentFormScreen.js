import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../styles/Global';
import FlatButton from '../shared/Button';
import { FontAwesome } from '@expo/vector-icons';

const CommentFormScreen = ({ addComment }) => {

  const [rating, setRating] = useState(0)
  const [avis, setAvis] = useState(null)
  const [text, setText] = useState('')

  
  const handleSubmit = () => {   
    console.log()
    if (rating != 0 && avis != null) {
      comment = {rating: rating, avis: avis};
      console.log('commentaire', comment);
      addComment(comment);
    } else {
      setText('Veuillez saisir une note et un avis')
    }
  };


var starsTab = [];
for (let i=1; i<=5; i++) {
  var color = 'white';
  if (i<rating) {
    color = '#AB4242'
  }
  let count = i+1;
  starsTab.push(<FontAwesome key={i} style={{marginRight: 5}} name="star" size={24} color={color} onPress={() => setRating(count)} />)
};

  return (
    <View style={globalStyles.container}>
      <View>
        <View style={{display: 'flex', flexDirection: 'row', marginBottom: 5}}>
          {starsTab}
        </View>
        <TextInput
          style={globalStyles.input}
          multiline
          numberOfLines={2}
          placeholder='Commentez votre expérience'
          onChangeText={(value) => setAvis(value)}
          value={avis}
        />
        {/* <TextInput
          style={globalStyles.input}
          placeholder='Avis (1 - 5)'
          keyboardType='numeric'
        /> */}
        
        
        {/* <Text style={globalStyles.errorText}>Error</Text> */}
        <Text>{text}</Text>
        <View style={styles.mtButton}>
          <FlatButton
            title='Ajouter un avis'
            color='#fff'
            backgroundColor='#4280AB'
            onPress={() => handleSubmit()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mtButton: {
    marginTop: 10,
  },
});

export default CommentFormScreen;
