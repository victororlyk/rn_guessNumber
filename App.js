import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';
import Header from './components/Header';
import StartGame from './screens/StartGame';
import Game from './screens/Game';
import GameOver from './screens/GameOver';

export default function App() {
  return (
    <View style={styles.screen}>
      <Header title='Guess a Number' />
      <NativeRouter>
        <Route exact path='/' component={StartGame} />
        <Route path='/game' component={Game} />
        <Route path='/gameover' component={GameOver} />
      </NativeRouter>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
