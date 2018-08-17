/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView
} from 'react-native';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import SegmentControl from './ui/SegmentControl'

import TutorCVCell from './ui/TutorCVCell'
import CalendarCell from './ui/CalendarCell'
import TutorProfileTextBlock from './ui/TutorProfileTextBlock'
import TutorRatingBlock from './ui/TutorRatingBlock'


const layout = require('../Layout')


class SearchTutorDetailView extends Component<Props> {

  constructor(props) {
    super(props);
    // /this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
    //this.selectTutor = this.selectTutor.bind(this)


    this.state = {
      sgData : ['所有課堂', '即將開始', '等待確認'],
      data: 
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'name': '陳小明',
          'job': 'iOS 程式設計師',
          'exp': '10年工作經驗',
          'title': '中文大學學士',
          'gender': '男',
          'age': '40',
          'location' : '黃大仙',
          'description':'對某些人來說，技術分析可用以在看似混亂的證券市場中理出邏輯，利用過往的數據來預測未來；但對於另一些人來說，技術分析可能與占星術不相伯仲。然而，不論你的看法如何，技術分析在現今的證券市場擔當著舉足輕重的角色。',
          'achievement': 'HKAL - 中文(A), 英文(B)',
        },
      mark: {
        '2018-04-06': {selected: true, marked: true, selectedColor: 'blue'},
        '2018-04-07': {marked: true},
        '2018-04-08': {marked: true, dotColor: 'red', activeOpacity: 0},
        '2018-04-01': {selected: false, marked: true},
        '2018-04-05': {selected: true},
       
      } 
      
    }
  }

  

  componentWillMount() {

  }

  render() {

    const { params } = this.props.navigation.state;

    return (
      <View>
        <ScrollView>
          <TutorCVCell 
            tutor = {this.state.data}
          />

          <View style = {{backgroundColor:'rgba(233,233,233,1)', height: 5}}/>         

          <TutorProfileTextBlock
            arrowOn = {false}
            title = '學歷'
            description = {this.state.data.achievement}
          />

          <View style = {{backgroundColor:'rgba(233,233,233,1)', height: 5}}/>

          <TutorProfileTextBlock
            arrowOn = {false}
            title = '課程簡介'
            description = {this.state.data.description}
          />
          <View style = {{backgroundColor:'rgba(233,233,233,1)', height: 5}}/>

          <TutorRatingBlock
            arrowOn = {false}
          />
          <View style = {{backgroundColor:'rgba(233,233,233,1)', height: 5}}/>

          <CalendarCell />


        </ScrollView>
      </View>
      
    );
  }
}

export default SearchTutorDetailView;


const styles = StyleSheet.create ({
  descriptionBG:{
    backgroundColor: 'white',
    padding:10,
  },

  descriptionTitle:{
    color: 'rgba(41,62,107,1)',
    //backgroundColor: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    //padding : 10,
    //paddingLeft : 10,

  },
  description:{
    lineHeight:20,
    fontSize: 14,
    paddingTop: 10,
    //paddingLeft: 10,
    // paddingLeft: 10,
    //paddingLeft : 10,
  },

});