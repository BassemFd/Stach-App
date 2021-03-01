import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Badge = ({ title, color, backgroundColor, width }) => {
  return (
    <View style={{ ...styles.badge, backgroundColor, width }}>
      <Text style={{ ...styles.badgeTitle, color }}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 8,
    paddingVertical: 4,
  },
  badgeTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Badge;
