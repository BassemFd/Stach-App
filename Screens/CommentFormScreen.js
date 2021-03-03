import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { globalStyles } from '../styles/Global';
import FlatButton from '../shared/Button';

const CommentFormScreen = ({ addComment }) => {
  const handleSubmit = (comment) => {
    addComment(comment);
  };

  return (
    <View style={globalStyles.container}>
      <View>
        <TextInput
          style={globalStyles.input}
          multiline
          numberOfLines={2}
          placeholder='Avis...'
        />
        <TextInput
          style={globalStyles.input}
          placeholder='Avis (1 - 5)'
          keyboardType='numeric'
        />
        {/* <Text style={globalStyles.errorText}>Error</Text> */}
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
