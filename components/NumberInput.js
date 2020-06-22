import React from 'react';
import { TextInput, StyleSheet, Text } from 'react-native';

const NumberInput = ({ customStyles, error, ...other }) => (
  <>
    <TextInput
      {...other}
      style={{ ...styles.input, ...customStyles }}
    />
    {error &&
    <Text style={{ fontSize: 10, color: 'red' }}>{error}</Text>
    }
  </>
);

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10
  }
});

export default NumberInput;
