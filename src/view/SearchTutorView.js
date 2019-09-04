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

//import SegmentControl from './ui/SegmentControl'
//import LessonListCell from './ui/LessonListCell'

import {
  SegmentControl,
  LessonListCell,
  RowMenuListingBar
} from 'tutorRN/src/view/ui/UIComponent';





import courseVM from 'tutorRN/src/VM/courseVM'
import categoryVM from 'tutorRN/src/VM/categoryVM'
import courseTagVM from 'tutorRN/src/VM/courseTagVM'
import targetUserVM from 'tutorRN/src/VM/targetUserVM'

const layout = require('tutorRN/src/Layout')
const courseViewModel = courseVM.getInstance()
const categoryViewModel = categoryVM.getInstance()
const courseTagViewModel = courseTagVM.getInstance()
const targetUserViewModel = targetUserVM.getInstance()

class SearchTutorView extends Component<Props> {

  constructor(props) {
    super(props);
    
    
    // /this.handleFacebookLogin = this.handleFacebookLogin.bind(this)
    const { params } = this.props.navigation.state;
    const tag = params ? params.tag : null
    this.selectLessonWithIndex = this.selectLessonWithIndex.bind(this)

    console.log('tag = ' +courseViewModel.getCourseByTag(tag))
    this.state = {
      sgData : ['所有課堂', '即將開始', '等待確認'],
      tag: tag,
      data: courseViewModel.getCourseByTag(tag)
      /*
      data: [
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'name': '陳小明',
          'id': 1,
          'subject': '英國語文',
          'rating': 4.5,
          'location': '赤柱',
          'price' : 100
        },
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'name': '陳小明',
          'id': 2,
          'subject': '英國語文',
          'rating': 4.5,
          'location': '赤柱',
          'price' : 100
        },
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'name': '陳小明',
          'id': 3,
          'subject': '英國語文',
          'rating': 4.5,
          'location': '赤柱',
          'price' : 100
        },
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'name': '陳小明',
          'id': 4,
          'subject': '英國語文',
          'rating': 4.5,
          'location': '赤柱',
          'price' : 100
        },
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'name': '陳小明',
          'id': 5,
          'subject': '英國語文',
          'rating': 4.5,
          'location': '赤柱',
          'price' : 100
        },
      ]
      */
    };

    console.log('data = ' + this.state.data)
  }

  componentWillMount() {

  }

  tabOnClicked(index, key ){
    console.log('tabOnClicked ' + index + ' , ' + key)
  }

  async selectLessonWithIndex ( item ){
    console.log('selectLessonWithIndex ' + item.id)

    var lesson_id = item.id
    var tutor_id = 3

    const flag = await targetUserViewModel.setUserProfile(tutor_id)

    if( flag ){
      this.props.navigation.navigate('NewsDetailView',{
        lessonDetailShow: true,
        tutor : targetUserViewModel.getUserProfile(),
        tutor_id : targetUserViewModel.getUserProfile().user_id,
        lesson_id : lesson_id,
      })
    }

    /*
    this.props.navigation.navigate('NewsDetailView',{
      lesson_id: this.state.data[index].id,
      tutor_id : 1,
      lessonDetailShow: true,
      //id :'121',
      //allowEdit: false,
      }
    )
    */
  }

  async TopMenuBarOnClicked(index)
  {
   
    if ( index == 0 )
    {

    }
    else
    {

    
     
    }
    console.log('TopMenuBarOnClicked :' + index)  
  }

  render() {

    const { params } = this.props.navigation.state;
    //const location = params ? params.location : null;
    //const district = params ? params.district : null;
    //const education = params ? params.education : null;
    //const subject = params ? params.subject : null;

    var condition = ['',categoryViewModel.getCategoryNameByID( this.state.tag)]

    return (
      <View>
        
        <RowMenuListingBar 
          firstItemShowIcon = {true}
          //data = {['推介', '限時', '優惠', '熱門', '節日', '新到', '復古']}
          data = {condition}
          size = {50}
          itemHeight = {30}
          itemWidth = {50}
          selected = {0}
          multiSelect = {true}
          onClicked={ this.TopMenuBarOnClicked }
        />
        <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>
        <ScrollView>
        {
          
          this.state.data.map((item, index) =>
            (
              <LessonListCell
                key = {index}
                onClicked = {()=>this.selectLessonWithIndex(item) }
                id = {item.id}
                item = {item}
                action = {false}
              />
              
            )
          )
          
        }
        </ScrollView>
      </View>
      
    );
  }
}

export default SearchTutorView;


/*

<SegmentControl
          onClicked = {this.tabOnClicked}
          data = {condition}
          touchColor = {'transparent'}
          textColor = {'rgba(216,72,118,1)'}
          numberOfItem = {4}
          pressEnable = {false}
          //touchColor = {'rgba(216,72,118,1)'}
        />
        */