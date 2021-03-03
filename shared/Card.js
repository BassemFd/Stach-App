import React from 'react';
import { StyleSheet, View } from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
  cardContent: {
    marginHorizontal: 8,
    marginVertical: 10,
  },
});

export default Card;
