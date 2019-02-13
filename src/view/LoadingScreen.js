/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet
} from 'react-native';

const layout = require('tutorRN/src/Layout')


class LoadingScreen extends Component<Props> {

  constructor(props) {
    super(props);
    
  }

  componentWillMount() {

  }


  render() {

    return (
      <View style={[styles.container, styles.horizontal]}>
        
        <ActivityIndicator size="large" color="white" />
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})


export default LoadingScreen;


