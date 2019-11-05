import React, { Component } from 'react';
import { View,Image,StyleSheet } from 'react-native';
//import { ScrollView} from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';
import strings from 'tutorRN/src/service/strings'

import NewsHomeView from 'tutorRN/src/view/NewsHomeView'
import NewsDetailView from 'tutorRN/src/view/NewsDetailView'
import CommentPageView from 'tutorRN/src/view/CommentPageView'

const layout = require('tutorRN/src/Layout')

var NewsStack = StackNavigator({

  NewsHomeView: {
    screen: NewsHomeView ,
    navigationOptions: {
      
      //header:{ visible:false },
      header: null,
      //tabBarVisible: true,
      title: strings.home,
      tabBarOptions: { 
        showIcon: false,
        activeTintColor: 'red',
        inactiveTintColor: 'red',
        style: {
          backgroundColor:'red',
        }
      },
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('tutorRN/image/icons8-home-100.png')}
          //style={[styles.icon, { tintColor: tintColor }]}
          style={[layout.styles.icon, { tintColor: tintColor }]}
        />
      ),
      //tabBarOptions: {
      //  backgroundColor:'white',
      //  activeTintColor: 'black',
      //  inactiveTintColor: 'gray',
      //},
      
    },
   
  },

  NewsDetailView: { 
    screen: NewsDetailView,
    navigationOptions: {
      title: strings.home,
      tabBarIcon: ({ tintColor }) => (
        <Image
        source={require('tutorRN/image/icons8-home-100.png')}
          //style={[styles.icon, { tintColor: tintColor }]}
          style={[layout.styles.icon, { tintColor: tintColor }]}
        />
      ),
      //title: '搜尋33',
    },
  },
  CommentPageView:{
    screen:  CommentPageView,
    navigationOptions: {
      title: strings.profile,
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('tutorRN/image/icons8-customer-filled-100.png')}
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
          source={require('tutorRN/image/icons8-home-100.png')}
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
          source={require('tutorRN/image/icons8-home-100.png')}
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