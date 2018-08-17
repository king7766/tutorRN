import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  DeviceEventEmitter,
} from 'react-native';

//import SearchStack from './src/SearchStack'
//import Welcome from './src/view/Welcome';

import AuthStack from './src/stack/AuthStack'
import Tabs from './src/Tabs'

import { StackNavigator, SwitchNavigator } from 'react-navigation'; // Version can be specified in package.json

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Show me more of the app" onPress={this._showMoreApp} />
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

class OtherScreen extends React.Component {
  static navigationOptions = {
    title: 'Lots of features here',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="I'm done, sign me out" onPress={this._signOutAsync} />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    console.log('_bootstrapAsync');
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//const AppStack = StackNavigator({ Home: HomeScreen, Other: OtherScreen });
//const AuthStack = StackNavigator({ SignIn: SignInScreen });

//const AppStack = StackNavigator({ Tabs });
//const AuthStack = StackNavigator({ Welcome: Welcome });


class onTopView extends Component {

  componentDidMount() {
    this.deEmitter = DeviceEventEmitter.addListener('add', (a) => {
        //alert('收到通知：' + a);
        console.log('addBtnOnClicked !!!!')
    });
  }

  render() {
    return (
      
    
        <Tabs 
          //style={{ zIndex: 0}}
          addBtnOnClicked={ this.addBtnOnClicked }
        />
      
    )
  }
}


export default SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: Tabs,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
