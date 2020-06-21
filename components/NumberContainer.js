import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../constants/colors';

const NumberContainer = ({ selectedNumber }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{selectedNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    borderWidth: 2,
    borderColor: colors.accent,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  number: {
    textAlign: 'center',
    color: colors.accent,
    fontSize: 22
  }
});

export default NumberContainer;
