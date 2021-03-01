import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Header = ({ navigation }) => {
  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={styles.headerTitle}>
      <MaterialIcons
        style={styles.icon}
        name='menu'
        size={28}
        onPress={() => openMenu()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Header;
