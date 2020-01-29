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

import strings from 'tutorRN/src/service/strings'
import LessonDetailView from 'tutorRN/src/view/LessonDetailView'
import Assets from './ui/Assets';

import locationVM from 'tutorRN/src/VM/locationVM'
import courseVM from 'tutorRN/src/VM/courseVM'

const courseViewModel = courseVM.getInstance()
const locationViewModel = locationVM.getInstance()
const layout = require('tutorRN/src/Layout')
const targetUserViewModel = targetUserVM.getInstance()


import {
  TutorProfileBlock,
  TutorProfileTextBlock,
  TutorRatingBlock,
  SeparatorBar,
  PhotoThumbnailView,
  NewsDetailLessonListCell,
} from 'tutorRN/src/view/ui/UIComponent';
import NewsItemCell from './ui/NewsItemCell';


class NewsDetailView extends Component<Props> {

  constructor(props) {
    super(props);


    this.modalContent = this.modalContent.bind(this)
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
      lesson_id : -1,
      lessonDetailViewVisible : false,
      fullScreenViewerVisible : false,
    })
  }

  photoThumbnailImageOnClicked(index)
  {

    //this.showImageViewer(imageArray)

    console.log(this.state.lessonDetailViewVisible + ' NewsDetailView - photoThumbnailImageOnClicked : ' + index)
    if ( this.state.lessonDetailViewVisible == false )
    {
      // showing user cert_list
      
      var ImageViewerArray = []
      for ( var i = 0; i < this.state.params.tutor.cert_list.length ; i ++)
      {
        ImageViewerArray.push({url:this.state.params.tutor.cert_list[i]})
      }      
    }
    else
    {
      var lesson_id = this.state.lesson_id
      const result = this.state.params.tutor.course_list.filter(course => course.id == lesson_id);
      var imageSource = result[0].course_media_list

      var ImageViewerArray = []
      for ( var i = 0; i < imageSource.length ; i ++)
      {
        ImageViewerArray.push({url:imageSource[i].media_file})
      }
    }
  
    this.setState({
      lessonDetailViewVisible : false,
      fullScreenViewerVisible : true,
      thumbnailImageOnClickedIndex: index,
      ImageViewerArray: ImageViewerArray,
    })

  }

  photoThumbnailAddBtnOnClicked ()
  {
    console.log('photoThumbnailAddBtnOnClicked')
  }

  modalContent ()
  {
  
    if (this.state.lessonDetailViewVisible){

      var lesson_id = this.state.lesson_id
      const result = this.state.params.tutor.course_list.filter(course => course.id == lesson_id);  
      var imageSource = result[0].course_media_list

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
          imageUrls={this.state.ImageViewerArray}
        />
      )      
    }
  }

  fullScreenViewerOnClicked (){
    console.log('fullScreenViewerOnClicked')
    if ( this.state.lesson_id == -1 ){

      this.setState({
        lessonDetailViewVisible : false,
        fullScreenViewerVisible : false,
      })
    }
    else
    {
      this.setState({
        lessonDetailViewVisible : true,
        fullScreenViewerVisible : false,
      })
    }
    
  }

  listItemOnPressed(lesson_id){
    this.setState({
      lesson_id: lesson_id,
      lessonDetailViewVisible: true,
    })
  }

  render() {

    var cert_list = []
    for ( var i = 0; i < this.state.params.tutor.cert_list.length; i ++)
    {
      cert_list.push({media_file:this.state.params.tutor.cert_list[i]})
    }

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
  
          <SeparatorBar />
          <TutorProfileTextBlock
            allowEdit = {false}
            arrowOn = {false}
            title = {strings.education}
            //description = {this.state.data.achievement}
            description = {targetUserViewModel.getEducationById(this.state.params.tutor.user_education)}
            //description = {this.state.params.tutor.user_education}
          />

          <SeparatorBar />

          <TutorRatingBlock
            viewOnClicked = {this.ratingBlockOnClicked}
            arrowOn = {false}
          />

          <SeparatorBar />
          {
            cert_list.length > 0 &&
            <PhotoThumbnailView
              imageOnClicked = {(index)=>this.photoThumbnailImageOnClicked(index)}
              //addBtnOnClicked = {()=>this.photoThumbnailAddBtnOnClicked()}
              imageSource = {cert_list}
              addBtnVisible = {false}
            />
          }

          

          <SeparatorBar text={strings.lesson}/>

          
          <FlatList
            removeClippedSubviews={false}
            data = {this.state.params.tutor.course_list}
            //data = {this.state.lessonData}
            //data = {targetUserViewModel.getUserProfile().course_list}
            keyExtractor = {(item, index) => index.toString()}
            renderItem = {
              ({item, index, separators})=>
              <TouchableOpacity 
                onPress = {()=>this.listItemOnPressed(item.id)}
              >
                <NewsDetailLessonListCell 
                  item = {item} 
                />
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
          (this.state.lessonDetailViewVisible || this.state.fullScreenViewerVisible) && this.modalContent()
        }
        {
          //this.state.fullScreenViewerVisible && this.showImageViewer()
        }
        </Modal>  
      </View>
    );
  }
}

//<CalendarCell />
export default NewsDetailView;


const styles = StyleSheet.create ({
  
  description:{
    lineHeight:layout.defaultLineHeight,
    fontSize: layout.stringsSizeSmall,
    paddingTop: 10,
  },

  infoBlockStyle:{
    padding:10,
    alignItems:'center',
    justifyContent:'flex-start',
    flexDirection:'row',
    flex:1,
  }

});