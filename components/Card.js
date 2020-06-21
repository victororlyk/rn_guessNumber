import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ customStyles, children }) => {
  return (
    <View style={{ ...styles.card, ...customStyles }}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    padding: 20,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: '#fff',
    borderRadius: 5
  },

});

export default Card;

