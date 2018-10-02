import React, { Component } from 'react';
import { View,Image,StyleSheet } from 'react-native';
//import { ScrollView} from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';

import NewsHomeView from '/view/NewsHomeView';
const layout = require('/Layout')

const NewsStack = StackNavigator({

  NewsHomeView: {
    screen: NewsHomeView ,
    
    

    navigationOptions: {
      
      //header:{ visible:false },
      header: null,
      //tabBarVisible: true,
      title:'新聞',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../image/icon-math.png')}
          //style={[styles.icon, { tintColor: tintColor }]}
          style={[layout.styles.icon, { tintColor: tintColor }]}
        />
      ),
      /*
      title:'新聞',
      //title:'',
      activeTintColor: '#e91e63',
      headerLeft: null,
      headerVisible: false,
      //navBarBackgroundColor: '#f7f7f7',
      headerStyle: {
        borderBottomColor: layout.themeTextColor,
        borderBottomWidth: 1,
        backgroundColor: 'white',
      },
      */
    }
    
  }


});



export default NewsStack;

const styles = StyleSheet.create({
  icon: {
    marginTop: 15,
    width: 30,
    height: 30,
  },
});