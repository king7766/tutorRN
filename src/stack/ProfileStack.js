import React, { Component } from 'react';
import { View } from 'react-native';
import { ScrollView} from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';

import ProfileHomeView from '../view/ProfileHomeView';



const layout = require('../Layout')

const ProfileStack = StackNavigator({

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


});



export default ProfileStack;