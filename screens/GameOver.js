import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocation, useHistory } from 'react-router-native';

const GameOver = () => {
  const location = useLocation();
  const history = useHistory();
  console.log(location, 'here');
  return (
    <View style={styles.screen}>
      <Text>Game Over it took computer {location.state.numberOfRound} rounds</Text>
      <Button title='start over' onPress={() => history.push('/')} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
});

export default GameOver;
