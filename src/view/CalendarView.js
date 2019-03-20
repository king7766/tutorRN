import React from 'react';
import {
  Text,
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import strings from 'tutorRN/src/service/strings';
import Picker from 'react-native-picker';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
const layout = require('tutorRN/src/Layout')

class CalendarView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startTimeSelected: strings.pleaseChoose,
      internvalTime : '',
      internvalArray: [30,60,90,120],
      mark: {},
      refDate: {}
    }
    
  }

  spaceOnTouch()
  {
    console.log('spaceOnTouch')
    this.props.spaceOnPress()
  }

  confirmAction()
  {
    this.props.confirmTimeAction()
  }

  onDayPress(day)
  {
    console.log('onDayPress ' + day)
    let dates = {}
    var dateArray = Object.keys(this.state.refDate)
    dateArray.push(day.dateString)
    dateArray.forEach((val) => {
      if( val === day.dateString)
      {
        dates[val] = {selected: true};
      }
    })
    this.setState({ mark:dates})
  }

  selectTimeBtnOnClick()
  {
    console.log('selectTimeBtnOnClick')
    var timeArray = []
    for ( let i = 0 ; i < 48; i ++)
    {
      var hr, min
      hr = (i /2 < 10 ) ? '0'+ Math.floor(i/2) : Math.floor(i/2)
      min = ( i % 2 == 1 ) ? '30' : '00'
      var string = hr + ' : ' + min
      timeArray.push(string)
    }

    Picker.init({
      pickerData: timeArray,
      pickerTitleText:strings.pleaseChoose,
      pickerConfirmBtnText:strings.confirm,
      pickerCancelBtnText: strings.cancel,
      selectedValue: timeArray,
      onPickerConfirm: pickedValue => {
          console.log('pickedValue ', pickedValue);
          this.setState({
            startTimeSelected: pickedValue
          })
          strings.setLanguage('cn')
      },
      onPickerCancel: pickedValue => {
          console.log('area', pickedValue);
      },
      onPickerSelect: pickedValue => {
          //Picker.select(['山东', '青岛', '黄岛区'])
          console.log('area', pickedValue)
      }
    })
    Picker.show()
  }

  internvalOnClicked(index)
  {
    this.setState({
      internvalTime : this.state.internvalArray[index]
    })
  }

  internvalBtnStyle (index)
  {
    
    return{
      width:50,
      borderColor:this.state.internvalArray[index] == this.state.internvalTime ? layout.themeTextColor :'gray',
      borderRadius:5, 
      borderWidth:1,
      textAlign:'center',
    }
  }

  startTimeUI()
  {
    return (
      <TouchableOpacity
        onPress={()=>this.selectTimeBtnOnClick()}
      >
        <View style = {styles.textInputView}>
          <Text style = {{paddingLeft:10, color:'gray', backgroundColor:'white'}}>{strings.startTime}</Text>
          <Text style = {styles.inputTextStyle}>{this.state.startTimeSelected}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  internvalTimeUI()
  {
    return(
      <View style = {styles.textInputView}>
        <Text style = {{paddingLeft:10, color:'gray', backgroundColor:'white'}}>{strings.intervalTime}</Text>
        {
          this.state.internvalArray.map(
            (item, index) => (
              <TouchableOpacity
                onPress={()=>this.internvalOnClicked(index)}
                key = {index}
              >
                <Text style = {this.internvalBtnStyle(index)}>{item}</Text>
              </TouchableOpacity>
            )
          )
        }
      </View>
    )
  }
  confirmUI()
  {
    return(
      <TouchableOpacity
        
      
      >
        <Text >{strings.confirm}</Text>
      </TouchableOpacity>
    )
  }

  // Render any loading content that you like here
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={()=>this.spaceOnTouch()}
        
      >
        <View 
          style = {styles.bg}
        >
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
          {
            this.startTimeUI()
          }
          {
            this.internvalTimeUI()
          }
          <View style = {{height:10}}/>
          {
            this.confirmUI()
          }
          
        </View>
      </TouchableOpacity>
    )
  }
}

export default CalendarView;

const styles = StyleSheet.create({
  bg:{
    backgroundColor:'rgba(52,52,52,0.8)',
    height:layout.deviceHeight,
    width: layout.deviceWidth,
    flexDirection:'column',
    justifyContent:'flex-start',
  },
  calendarStyle:{
    //position:'absolute',
    //top:100,
    marginTop:100,
    //top:100, 
    width: layout.deviceWidth
  },
  textInputView: {
    
    flexDirection:'row',
    height: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputTextStyle:{
    color : layout.themeTextColor,
    paddingRight:10,
    //paddingLeft: 10,
    fontSize:14
  },
})