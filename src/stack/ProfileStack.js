import React, { Component } from 'react';
import { View } from 'react-native';
import { ScrollView} from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';

import ProfileHomeView from 'tutorRN/src/view/ProfileHomeView';
import strings from 'tutorRN/src/service/strings'


const layout = require('tutorRN/src/Layout')

const ProfileStack = StackNavigator({

  ProfileHomeView: { 
    screen:  ProfileHomeView,
    navigationOptions: {
      title: strings.profile,
      headerStyle: {
        borderBottomColor: layout.themeTextColor,
        borderBottomWidth: 1,
        backgroundColor: 'white',
      },
    },
  },


});



export default ProfileStack;