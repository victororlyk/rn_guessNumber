import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TitleText = ({ customStyles, children }) => <Text style={{ ...styles.text, ...customStyles }}>{children}</Text>;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: 'open-sans-bold'
  }
});

export default TitleText;
