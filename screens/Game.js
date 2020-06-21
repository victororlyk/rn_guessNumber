import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { useLocation, useHistory } from 'react-router-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

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

const Game = () => {
  const location = useLocation();
  const history = useHistory();

  const min = useRef(1);
  const max = useRef(100);
  const guesses = useRef(0);

  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(
    min.current,
    max.current,
    location.state.selectedNumber)
  );

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
      Alert.alert('Don\'t lie', 'My Alert Msg', [{ text: 'Sorry', style: 'cancel' }]);
      return;
    }
    if (direction === 'lower') {
      console.log('should changemax');
      max.current = currentGuess;
    } else {
      console.log('should changemin');
      min.current = currentGuess;
    }
    console.log(min, max);
    const nextNumber = generateRandomBetween(min.current, max.current);
    guesses.current += 1;
    setCurrentGuess(nextNumber);
  };

  return (
    <View style={styles.screen}>
      <Text>computer guess</Text>
      <NumberContainer selectedNumber={currentGuess} />
      <Card customStyles={styles.buttonContainer}>
        <Button title='LOWER' onPress={nextGuessHandler.bind(null, 'lower')} />
        <Button title='GREATER' onPress={nextGuessHandler.bind(null, 'greater')} />
      </Card>
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
    justifyContent: 'space-around',
    marginTop: 20
  }
});

export default Game;
