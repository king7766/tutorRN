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
  Animated
} from 'react-native';

import {
  TutorProfileTextBlock,
  PhotoThumbnailView,
  SeparatorBar,
} from 'tutorRN/src/view/ui/UIComponent';
import Picker from 'react-native-picker';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import CalendarCell from 'tutorRN/src/view/ui/CalendarCell'
import Assets from 'tutorRN/src/view/ui/Assets';
import strings from 'tutorRN/src/service/strings'

import locationVM from 'tutorRN/src/VM/locationVM'
import courseVM from 'tutorRN/src/VM/courseVM'

const courseViewModel = courseVM.getInstance()
const locationViewModel = locationVM.getInstance()
const layout = require('tutorRN/src/Layout')


class SelectTimeView extends Component<Props>{

  _defaultHeightValue = 50
  _defaultTransition  = 500;

  constructor(props) {
    super(props);
    this.state = {
      _rowHeight  : new Animated.Value(0),
      _rowOpacity : new Animated.Value(0)
    }
  }
 
  componentDidMount() {
    console.log('componentDidMount SelectTimeView')
  
    Animated.timing(this.state._rowHeight, {
      toValue  : this._defaultHeightValue,
      duration : this._defaultTransition
    }).start();

    Animated.timing(this.state._rowOpacity, {
      toValue  : 1,
      duration : this._defaultTransition
    }).start()
  }

  componentWillReceiveProps(nextProps){
    if ( nextProps.startTime)
    {
      console.log('startTime : ' + nextProps.startTime)
      this.setState({
        startTime: nextProps.startTime
      })
    }
  }

  render(){
    return (
      <Animated.View style = {{height:this.state._rowHeight, width:'100%', opacity: this.state._rowOpacity}}>
        <View style = {styles.textInputView}>
          <Text style = {{flex:1, marginLeft:10, fontSize:strings.stringsSizeMid}}>{strings.startTime}</Text>
          <Text style = {styles.resultTextStyle}>
            {this.state.startTime ? this.state.startTime : strings.pleaseChoose}
          </Text> 
        </View>      
      </Animated.View>
    )
  }
}

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
    dates[day.dateString] = {selected: true, selectedColor: layout.themeTextColor}
    this.setState({ 
      mark:dates,
      showSelectedTime:true
    })

    setTimeout(() => {
      this.scrollView.scrollToEnd({animated: true});  
    }, 600);
    
  }

  filteringToolsBtnOnClicked(index){
    console.log('filteringToolsBtnOnClicked : ' +index)
  }

  selectTimeOnClicked()
  {
    var tempArray
    var hours = []
    for ( var i = 0; i < 12; i ++)
    {
      hours[i] = i.toString()
    }
    Picker.init({
      pickerData: [hours,['00','15','30','45'],['am', 'pm']],
      pickerTitleText: strings.pleaseChoose,
      pickerConfirmBtnText: strings.confirm,
      pickerCancelBtnText: strings.cancel,
      selectedValue: tempArray,
      onPickerConfirm: pickedValue => {
        this.setState({
          startTime:pickedValue[0] +':'+ pickedValue[1] + ' ' +pickedValue[2]
        })
        console.log('confirm : ', pickedValue);
      },
      onPickerCancel: pickedValue => {
          console.log('area cancel : ', pickedValue);
      },
      onPickerSelect: pickedValue => {
          console.log('area select : ', pickedValue);
      }
    });
    Picker.show();

  }

  render() {
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
          <View style = {{flex:9}}>
            <ScrollView 
              ref={ref => this.scrollView = ref}
              //onContentSizeChange={(contentWidth, contentHeight)=>{        
              //    this.scrollView.scrollToEnd({animated: true});
              //}}
              style = {styles.scrollViewStyle}
            >
              <PhotoThumbnailView
                imageOnClicked = {(index)=>this.photoThumbnailImageOnClicked(index)}
                addBtnOnClicked = {()=>this.photoThumbnailAddBtnOnClicked()}
                imageSource = {this.props.imageSource}
                addBtnVisible = {false}
              />
              
              <TutorProfileTextBlock
                allowEdit = {false}
                arrowOn = {false}
                title = {strings.generalInformation}
                //description = {'於約30分鐘課堂內, 以自創的「5老師口訣」配合圖像記憶法幫助學生記憶及學習, 並以魔術手法引發學生學習興趣及貫穿整個課程, 同時於課堂內運用多種教學技巧及方法, 使學生快樂而有效地進行學習。'}
                description = {this.props.course.course_introduction}
              />
              <SeparatorBar />
              <TutorProfileTextBlock
                allowEdit = {false}
                arrowOn = {false}
                title = {strings.location}
                //description = {'九龍塘'}
                //description = {this.props.course.location[0].location_name}
                description = {locationViewModel.getLocationNameById(this.props.course.location[0].id)}
              />
              <SeparatorBar />
              <TutorProfileTextBlock
                allowEdit = {false}
                arrowOn = {false}
                title = {strings.price}
                description = {courseViewModel.getCourseFeeStringById(this.props.course.course_fee)}
                //description = {this.props.course.course_fee}
              />
              <SeparatorBar />
              
              <SeparatorBar text = {strings.applyDetail} />

              <Calendar
                theme={{
                  selectedDayBackgroundColor: '#00adf5',
                  selectedDayTextColor: '#ffffff',
                  //selectedDayBackgroundColor:layout.themeTextColor
                }}
                style = {styles.calendarStyle}
                // Initially visible month. Default = Date()
                current={Date()}
                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                minDate={Date()}
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
              <View style = {{backgroundColor:layout.backgroundColor, height: 5}}/>
              
              {
                this.state.showSelectedTime && 
                <TouchableOpacity 
                  onPress={() => this.selectTimeOnClicked()}
                >
                  <SelectTimeView 
                    startTime = {this.state.startTime}
                    show={this.state.showSelectedTime}
                  />
                </TouchableOpacity>
              }
              <SeparatorBar />

              <Text style = {{ textAlign: 'center', padding: 10, backgroundColor:layout.backgroundColor, color:layout.themeTextColor}}>
                **完成首個課程後，請給予導師評分和建議，締造更好的學習體驗**
              </Text>    
            </ScrollView>
          </View>
          <TouchableOpacity>
            <View style = {styles.nextViewStyle}> 
              <Text style = {{fontSize:layout.stringsSizeBig, color:'white', fontWeight:'bold'}}>立即報名</Text>   
            </View>
          </TouchableOpacity>

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
    width:layout.deviceWidth,
    flexDirection:'column',
    justifyContent:'space-between',
    //alignItems:'center',
    top:50,
    bottom:50,
    position:'absolute'
  },

  textInputView: {
    flexDirection:'row',
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  resultTextStyle:{
    fontSize: layout.stringsSizeMid,
    paddingRight:10,
    color:layout.themeTextColor 
  },

  rowContainerStyle:{
    flexDirection:'row', 
    height:60, 
    alignItems:'center',
    justifyContent:'center'
  },
  titleBarStyle:{
    
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    backgroundColor:layout.backgroundColor,
    flexDirection:'row',
    //borderRadius:20,
    height:50, 
    width:layout.deviceWidth ,
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
  },
  nextViewStyle:{
    flexDirection:'row', 
    height:50, 
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:layout.grayColor
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