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

import targetUserVM from 'tutorRN/src/VM/targetUserVM'
const targetUserViewModel = targetUserVM.getInstance()
//targetUserViewModel

import NoticeCell from './ui/NoticeCell'
import SegmentControl from './ui/SegmentControl'
import strings from '../service/strings'

const layout = require('tutorRN/src/Layout')


class NoticeHomeView extends Component<Props> {

  constructor(props) {
    super(props);
    this.cellOnPressed = this.cellOnPressed.bind(this)
    // /this.handleFacebookLogin = this.handleFacebookLogin.bind(this)


    this.state = {
      sgData : ['所有課堂', '即將開始', '等待確認'],
      haveLogin : false,
      data: [
        {
          user_id:1,
          'oppo_id':2,
          oppo_name: '陸永權',
          'type': 1,
          last_updated:'2019-09-04',
          lesson_id:3,
          lesson_name:'英國語文',
          lesson_date:'2019-06-09',
          message:'你好',


        
        },
        {
          user_id:1,
          oppo_id:2,
          oppo_name: '陸永權',
          type: 2,
          last_updated:'2019-09-04',
          lesson_id:3,
          lesson_name:'英國語文',
          lesson_date:'2019-06-09',
          message:'你好',
        },
        {
          user_id:1,
          oppo_id:2,
          oppo_name: '陸永權',
          type: 3,
          last_updated:'2019-09-04',
          lesson_id:3,
          lesson_name:'英國語文',
          lesson_date:'2019-06-09',
          message:'你好',
        },
        {
          user_id:1,
          oppo_id:2,
          oppo_name: '陸永權',
          type: 4,
          last_updated:'2019-09-04',
          lesson_id:3,
          lesson_name:'英國語文',
          lesson_date:'2019-06-09',
          message:'你好',
        },
        {
          user_id:1,
          oppo_id:2,
          oppo_name: '陸永權',
          type: 5,
          last_updated:'2019-09-04',
          lesson_id:3,
          lesson_name:'英國語文',
          lesson_date:'2019-06-09',
          message:'你好',
        },
        {
          user_id:1,
          oppo_id:2,
          oppo_name: '陸永權',
          type: 6,
          last_updated:'2019-09-04',
          lesson_id:3,
          lesson_name:'英國語文',
          lesson_date:'2019-06-09',
          message:'你好',
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
    console.log('index : ' + index)
    var item = this.state.data[index]
    console.log('going to chat : ' + item.oppo_id)
    if ( item.type == 3 || item.type == 6)
    {
      //const res = await chatViewModel.setUpInstance(userViewModel.getUser().user_id, item.oppo_id)
      const res = await chatViewModel.setUpInstance(1, 4)
      if (res)
      {
        this.props.navigation.navigate('ChatHomeView',{
        
          update_token : res,
        })
      }
    }else if ( item.type == 1){
      // go to user profile
      this.props.navigation.navigate('ProfileHomeView');

      /*
      NavigationActions.navigate({
        routeName: 'App',
        action: NavigationActions.navigate({
          routeName: 'ProfileHomeView'
       })
      })
      */
    }else if ( item.type == 2){
      // go to lesson profile

      /*
      var tutor_id = 3
      var lesson_id = 2
      const flag = await targetUserViewModel.setUserProfile(tutor_id)
      if ( flag ){

        this.props.navigation.navigate('NewsDetailView',{
          lessonDetailShow: true,
          tutor : targetUserViewModel.getUserProfile(),
          tutor_id : targetUserViewModel.getUserProfile().user_id,
          lesson_id : lesson_id,
        })

      }
      */
    }else if ( item.type == 4){
      // no action here
      
    }else if ( item.type == 5){
      // go rating 
      
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
                //onPress= {(index)=>this.cellOnPressed(index)}
                onPress= {this.cellOnPressed}
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
