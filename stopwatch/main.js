import Expo from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StopWatch from './components/stopwatch';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StopWatch />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

Expo.registerRootComponent(App);
