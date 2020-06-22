import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Button, Keyboard } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import * as  yup from 'yup';
import Card from '../components/Card';
import colors from '../constants/colors';
import NumberInput from '../components/NumberInput';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/Text/BodyText';
import TitleText from '../components/Text/TitleText';
import MainButton from '../components/MainButton';

const validationSchema = yup.object().shape({
  guess: yup.number().min(1).max(99).required()
});


const StartGame = () => {
  const history = useHistory();

  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState('');

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput =
      <Card customStyles={styles.summaryContainer}>
        <BodyText>selected number is </BodyText>
        <NumberContainer selectedNumber={selectedNumber} />
        <MainButton onPress={() => history.push({ pathname: '/game', state: { selectedNumber } })}>
          START GAME
        </MainButton>
      </Card>;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <TitleText>Start a New Game!</TitleText>
        <Card customStyles={styles.inputContainer}>
          <Formik initialValues={{ guess: '' }} onSubmit={(values, { resetForm }) => {
            console.log(resetForm, 'here');
            setSelectedNumber(+values.guess);
            setConfirmed(true);
            resetForm({ guess: '' });
          }}
                  validationSchema={validationSchema}>
            {({
              handleChange, resetForm, values, errors, handleSubmit, setFieldValue
            }) => {
              return (
                <>
                  <BodyText> Choose a number</BodyText>
                  <NumberInput
                    customStyles={styles.input}
                    value={values.guess}
                    error={errors.guess}
                    onChangeText={handleChange('guess')}
                    keyboardType='number-pad' autoCorrect={false} maxLength={2}
                  />

                  <View style={styles.buttonsContainer}>
                    <View style={styles.button}>
                      <Button
                        color={colors.accent}
                        title="Reset"
                        onPress={() => {
                          setFieldValue('guess', '');
                          setConfirmed(false);
                        }} />
                    </View>
                    <View style={styles.button}>
                      <Button
                        color={colors.primary}
                        title="Confirm"
                        onPress={() => {
                          handleSubmit();
                        }} />
                    </View>
                  </View>
                  {confirmedOutput}
                </>
              );
            }}
          </Formik>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    textAlign: 'center'
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {
    width: 100
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center'
  }
});

export default StartGame;
