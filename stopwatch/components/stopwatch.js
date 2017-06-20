import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import formatTime from 'minutes-seconds-milliseconds';

class StopWatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    };

    this.handleStartPress = this.handleStartPress.bind(this);
    this.handleLapPress = this.handleLapPress.bind(this);
  }

  handleStartPress() {
    if (this.state.running) {
      clearInterval(this.interval);
      this.setState({ running: false });
      return;
    }
    
    this.setState({startTime: new Date()});

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    }, 30);
  }

  handleLapPress() {
    const currentLapTime = this.state.timeElapsed;

    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([currentLapTime])
    });
  }

  renderStartStopButton() {
    const style = this.state.running ? styles.stopButton : styles.startButton;

    return (
      <TouchableHighlight 
        style={[styles.button, style]}
        underlayColor="gray"
        onPress={this.handleStartPress}
      >
        <Text>{ this.state.running ? 'Stop' : 'Start' }</Text>
      </TouchableHighlight>
    );
  }

  renderLapButton() {
    return (
      <TouchableHighlight 
        style={styles.button}
        underlayColor="gray"
        onPress={this.handleLapPress}
      >
        <Text>Lap</Text>
      </TouchableHighlight>
    );
  }

  renderLaps() {
    return (
      <View>
        { this.state.laps.map((time, index) => (
          <View style={styles.lap} key={index}>
            <Text style={styles.lapText}>Lap #{index + 1}</Text>
            <Text style={styles.lapText}>{formatTime(time)}</Text>
          </View>
        ))}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.timerWrapper}>
            <Text style={styles.timer}>
              { formatTime(this.state.timeElapsed) }
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            { this.renderStartStopButton() }
            { this.renderLapButton() }
          </View>
        </View>

        <View style={styles.footer}>
          { this.renderLaps() }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'stretch'
  },
  header: {
    flex: 1
  },
  footer: {
    flex: 1
  },
  timerWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#00CC00'
  },
  stopButton: {
    borderColor: '#CC0000'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  }
});

export default StopWatch;