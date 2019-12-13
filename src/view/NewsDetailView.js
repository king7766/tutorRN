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
  FlatList,
  SafeAreaView,
  Button,
  Image,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Modal
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';


import { Rating } from 'react-native-ratings';
import { AirbnbRating } from 'react-native-ratings';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import SegmentControl from './ui/SegmentControl'

import targetUserVM from 'tutorRN/src/VM/targetUserVM'
import TutorCVCell from './ui/TutorCVCell'
import CalendarCell from './ui/CalendarCell'
import TutorProfileBlock from 'tutorRN/src/view/ui/TutorProfileBlock'
import TutorProfileTextBlock from './ui/TutorProfileTextBlock'
import TutorRatingBlock from './ui/TutorRatingBlock'
import strings from 'tutorRN/src/service/strings'
import LessonDetailView from 'tutorRN/src/view/LessonDetailView'
import Assets from './ui/Assets';

import locationVM from 'tutorRN/src/VM/locationVM'
import courseVM from 'tutorRN/src/VM/courseVM'

const courseViewModel = courseVM.getInstance()
const locationViewModel = locationVM.getInstance()
const layout = require('tutorRN/src/Layout')
const targetUserViewModel = targetUserVM.getInstance()

class NewsDetailView extends Component<Props> {

  constructor(props) {
    super(props);


    this.lessonContent = this.lessonContent.bind(this)
    this.ratingBlockOnClicked = this.ratingBlockOnClicked.bind(this)
    this.lessonDetailBackBtnOnClicked = this.lessonDetailBackBtnOnClicked.bind(this)

    //console.log('1 lesson_id = ' + props.navigation.state.params.lesson_id)
    this.state = {
      params: props.navigation.state.params,
      
      lessonDetailViewVisible : props.navigation.state.params.lessonDetailShow,
      //lessonDetailViewVisible: props.navigation.state.params.lessonDetailShow,
      
      lesson_id : props.navigation.state.params.lesson_id,
      
      //lessonDetailViewVisible : this.props.lessonDetailShow ? this.props.lessonDetailShow : false,
      sgData : ['所有課堂', '即將開始', '等待確認'],
      data: 
        {
          'image': 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=c36a9365035e76d990a0b0ca07145494&oe=5B55A6D7',
          'user_nickname': '陳小明',
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
       
      } ,

      
    }
  }

  

  componentWillMount() {
    
  }
 
  componentDidMount(){
    //this.setState({
    //  lessonDetailViewVisible : this.state.params.lessonDetailShow ? this.state.params.lessonDetailShow : false,
    //})
  }

  ratingBlockOnClicked()
  {
    console.log('ratingBlockOnClicked');
    this.props.navigation.navigate('CommentPageView',{})
  }

  lessonDetailBackBtnOnClicked()
  {
    console.log('lessonDetailBackBtnOnClicked ')
    this.setState({
      lessonDetailViewVisible : false,
      fullScreenViewerVisible : false,
    })
  }

  photoThumbnailImageOnClicked(index)
  {
    console.log('NewsDetailView - photoThumbnailImageOnClicked : ' + index)
    
    this.setState({
      lessonDetailViewVisible : false,
      fullScreenViewerVisible : true,
      thumbnailImageOnClickedIndex: index,
    })
  }

  photoThumbnailAddBtnOnClicked ()
  {
    console.log('photoThumbnailAddBtnOnClicked')
  }

  lessonContent ()
  {
    //console.log('lesson_id = ' + this.state.params.lesson_id)
    //let result = this.state.params.tutor.course_list.map(a => a.id);

    var lesson_id = this.state.lesson_id
    const result = this.state.params.tutor.course_list.filter(course => course.id == lesson_id);

    var imageSource = result[0].course_media_list

    var ImageViewerArray = []
    for ( var i = 0; i < imageSource.length ; i ++)
    {
      ImageViewerArray.push({url:imageSource[i].media_file})
    }

    if (this.state.lessonDetailViewVisible){
      return (
        <LessonDetailView 
          course = {result[0]}
          //course = target
          photoThumbnailImageOnClicked = {(index)=>this.photoThumbnailImageOnClicked(index)}
          photoThumbnailAddBtnOnClicked = {this.photoThumbnailAddBtnOnClicked}
          imageSource = {imageSource}
          backBtnOnClicked = {()=>this.lessonDetailBackBtnOnClicked()}
        />
      )
    }else {
      return (
        <ImageViewer 
          index = {this.state.thumbnailImageOnClickedIndex}
          onClick = {()=>this.fullScreenViewerOnClicked()}
          imageUrls={ImageViewerArray}
        />
      )      
    }
  }

  fullScreenViewerOnClicked (){
    console.log('fullScreenViewerOnClicked')
    this.setState({
      lessonDetailViewVisible : true,
      fullScreenViewerVisible : false,
    })
  }

  listItemOnPressed(lesson_id){
    this.setState({
      lesson_id: lesson_id,
      lessonDetailViewVisible: true,
    })
  }

  render() {

    console.log('d rendering')

    const data = [
      {
        "id": "15",
        "course_id": "22",
        "media_file": "http://tutor.ho2find.com/uploads/Simulator Screen Shot - iPhone 11 Pro Max - 2019-10-19 at 16.06.11.png",
        "media_seq": null
      },
      {
        "id": "16",
        "course_id": "22",
        "media_file": "http://tutor.ho2find.com/uploads/Simulator Screen Shot - iPhone 11 Pro Max - 2019-10-20 at 01.35.57.png",
        "media_seq": null
      }
      //require('tutorRN/image/icons8-back-100.png')
    ]

    return (
      <View style = {layout.styles.basicViewStyle}>
        
        <ScrollView>
          <TutorProfileBlock
            allowEdit = {false}
            tag = {0}
            tutor = {this.state.params.tutor}
            //tutor = {userViewModel.getUser()}
            arrowOn = {false}
            //onClicked = {this.arrowOnClicked}
            //<TutorCVCell 
            //tutor = {this.state.data}
            ///>
          />
        

          <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>         

          <TutorProfileTextBlock
            allowEdit = {false}
            arrowOn = {false}
            title = {strings.education}
            //description = {this.state.data.achievement}
            description = {targetUserViewModel.getEducationById(this.state.params.tutor.user_education)}
            //description = {this.state.params.tutor.user_education}
          />

          <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>

          <TutorRatingBlock
            viewOnClicked = {this.ratingBlockOnClicked}
            arrowOn = {false}
          />

          <View style={{height:40,justifyContent: 'center', backgroundColor:layout.backgroundColor}}>
            <Text style = {{color: 'black',paddingLeft: 10} }>
              {strings.lesson}
            </Text>
          </View>

          <FlatList
            removeClippedSubviews={false}
            data = {this.state.params.tutor.course_list}
            //data = {this.state.lessonData}
            //data = {targetUserViewModel.getUserProfile().course_list}
            renderItem = {
              ({item, index, separators})=>
              <TouchableOpacity 
                onPress = {()=>this.listItemOnPressed(item.id)}
              >
                <View style = {{backgroundColor:'white', marginTop:5}}>
                  <View>
                    <Text style={{flex:1, margin:5, fontSize:layout.stringsSizeMid, fontWeight:'bold'}}>{item.course_name}</Text>
                  </View>
                  <View style = {{flexDirection:'row'}}>
                    <View style = {styles.infoBlockStyle}>
                      <Image source={Assets.icon.location} style={{height:30, width:30}} resizeMode='contain'/>
                      <Text style={{ color:layout.themeTextColor}}>
                        {locationViewModel.getLocationNameById(item.location[0].id)}
                      </Text>
                    </View>

                    <View style = {styles.infoBlockStyle}>
                      <Image source={Assets.icon.price} style={{height:30, width:30}} resizeMode='contain'/>
                      <Text >
                        {courseViewModel.getCourseFeeStringById(item.course_fee)}
                      </Text>
                    </View>
                    <View style = {styles.infoBlockStyle}/>
                  </View>
                </View>
              </TouchableOpacity>

            }
          />
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible = {this.state.lessonDetailViewVisible || this.state.fullScreenViewerVisible}
        >
        {
          //{item.location[0].location_name
          this.lessonContent()   
        }
        </Modal>  
      </View>
    );
  }
}

//<CalendarCell />
export default NewsDetailView;


const styles = StyleSheet.create ({
  descriptionBG:{
    backgroundColor: 'white',
    padding:10,
  },

  descriptionTitle:{
    color: 'rgba(41,62,107,1)',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description:{
    lineHeight:20,
    fontSize: 14,
    paddingTop: 10,
  },

  infoBlockStyle:{
    padding:5,
    alignItems:'center',
    justifyContent:'flex-start',
    flexDirection:'row',
    flex:1,
  }

});