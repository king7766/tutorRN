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
  ListView
} from 'react-native';

import {
  RowMenuListingBar,
} from 'tutorRN/src/view/ui/UIComponent';

import TutorProfileTextBlock from 'tutorRN/src/view/ui/TutorProfileTextBlock'
import PhotoThumbnailView from 'tutorRN/src/view/ui/PhotoThumbnailView'
import FilteringToolsBar from 'tutorRN/src/view/ui/FilteringToolsBar'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import CalendarCell from 'tutorRN/src/view/ui/CalendarCell'
import Assets from 'tutorRN/src/view/ui/Assets';
import strings from 'tutorRN/src/service/strings'

const layout = require('tutorRN/src/Layout')


class LessonDetailView extends Component<Props> {

  constructor(props) {
    super(props)
    //const { params } = this.props.navigation.state;

    this.timeList = []
    for ( var i = 0; i < 48; i ++){
      var min = ""
      if ( i % 2  == 0){
        min = "00"
      }else
      {
        min = "30"
      }
      var s = ""+ (parseInt(i/2) < 10 ? "0"+parseInt(i/2) : parseInt(i/2) ) + ":" + min
      this.timeList.push(s)
    }
    
    this.backBtnOnClicked = this.backBtnOnClicked.bind(this)
    this.state = {
      mark: {
        '2018-05-06': {selected: true, dotColor: 'green', selectedColor: 'green'},
        '2018-05-07': {selected: true, dotColor: 'green', selectedColor: 'green'},
        '2018-05-08': {selected: true, dotColor: 'green', selectedColor: 'green'},
        '2018-05-01': {selected: true, dotColor: 'green', selectedColor: 'green'},
        '2018-05-05': {selected: true, dotColor: 'green', selectedColor: 'green'},
       
      },
    }
  }

  componentWillMount() {

  }
 

  backBtnOnClicked(){
    this.props.backBtnOnClicked()
  }

  photoThumbnailImageOnClicked(index){
    this.props.photoThumbnailImageOnClicked(index)
  }

  photoThumbnailAddBtnOnClicked()
  {
    this.props.photoThumbnailAddBtnOnClicked()
  }

  ListingCatBtnOnClick(index){
    console.log('ListingCatBtnOnClick = ' + index)
  }

  onDayPress(day){
    console.log('onDayPress : ' + day.dateString);
    var dateArray = []
    let dates = {};
    dates[day.dateString] = {selected: true, dotColor: 'green', selectedColor: 'green'}
    this.setState({ mark:dates})
  }

  timeSelected(index){
    console.log('timeSelected : ' + index)
  }

  render() {
    console.log('height = ' + layout.deviceHeight)
    /*
    return (
      <View
        style = {styles.background}
      >
        <View
          style = {styles.container}
        >
          <View style ={{height:20, backgroundColor:'blue', flex:1}}/>
          <View style ={{height:20, backgroundColor:'green', flex:8}}>
            <ScrollView
              //contentContainerStyle = {{backgroundColor:'green'}}
            />
          </View>
          <View style ={{height:20, backgroundColor:'red', flex:1}}/>
        </View>
      </View>
    )
    */
    return (
      <View
        style = {styles.background}
        onPress={()=>this.viewOnClicked()}
      >
        <View style = {styles.container} >
          <View style = {styles.titleBarStyle}>
            <TouchableOpacity 
              onPress={()=>this.backBtnOnClicked()}
            >
              <Image 
                style = {{height: 30, width:30}}
                source= {require('tutorRN/image/icons8-back-100.png')} 
              />
            </TouchableOpacity>
            <Text style = {styles.titleTextStyle}>{this.props.course.course_name}</Text>
            <View style = {{height:30, width:30}}/>
          </View>
          <View style = {{flex:8}}>
            <ScrollView style = {styles.scrollViewStyle}>
              <PhotoThumbnailView
                imageOnClicked = {(index)=>this.photoThumbnailImageOnClicked(index)}
                addBtnOnClicked = {()=>this.photoThumbnailAddBtnOnClicked()}
                imageSource = {this.props.imageSource}
                addBtnVisible = {true}
              />
              <TutorProfileTextBlock
                allowEdit = {false}
                arrowOn = {false}
                title = {strings.generalInformation}
                //description = {'於約30分鐘課堂內, 以自創的「5老師口訣」配合圖像記憶法幫助學生記憶及學習, 並以魔術手法引發學生學習興趣及貫穿整個課程, 同時於課堂內運用多種教學技巧及方法, 使學生快樂而有效地進行學習。'}
                description = {this.props.course.course_introduction}
              />
              <TutorProfileTextBlock
                allowEdit = {false}
                arrowOn = {false}
                title = {strings.location}
                //description = {'九龍塘'}
                description = {this.props.course.location[0].location_name}
              />
              <TutorProfileTextBlock
                allowEdit = {false}
                arrowOn = {false}
                title = {strings.price}
                description = {this.props.course.course_fee}
              />
              <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>

              
              <Calendar
                style = {styles.calendarStyle}
                // Initially visible month. Default = Date()
                current={Date()}
                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                //minDate={'2012-05-10'}
                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                //maxDate={'2019-04-11'}
                // Handler which gets executed on day press. Default = undefined
                //onDayPress={(day) => {console.log('selected day', day)}}
                onDayPress={ (day) => {this.onDayPress(day)}}   
                //onDayPress={ this.hihi() }

                // Handler which gets executed on day long press. Default = undefined
                onDayLongPress={(day) => {console.log('selected day', day)}}
                // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                monthFormat={'yyyy MM'}
                // Handler which gets executed when visible month changes in calendar. Default = undefined
                onMonthChange={(month) => {console.log('month changed', month)}}
                // Hide month navigation arrows. Default = false
                hideArrows={false}
                // Replace default arrows with custom ones (direction can be 'left' or 'right')
                //renderArrow={(direction) => (<Arrow />)}
                // Do not show days of other months in month page. Default = false
                hideExtraDays={false}
                // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                // day from another month that is visible in calendar page. Default = false
                disableMonthChange={false}
                // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                firstDay={1}
                // Hide day names. Default = false
                hideDayNames={false}
                // Show week numbers to the left. Default = false
                showWeekNumbers={false}
                // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                onPressArrowLeft={substractMonth => substractMonth()}
                // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                onPressArrowRight={addMonth => addMonth()}

                markedDates={
                  this.state.mark
                }

              />
              <View style = {styles.rowContainerStyle}>
                <Text style = {{flex:1, marginLeft:10, fontSize:strings.stringsSizeMid}}>{strings.startTime}</Text>
                <RowMenuListingBar 
                  
                  firstItemShowIcon = {false}
                  style = {{flex:1}}
                  data = {this.timeList}
                  size = {30}
                  itemHeight = {30}
                  itemWidth = {50}
                  
                  onClicked={ this.timeSelected }
                />
              </View>
              <View style = {styles.rowContainerStyle}>
                <Text style = {{flex:1, marginLeft:10, fontSize:strings.stringsSizeMid}}>{strings.intervalTime} </Text>
                <RowMenuListingBar 
                  firstItemShowIcon = {false}
                  style = {{flex:1, marginRight:20}}
                  data = {["30", "60", "90"]}
                  size = {30}
                  itemHeight = {30}
                  itemWidth = {50}
                  onClicked={ this.timeSelected }
                />
              </View>
              <View style = {styles.rowContainerStyle}>
                <Text >!! 請先登入 !!</Text>
              </View>
              <TouchableOpacity
              >
                <View style = {{
                  flexDirection:'row', 
                  height:50, 
                  alignItems:'center',
                  justifyContent:'center',
                  backgroundColor:layout.themeTextColor}}
                >
                  
                  <Text style = {{fontSize:layout.stringsSizeBig, color:'white', fontWeight:'bold'}}>立即報名</Text>
                    
                </View>
              </TouchableOpacity>
              
            </ScrollView>
          </View>
          <View style = {{flex:1}}/>
        </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({  
  background:{

    flex:1,
    backgroundColor:'rgba(52,52,52,0.8)',
    height:layout.deviceHeight,
    width: layout.deviceWidth,
    //flexDirection:'row',
    //justifyContent:'center',
    alignItems: 'center',
  },
  container:{
    
    borderRadius:20,
    backgroundColor:'white',
    height:layout.deviceHeight - 100,
    width:layout.deviceWidth - 50,
    flexDirection:'column',
    justifyContent:'space-between',
    //alignItems:'center',
    top:50,
    bottom:50,
    left:25,
    right:25,
    position:'absolute'
  },

  rowContainerStyle:{
    flexDirection:'row', 
    height:50, 
    alignItems:'center',
    justifyContent:'center'
  },
  titleBarStyle:{
    flex:1,
    flexDirection:'row',
    //borderRadius:20,
    height:40, 
    width:layout.deviceWidth - 50,
    //width:100,
    alignItems:'center',
    justifyContent:'space-between',

    //justifyContent:'center',
  
  },
  titleTextStyle:{
    fontWeight: 'bold',
    fontSize: layout.stringsSizeMid,
  },
  
  scrollViewStyle :{
    flex:1,

    //backgroundColor:'blue',
    //position: 'absolute',
    //top: 40,
    //left: 0,
    //right: 0,
    //bottom: 0
  }
  
});
export default LessonDetailView;

/*
<View style = {styles.container}>
     
          <View style = {styles.titleBarStyle}>
            <Text style = {styles.titleTextStyle}>英語</Text>
          </View>
          <ScrollView style = {styles.scrollViewStyle}>
            <View style = {{backgroundColor:'red', height:200}}></View>
            <TutorProfileTextBlock
              allowEdit = {false}
              arrowOn = {false}
              title = {'課堂簡介'}
              description = {'於約30分鐘課堂內, 以自創的「5老師口訣」配合圖像記憶法幫助學生記憶及學習, 並以魔術手法引發學生學習興趣及貫穿整個課程, 同時於課堂內運用多種教學技巧及方法, 使學生快樂而有效地進行學習。'}
            />
            <TutorProfileTextBlock
              allowEdit = {false}
              arrowOn = {false}
              title = {'地點'}
              description = {'九龍塘'}
            />
            <TutorProfileTextBlock
              allowEdit = {false}
              arrowOn = {false}
              title = {'價格'}
              description = {'$ 100'}
            />
          </ScrollView>
          
        </View>

        <FilteringToolsBar 
                onClicked = {(index)=>this.ListingCatBtnOnClick(index)}
                //catName = {['favourite', '聯絡', '報名']}
                //imageSource = {[Assets.actions.doc, Assets.actions.doc, Assets.actions.doc, Assets.actions.doc]}
              />
        */