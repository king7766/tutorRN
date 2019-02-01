import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { ScrollView} from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';

import SearchHomeView from 'tutorRN/src/view/SearchHomeView';
import SearchTutorView from 'tutorRN/src/view/SearchTutorView';
import SearchTutorDetailView from 'tutorRN/src/view/SearchTutorDetailView';
import SearchFilteringView from 'tutorRN/src/view/SearchFilteringView';

//import * as Strings from 'tutorRN/src/service/strings'
import strings from 'tutorRN/src/service/strings'

const layout = require('tutorRN/src/Layout')

var SearchStack = StackNavigator({

  SearchHomeView: { 
    screen:  SearchHomeView,
    navigationOptions: {
      title: strings.search,
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('tutorRN/src/image/icon-math.png')}
          //style={[styles.icon, { tintColor: tintColor }]}
          style={[layout.styles.icon, { tintColor: tintColor }]}
        />
      ),
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
      //title: '搜尋22',
    },
  },

  SearchTutorDetailView: { 
    screen: SearchTutorDetailView,
    navigationOptions: {
      //title: '搜尋33',
    },
  },

  SearchFilteringView:{
    screen: SearchFilteringView,
    navigationOptions:{
      //title: '搜尋44',
    },
  }
});



export default SearchStack;