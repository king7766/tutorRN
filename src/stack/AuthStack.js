import React, { Component } from 'react';
import { View } from 'react-native';
import { ScrollView} from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';

import Welcome from 'tutorRN/src/view/Welcome';
import Register from 'tutorRN/src/view/Register';
//import SearchTutorDetailView from './view/SearchTutorDetailView';

const layout = require('tutorRN/src/Layout')

const AuthStack = StackNavigator({

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
      activeTintColor: '#e91e63',
      headerStyle: {
        borderBottomColor: layout.themeTextColor,
        borderBottomWidth: 1,
        backgroundColor: 'white',
      },

    },
  },
  
});



export default AuthStack;