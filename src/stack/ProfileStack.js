import React, { Component } from 'react';
import { View,Image,StyleSheet } from 'react-native';
import { ScrollView} from 'react-native';

import { TabNavigator, StackNavigator } from 'react-navigation';

import ProfileHomeView from 'tutorRN/src/view/ProfileHomeView';
import ProfileHomeEditView from 'tutorRN/src/view/ProfileHomeEditView';
import strings from 'tutorRN/src/service/strings'


const layout = require('tutorRN/src/Layout')

const ProfileStack = StackNavigator({

  ProfileHomeView: { 
    screen:  ProfileHomeView,
    navigationOptions: {
      title: strings.profile,
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('tutorRN/src/image/icons8-customer-filled-100.png')}
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

  ProfileHomeEditView:{
    screen:  ProfileHomeEditView,
    navigationOptions: {
      title: strings.profile,
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('tutorRN/src/image/icons8-customer-filled-100.png')}
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


});



export default ProfileStack;

const styles = StyleSheet.create({
  icon: {
    marginTop: 15,
    width: 30,
    height: 30,
  },
});