import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  DeviceEventEmitter,
  SafeAreaView
} from 'react-native';
import { TabNavigator, StackNavigator, SwitchNavigator, NavigationActions, createBottomTabNavigator} from 'react-navigation';
import { BottomNavigation } from 'react-native-paper';


import Welcome from './view/Welcome'

const layout = require('./Layout')

// Tab 1
import NewsStack from './stack/NewsStack'

// Tab 2
import LessonStack from './stack/LessonStack'

// Tab 3
import SearchStack from './stack/SearchStack'

// Tab 4
import NoticeStack from './stack/NoticeStack'

// Tab 5
import ProfileStack from './stack/ProfileStack'
import { action } from 'tutorRN/src/node_modules/mobx';
import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';


export default class MyComponent extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'music', title: 'Music', icon: 'queue-music' },
      { key: 'albums', title: 'Albums', icon: 'album' },
      { key: 'recents', title: 'Recents', icon: 'history' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    music: NewsStack,
    albums: NewsStack,
    recents: NewsStack,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}