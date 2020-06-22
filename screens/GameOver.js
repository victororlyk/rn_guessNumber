import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { useLocation, useHistory } from 'react-router-native';
import BodyText from '../components/Text/BodyText';
import TitleText from '../components/Text/TitleText';
import MainButton from '../components/MainButton';

const GameOver = () => {
  const location = useLocation();
  const history = useHistory();
  console.log(location, 'here');
  return (
    <View style={styles.screen}>
      <TitleText>Game is over</TitleText>
      <Image style={styles.image} resizeMode='cover' source={require('../assets/original.png')} />
      <BodyText>It took computer {location.state.numberOfRound} rounds</BodyText>
      <MainButton onPress={() => history.push('/')}>Start Over</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '80%',
    height: 300,
    overflow: 'hidden',
    borderRadius: 200,
    borderWidth: 2,
    borderColor: '#000'
  }
});

export default GameOver;
