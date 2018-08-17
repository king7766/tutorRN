import React, { Component } from 'react';
import { View } from 'react-native';
import { ScrollView} from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';

import SearchHomeView from '../view/SearchHomeView';
import SearchTutorView from '../view/SearchTutorView';
import SearchTutorDetailView from '../view/SearchTutorDetailView';
import SearchFilteringView from '/view/SearchFilteringView';

const layout = require('../Layout')

const SearchStack = StackNavigator({
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

  SearchFilteringView:{
    screen: SearchFilteringView,
    navigationOptions:{
      title: '搜尋',
    },
  }
});



export default SearchStack;