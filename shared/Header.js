import React from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Header = ({ navigation }) => {
  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={{}}>
      
      <MaterialIcons
        style={{marginLeft:16, marginTop:16}}
        name='menu'
        size={42}
        onPress={() => openMenu()}
      />
      

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Header;
