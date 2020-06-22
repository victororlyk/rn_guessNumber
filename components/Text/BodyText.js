import React from 'react';
import { Text, StyleSheet } from 'react-native';

const BodyText = ({ customStyles, children }) => <Text style={{ ...styles.text, ...customStyles, }}>{children}</Text>;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'open-sans'
  }
});

export default BodyText;
