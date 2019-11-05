import React, { Component } from 'react';
import { View,Image,StyleSheet } from 'react-native';
import { ScrollView} from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';

import NoticeHomeView from 'tutorRN/src/view/NoticeHomeView'
import NewsDetailView from 'tutorRN/src/view/NewsDetailView'
import ChatHomeView from 'tutorRN/src/view/ChatHomeView'
import strings from 'tutorRN/src/service/strings'


const layout = require('tutorRN/src/Layout')

const NoticeStack = StackNavigator({

  NoticeHomeView: { 
    screen:  NoticeHomeView,
    navigationOptions: {
      title: strings.notice,
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('tutorRN/image/icons8-document-filled-100.png')}
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
  ChatHomeView :{
    screen: ChatHomeView,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('tutorRN/image/icons8-document-filled-100.png')}
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
        source={require('tutorRN/image/icons8-home-100.png')}
          //style={[styles.icon, { tintColor: tintColor }]}
          style={[layout.styles.icon, { tintColor: tintColor }]}
        />
      ),
      //title: '搜尋33',
    },
  },


});



export default NoticeStack;

const styles = StyleSheet.create({
  icon: {
    marginTop: 15,
    width: 30,
    height: 30,
  },
});