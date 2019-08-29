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
  ScrollView,
  AsyncStorage,
} from 'react-native';

import * as M from 'tutorRN/src/service/membership'
import chatVM from 'tutorRN/src/VM/chatVM'
const chatViewModel = chatVM.getInstance()
import userVM from 'tutorRN/src/VM/userVM'
const userViewModel = userVM.getInstance()

import NoticeCell from './ui/NoticeCell'
import SegmentControl from './ui/SegmentControl'
import strings from '../service/strings'

const layout = require('tutorRN/src/Layout')


class NoticeHomeView extends Component<Props> {

  constructor(props) {
    super(props);
    // /this.handleFacebookLogin = this.handleFacebookLogin.bind(this)


    this.state = {
      sgData : ['所有課堂', '即將開始', '等待確認'],
      haveLogin : false,
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
          'id': '1',
          'read':true,
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
          'id': '2',
          'read':true,
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
          'id': '3',
          'read':false,
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
          'id': '4',
          'read':true,
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
          'id': '5',
          'read':false,
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
          'id': '6',
          'read':true,
        },
      ]
    };
    
  }

  async componentWillMount()
  {
    const userToken = await AsyncStorage.getItem('userToken')
    if ( userToken == 'guest' || userToken == null)
    {
      // Please login
      console.log('Notice haveLogin = no')
      this.setState({
        haveLogin: false
      })
    }
    else
    {
      console.log('Notice haveLogin = YES')
      this.setState({
        haveLogin: true
      })
    }

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

  goToLogin()
  {
    M.logoutAction();
  }

  async cellOnPressed (index)
  {
    console.log('going to chat : ' + index)
    const res = await chatViewModel.setUpInstance(userViewModel.getUser().user_id, index)

    if (res)
    {
      this.props.navigation.navigate('ChatHomeView',{
        //sender_id : res.sender_id,
        //receiver_id : res.receiver_id,
        update_token : res,
      })
    }
    
  }

  displayContent()
  {
    return (
      <ScrollView>
        {
          this.state.data.map((item, index) =>
            (
              
              <NoticeCell
                index = {index}
                key = {index}
                item = {item}
                //lesson = {item}
                //imageURL = {item.image}
                
                //title = {item.title}
                //content = {item.content}
                onPress= {(index)=>this.cellOnPressed(index)}
              />

            )
          )
        }
        </ScrollView>
    )
  }

  displayNonLoginContent()
  {
    return (
      <View 
        style = {{justifyContent: 'center',alignItems: 'center',flex:1 }}
      >
        <Text color='black'>
          {strings.notLoginErrorMessage}
        </Text>
        <Button
          onPress={this.goToLogin}
          title= {strings.loginText}
          color="#841584"
          //accessibilityLabel="Learn more about this purple button"
        />
      </View>
    )
  }

  render() {

    return (
      <View style = {layout.styles.basicViewStyle}>

        {
          this.state.haveLogin == true ? this.displayContent() : this.displayNonLoginContent()
        }
        
        

        
      </View>
      
    );
  }
}

export default NoticeHomeView;
