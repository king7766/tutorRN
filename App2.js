/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { TabNavigator, StackNavigator, SwitchNavigator} from 'react-navigation';

import NewsStack from './src/stack/NewsStack'
import LessonsStack from './src/stack/LessonsStack'
const layout = require('./src/Layout')

// Tab 1
import Welcome from './src/view/Welcome'
import Register from './src/view/Register'
import NewsHomeView from './src/view/NewsHomeView'

// Tab 2
import LessonHomeView from './src/view/LessonHomeView'

// Tab 3
import SearchHomeView from './src/view/SearchHomeView'
import SearchTutorView from './src/view/SearchTutorView'
import SearchTutorDetailView from './src/view/SearchTutorDetailView'

// Tab 4
import NoticeHomeView from './src/view/NoticeHomeView'

// Tab 5
import ProfileHomeView from './src/view/ProfileHomeView'


import AuthLoadingScreen from './src/view/AuthLoadingScreen'

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};


const Tabs = TabNavigator({

  weclome:{
    screen: StackNavigator({

      Welcome: { 
        screen: Welcome,
        navigationOptions: {

          header: null,
          //initialRouteName: 'Splash',
          //headerMode: 'screen',
          tabBarVisible: false,
          
          //title: 'Welcome',
        },
       },

      Register: {
        screen: Register ,
        navigationOptions: {
          tabBarVisible: false,
          title:'註冊',
          activeTintColor: '#e91e63'

        },
      },

      NewsHomeView: {
        screen: NewsHomeView ,
        navigationOptions: {
          tabBarVisible: true,
          title:'新聞',
          activeTintColor: '#e91e63',
          headerLeft: null,
          //navBarBackgroundColor: '#f7f7f7',
          headerStyle: {
            borderBottomColor: layout.themeTextColor,
            borderBottomWidth: 1,
            backgroundColor: 'white',
          },

        },
      }

    })
  },

  lesson:{
    screen: StackNavigator({
      Welcome: { 
        screen:  LessonHomeView,
        navigationOptions: {
          title: '課堂',
          
          headerStyle: {
            borderBottomColor: layout.themeTextColor,
            borderBottomWidth: 1,
            backgroundColor: 'white',

            //shadowRadius: 0,
            //shadowOffset: {
            //    height: 0,
            //},
            //borderBottomWidth: 10,
          }

        },
      },
      Register: { screen: Register }
    })
  },

  add:{
    screen: StackNavigator({
      SearchHomeView: { 
        screen:  SearchHomeView,
        navigationOptions: {
          title: '搜尋',
          headerStyle: {
            borderBottomColor: layout.themeTextColor,
            borderBottomWidth: 1,
            backgroundColor: 'white',
          },
        },
      },
      SearchTutorView: { 
        screen: SearchTutorView,
        navigationOptions: {
          title: '搜尋',
        },
      },

      SearchTutorDetailView: { 
        screen: SearchTutorDetailView,
        navigationOptions: {
          title: '搜尋',
        },
      },
    })
  },

  notice:{
    screen: StackNavigator({
      NoticeHomeView: { 
        screen:  NoticeHomeView,
        navigationOptions: {
          title: '通知',
          headerStyle: {
            borderBottomColor: layout.themeTextColor,
            borderBottomWidth: 1,
            backgroundColor: 'white',
          },
        },
      },
      Register: { screen: Register }
    })
  },

  ProfileHomeView:{
    screen: StackNavigator({
      ProfileHomeView: { 
        screen:  ProfileHomeView,
        navigationOptions: {
          title: '個人',
          headerStyle: {
            borderBottomColor: layout.themeTextColor,
            borderBottomWidth: 1,
            backgroundColor: 'white',
          },
        },
      },
      Register: { screen: Register }
    })
  },


},{
  lazy: true
}
);


export default class App extends Component<Props> {
  render() {
    return (
      <Tabs />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
