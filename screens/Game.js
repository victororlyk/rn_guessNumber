import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Button } from 'react-native';
import { useLocation, useHistory } from 'react-router-native';
import { Ionicons } from '@expo/vector-icons';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import TitleText from '../components/Text/TitleText';
import MainButton from '../components/MainButton';
import BodyText from '../components/Text/BodyText';

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (item) => (
  <View key={item} style={styles.list}>
    <BodyText>{item}</BodyText>
  </View>
);

const Game = () => {
  const min = useRef(1);
  const max = useRef(100);
  const guesses = useRef(0);

  const location = useLocation();
  const history = useHistory();

  const initialGuess = generateRandomBetween(min.current, max.current, location.state.selectedNumber);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === location.state.selectedNumber) {
      history.push({
        pathname: '/gameover',
        state: {
          numberOfRound: guesses.current
        }
      });
    }

  }, [currentGuess]);

  const nextGuessHandler = direction => {
    if ((location.state.selectedNumber > currentGuess && direction === 'lower') || (location.state.selectedNumber < currentGuess && direction === 'greater')) {
      console.log('wrong advice');
      Alert.alert('Don\'t lie', 'We know this is opposite', [{ text: 'Sorry', style: 'cancel' }]);
      return;
    }
    if (direction === 'lower') {
      max.current = currentGuess;
    } else {
      min.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(min.current, max.current);
    guesses.current += 1;
    setPastGuesses(prevState => [nextNumber, ...prevState]);
    setCurrentGuess(nextNumber);
  };

  return (
    <View style={styles.screen}>
      <TitleText>Computer guessed</TitleText>
      <NumberContainer selectedNumber={currentGuess} />
      <Card customStyles={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(null, 'lower')}>
          <Ionicons name='md-remove' size={24} color='white' />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(null, 'greater')}>
          <Ionicons name='md-add' size={24} color='white' />
        </MainButton>
      </Card>
      <View style={styles.scrollView}>
        <ScrollView>
          {pastGuesses.map(renderListItem)}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '60%'
  },
  scrollView:{
    flex: 1,
    width: '70%'
  },
  list: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Game;
