import React, { Component } from 'react';
import { View,Image,StyleSheet } from 'react-native';
//import { ScrollView} from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';
import strings from 'tutorRN/src/service/strings'

import SearchHomeView from 'tutorRN/src/view/SearchHomeView';
import NewsHomeView from 'tutorRN/src/view/NewsHomeView'
import NewsDetailView from 'tutorRN/src/view/NewsDetailView'


const layout = require('tutorRN/src/Layout')

var NewsStack = StackNavigator({

  NewsHomeView: {
    screen: NewsHomeView ,
    navigationOptions: {
      
      //header:{ visible:false },
      header: null,
      //tabBarVisible: true,
      title: strings.home,
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('tutorRN/src/image/icons8-home-100.png')}
          //style={[styles.icon, { tintColor: tintColor }]}
          style={[layout.styles.icon, { tintColor: tintColor }]}
        />
      ),
      
    },
  },

  NewsDetailView: { 
    screen: NewsDetailView,
    navigationOptions: {
      title: strings.home,
      tabBarIcon: ({ tintColor }) => (
        <Image
        source={require('tutorRN/src/image/icons8-home-100.png')}
          //style={[styles.icon, { tintColor: tintColor }]}
          style={[layout.styles.icon, { tintColor: tintColor }]}
        />
      ),
      //title: '搜尋33',
    },
  },

  
})
/*
var NewsStack = StackNavigator({

 
  

  NewsHomeView: {
    screen: NewsHomeView ,
    navigationOptions: {
      
      //header:{ visible:false },
      header: null,
      //tabBarVisible: true,
      title: strings.home,
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('tutorRN/src/image/icons8-home-100.png')}
          //style={[styles.icon, { tintColor: tintColor }]}
          style={[layout.styles.icon, { tintColor: tintColor }]}
        />
      ),
      
    },
    NewsDetailView: { 
      screen: NewsDetailView,
      navigationOptions: {
        title: strings.home,
        tabBarIcon: ({ tintColor }) => (
          <Image
          source={require('tutorRN/src/image/icons8-home-100.png')}
            //style={[styles.icon, { tintColor: tintColor }]}
            style={[layout.styles.icon, { tintColor: tintColor }]}
          />
        ),
        //title: '搜尋33',
      },
    },
  },
  



});

*/

export default NewsStack;

const styles = StyleSheet.create({
  icon: {
    marginTop: 15,
    width: 30,
    height: 30,
  },
});