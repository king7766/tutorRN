import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import SearchHomeView from 'tutorRN/src/view/SearchHomeView';
import SearchTutorView from 'tutorRN/src/view/SearchTutorView';
import SearchTutorDetailView from 'tutorRN/src/view/SearchTutorDetailView';
import SearchFilteringView from 'tutorRN/src/view/SearchFilteringView';
import NewsDetailView from 'tutorRN/src/view/NewsDetailView';

import strings from 'tutorRN/src/service/strings'

const layout = require('tutorRN/src/Layout')

var SearchStack = StackNavigator({

  SearchHomeView: { 
    screen:  SearchHomeView,
    navigationOptions: {
      headerBackTitle: null,
      header: null,
      title: strings.search,
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('tutorRN/image/icons8-search-filled-100.png')}
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
      headerBackTitle: null,
      title: strings.search,
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('tutorRN/image/icons8-search-filled-100.png')}
          //style={[styles.icon, { tintColor: tintColor }]}
          style={[layout.styles.icon, { tintColor: tintColor }]}
        />
      ),
      //title: '搜尋22',
    },
  },

  
  SearchTutorDetailView: { 
    screen: SearchTutorDetailView,
    navigationOptions: {
      headerBackTitle: null,
      title: strings.search,
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('tutorRN/image/icons8-search-filled-100.png')}
          //style={[styles.icon, { tintColor: tintColor }]}
          style={[layout.styles.icon, { tintColor: tintColor }]}
        />
      ),
      //title: '搜尋33',
    },
  },
  

  SearchFilteringView:{
    screen: SearchFilteringView,
    navigationOptions:{
      headerBackTitle: null,
      title: strings.search,
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('tutorRN/image/icons8-search-filled-100.png')}
          //style={[styles.icon, { tintColor: tintColor }]}
          style={[layout.styles.icon, { tintColor: tintColor }]}
        />
      ),
      //title: '搜尋44',
    },
  },

  NewsDetailView: { 
    screen: NewsDetailView,
    navigationOptions: {
      headerBackTitle: null,
      title: strings.search,
      tabBarIcon: ({ tintColor }) => (
        <Image
        source={require('tutorRN/image/icons8-search-filled-100.png')}
          //style={[styles.icon, { tintColor: tintColor }]}
          style={[layout.styles.icon, { tintColor: tintColor }]}
        />
      ),
      //title: '搜尋33',
    },
  },
});



export default SearchStack;