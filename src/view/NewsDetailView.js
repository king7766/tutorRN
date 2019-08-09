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
  Modal
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import SegmentControl from './ui/SegmentControl'

import TutorCVCell from './ui/TutorCVCell'
import CalendarCell from './ui/CalendarCell'
import TutorProfileBlock from 'tutorRN/src/view/ui/TutorProfileBlock'
import TutorProfileTextBlock from './ui/TutorProfileTextBlock'
import TutorRatingBlock from './ui/TutorRatingBlock'
import strings from 'tutorRN/src/service/strings'
import LessonDetailView from 'tutorRN/src/view/LessonDetailView'

const layout = require('tutorRN/src/Layout')


class NewsDetailView extends Component<Props> {

  constructor(props) {
    super(props);
    
    this.ratingBlockOnClicked = this.ratingBlockOnClicked.bind(this)
    this.lessonDetailBackBtnOnClicked = this.lessonDetailBackBtnOnClicked.bind(this)
    this.state = {
      //lessonDetailViewVisible: props.navigation.state.params.lessonDetailShow,
      params: props.navigation.state.params,
      
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
       
      } 
      
    }
  }

  

  componentWillMount() {
    
  }

  componentDidMount(){
    this.setState({
      lessonDetailViewVisible : this.state.params.lessonDetailShow ? this.state.params.lessonDetailShow : false,
    })
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

  imageOnClicked(index)
  {
    console.log('NewsDetailView - imageOnClicked : ' + index)
    this.setState({
      lessonDetailViewVisible : false,
      fullScreenViewerVisible : true,
      thumbnailImageOnClickedIndex: index,
    })
  }

  modalContent (data)
  {
    if (this.state.lessonDetailViewVisible){
      return (
        <LessonDetailView 
          imageOnClicked = {(index)=>this.imageOnClicked(index)}
          imageSource = {data}
          backBtnOnClicked = {()=>this.lessonDetailBackBtnOnClicked()}
        />
      )
    }else {
      return (
        <ImageViewer 
          index = {this.state.thumbnailImageOnClickedIndex}
          onClick = {()=>this.fullScreenViewerOnClicked()}
          imageUrls={data}
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

  render() {

   

    const { params } = this.props.navigation.state;

    const data = [
      {
        url:'https://images.unsplash.com/photo-1485832329521-e944d75fa65e?auto=format&fit=crop&w=1000&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
      },
      {
        url:'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/3a7803bf022db91704584b7297b38bc6.jpg',
        
      },
      {
        url:'https://images.unsplash.com/photo-1485832329521-e944d75fa65e?auto=format&fit=crop&w=1000&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
        
      },
      {
        url:'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/3a7803bf022db91704584b7297b38bc6.jpg',
        
      },
      {
        url:'https://images.unsplash.com/photo-1485832329521-e944d75fa65e?auto=format&fit=crop&w=1000&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
        
      },
      {
        url:'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/3a7803bf022db91704584b7297b38bc6.jpg',
        
      },
    ]

    return (
      <View style = {layout.styles.basicViewStyle}>
        <ScrollView>
          <TutorProfileBlock
            allowEdit = {false}
            tag = {0}
            tutor = {this.state.data}
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
            description = {this.state.data.achievement}
          />

          <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>

          <TutorProfileTextBlock
            allowEdit = {false}
            arrowOn = {false}
            title = {strings.description}
            description = {this.state.data.description}
          />
          <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>

          <TutorRatingBlock
            viewOnClicked = {this.ratingBlockOnClicked}
            arrowOn = {false}
            
          />
          <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible = {this.state.lessonDetailViewVisible || this.state.fullScreenViewerVisible}
        >
        {
          this.modalContent(data)   
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

});