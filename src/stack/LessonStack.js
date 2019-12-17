import React, { Component } from 'react';
import { View,Icon, Image } from 'react-native';
import { ScrollView} from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';

import LessonHomeView from 'tutorRN/src/view/LessonHomeView';



const layout = require('tutorRN/src/Layout')

const LessonStack = StackNavigator({

  LessonHomeView: { 
    screen:  LessonHomeView,
    //screen:  null,
    navigationOptions: {
      title: '',
      //iconLogoWhite
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('tutorRN/image/iconLogoWhite.png')}
          //style={[styles.icon, { tintColor: tintColor }]}
          style={[layout.styles.icon, { tintColor: tintColor }]}
        />
      ),
      
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