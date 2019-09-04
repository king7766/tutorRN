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
      
      lessonData:[
        {
            "id": "2",
            "course_name": "DSE 中文寫作技巧 I",
            "course_introduction": "描寫文寫作",
            "course_fee": "100",
            "course_ranking": "5",
            "course_seq": "1",
            "course_priority": "1",
            "category_name": "中文",
            "parent_category_name": "學術",
            "tag_name": "推介",
            "tutor_img": "http://tutor.ho2find.com/uploads/IMG_E0196.JPG",
            "location": [
                {
                    "id": "4",
                    "district_id": "1",
                    "location_name": "九龍灣",
                    "location_seq": null
                }
            ],
            "district": [
                {
                    "id": "1",
                    "district_name": "觀塘綫",
                    "district_seq": null,
                    "location_list": null,
                    "create_user": null,
                    "create_date": null,
                    "update_user": null,
                    "update_date": null,
                    "version_no": null
                }
            ]
        },
        {
            "id": "3",
            "course_name": "朱古力甜品",
            "course_introduction": "心太軟",
            "course_fee": "200",
            "course_ranking": "5",
            "course_seq": "1",
            "course_priority": "1",
            "category_name": "甜品",
            "parent_category_name": "烹飪",
            "tag_name": "優惠",
            "tutor_img": "http://tutor.ho2find.com/uploads/IMG_E0196.JPG",
            "location": [
                {
                    "id": "16",
                    "district_id": "2",
                    "location_name": "荃灣",
                    "location_seq": null
                }
            ],
            "district": [
                {
                    "id": "2",
                    "district_name": "荃灣綫",
                    "district_seq": null,
                    "location_list": null,
                    "create_user": null,
                    "create_date": null,
                    "update_user": null,
                    "update_date": null,
                    "version_no": null
                }
            ]
        },
        {
            "id": "4",
            "course_name": "一 take 過包搞掂",
            "course_introduction": "自動波",
            "course_fee": "3000",
            "course_ranking": "5",
            "course_seq": "1",
            "course_priority": "1",
            "category_name": "私家車",
            "parent_category_name": "駕駛",
            "tag_name": "熱門",
            "tutor_img": "http://tutor.ho2find.com/uploads/IMG_E0196.JPG",
            "location": [
                {
                    "id": "31",
                    "district_id": "3",
                    "location_name": "香港大學",
                    "location_seq": null
                }
            ],
            "district": [
                {
                    "id": "3",
                    "district_name": "港島綫",
                    "district_seq": null,
                    "location_list": null,
                    "create_user": null,
                    "create_date": null,
                    "update_user": null,
                    "update_date": null,
                    "version_no": null
                }
            ]
        },
        {
            "id": "5",
            "course_name": "商業應EXCEL 應用",
            "course_introduction": "Pivot Table 應用",
            "course_fee": "250",
            "course_ranking": "5",
            "course_seq": "1",
            "course_priority": "1",
            "category_name": "Word & Excel",
            "parent_category_name": "電腦",
            "tag_name": "新進",
            "tutor_img": "http://tutor.ho2find.com/uploads/IMG_E0196.JPG",
            "location": [
                {
                    "id": "47",
                    "district_id": "4",
                    "location_name": "金鐘",
                    "location_seq": null
                }
            ],
            "district": [
                {
                    "id": "4",
                    "district_name": "南港島綫",
                    "district_seq": null,
                    "location_list": null,
                    "create_user": null,
                    "create_date": null,
                    "update_user": null,
                    "update_date": null,
                    "version_no": null
                }
            ]
        },
        {
            "id": "6",
            "course_name": "鋼琴試",
            "course_introduction": "演奏級導師指導",
            "course_fee": "2000",
            "course_ranking": "5",
            "course_seq": "1",
            "course_priority": "1",
            "category_name": "鋼琴",
            "parent_category_name": "音樂",
            "tag_name": "得獎",
            "tutor_img": "http://tutor.ho2find.com/uploads/IMG_E0196.JPG",
            "location": [
                {
                    "id": "52",
                    "district_id": "5",
                    "location_name": "康城",
                    "location_seq": null
                }
            ],
            "district": [
                {
                    "id": "5",
                    "district_name": "將軍澳綫",
                    "district_seq": null,
                    "location_list": null,
                    "create_user": null,
                    "create_date": null,
                    "update_user": null,
                    "update_date": null,
                    "version_no": null
                }
            ]
        }
      ],
      
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

  imageOnClicked(index)
  {
    console.log('NewsDetailView - imageOnClicked : ' + index)
    this.setState({
      lessonDetailViewVisible : false,
      fullScreenViewerVisible : true,
      thumbnailImageOnClickedIndex: index,
    })
  }

  lessonContent (data)
  {
    //console.log('lesson_id = ' + this.state.params.lesson_id)
    //let result = this.state.params.tutor.course_list.map(a => a.id);

    var lesson_id = this.state.lesson_id
    const result = this.state.params.tutor.course_list.filter(course => course.id == lesson_id);

    //console.log('result = ' + result[0].course_name)

    if (this.state.lessonDetailViewVisible){
      return (
        <LessonDetailView 
          course = {result[0]}
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
            //description = {this.state.data.achievement}
            description = {this.state.params.tutor.user_education}
          />

          <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>

          <TutorProfileTextBlock
            allowEdit = {false}
            arrowOn = {false}
            title = {strings.description}
            //description = {this.state.data.description}
            description = {this.state.params.tutor.user_introduction}
          />
          <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>

          <TutorRatingBlock
            viewOnClicked = {this.ratingBlockOnClicked}
            arrowOn = {false}
            
          />
          
           <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>
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
                    <Text style={{flex:1, margin:10, color:layout.themeTextColor}}>{item.location[0].location_name}</Text>
                    <Text style={{flex:1, margin:10}}>{item.course_fee}</Text>
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
          this.lessonContent(data)   
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