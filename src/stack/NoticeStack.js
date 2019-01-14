import React, { Component } from 'react';
import { View } from 'react-native';
import { ScrollView} from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';

import NoticeHomeView from 'tutorRN/src/view/NoticeHomeView';



const layout = require('tutorRN/src/Layout')

const NoticeStack = StackNavigator({

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


});



export default NoticeStack;