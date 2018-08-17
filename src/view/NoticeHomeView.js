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

//import segmentedControl from '../segmentedControlMain'

//import NewsCell from './ui/NewsCell'
import NoticeCell from './ui/NoticeCell'
import SegmentControl from './ui/SegmentControl'
const layout = require('../Layout')


class NoticeHomeView extends Component<Props> {

  constructor(props) {
    super(props);
    // /this.handleFacebookLogin = this.handleFacebookLogin.bind(this)


    this.state = {
      sgData : ['所有課堂', '即將開始', '等待確認'],
      data: [
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'content': 'content111',
          'day' : '2018-05-10',
          'title': 'title 111',
          'name' : '李小明',
          'location' : '深水埗',
          'price' : '500',
          'subject' : '英國語文',
          'startTime' : '0900 am',
          'endTime' : '1000 am',
          'rating' : '4.5',
          'type' : 1,
          'id': '1'
        },
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'content': 'content111',
          'title': 'title 111',
          'day' : '2018-05-10',
          'location' : '深水埗',
          'name' : '李小明',
          'price' : '500',
          'subject' : '英國語文',
          'startTime' : '0900 am',
          'endTime' : '1000 am',
          'rating' : '4.5',
          'type' : 2,
          'id': '2'
        },
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'content': 'content111',
          'title': 'title 111',
          'day' : '2018-05-10',
          'location' : '深水埗',
          'name' : '李小明',
          'price' : '500',
          'subject' : '英國語文',
          'startTime' : '0900 am',
          'endTime' : '1000 am',
          'rating' : '4.5',
          'type' : 3,
          'id': '3'
        },
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'content': 'content111',
          'title': 'title 111',
          'day' : '2018-05-10',
          'location' : '深水埗',
          'name' : '李小明',
          'price' : '500',
          'subject' : '英國語文',
          'startTime' : '0900 am',
          'endTime' : '1000 am',
          'rating' : '4.5',
          'type' : 1,
          'id': '4'
        },
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'content': 'content111',
          'title': 'title 111',
          'day' : '2018-05-10',
          'location' : '深水埗',
          'name' : '李小明',
          'price' : '500',
          'subject' : '英國語文',
          'startTime' : '0900 am',
          'endTime' : '1000 am',
          'rating' : '4.5',
          'type' : 2,
          'id': '5'
        },
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'content': 'content111',
          'title': 'title 111',
          'day' : '2018-05-10',
          'location' : '深水埗',
          'name' : '李小明',
          'price' : '500',
          'subject' : '英國語文',
          'startTime' : '0900 am',
          'endTime' : '1000 am',
          'rating' : '4.5',
          'type' : 2,
          'id': '6'
        },
      ]
    };
    
  }

  componentDidMount() {
        const params = {
            right: (
                <Button
                    onPress={() => { this.save(); }}
                    title={"Save"}
                />
            ),
        };
        
        this.props.navigation.setParams(params);
  }

  tabOnClicked(index, key ){
    console.log('tabOnClicked ' + index + ' , ' + key)
  }

  render() {



    return (
      <View>
        
        

        <ScrollView>
        {
          this.state.data.map((item, index) =>
            (
              
              <NoticeCell
                key = {index}
                item = {item}
                //lesson = {item}
                imageURL = {item.image}
                
                title = {item.title}
                content = {item.content}
              />

            )
          )
        }
        </ScrollView>
      </View>
      
    );
  }
}

export default NoticeHomeView;
