import React, { Component } from 'react';
import { View,Icon } from 'react-native';
import { ScrollView} from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';

import LessonHomeView from 'tutorRN/src/view/LessonHomeView';



const layout = require('tutorRN/src/Layout')

const LessonStack = StackNavigator({

  LessonHomeView: { 
    screen:  LessonHomeView,
    navigationOptions: {
      title: '',
      
      
      headerStyle: {
        borderBottomColor: layout.themeTextColor,
        borderBottomWidth: 1,
        backgroundColor: 'white',

        //shadowRadius: 0,
        //shadowOffset: {
        //    height: 0,
        //},
        //borderBottomWidth: 10,
      },

      //tabBarIcon: ({tintColor}) => <Icon name='book' size={22} color={tintColor} />
      
    },
  },


});



export default LessonStack;