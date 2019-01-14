import React, { Component } from 'react';
import { 
   Text, 
   Image, 
   View, 
   StyleSheet, 
   ScrollView ,
   ListView,
   Linking,
   TouchableHighlight
} from 'react-native';
import Dimensions from 'Dimensions';
//import Hyperlink from 'react-native-hyperlink'
import ParsedText from 'react-native-parsed-text';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const layout = require('tutorRN/src/Layout')


class CalendarCell extends Component{

  constructor (props){
    super(props);

    this.onDayPress = this.onDayPress.bind(this);
    this.timeBoxOnClick = this.timeBoxOnClick.bind(this)

    this.state = {

      refDate :{
        '2018-05-06': {selected: false, marked: true, selectedColor: 'blue'},
        '2018-05-07': {marked: true},
        '2018-05-08': {marked: true, dotColor: 'red', activeOpacity: 0},
        '2018-05-01': {selected: false, marked: true},
        '2018-05-05': {selected: false},
      },
      mark: {
        '2018-05-06': {selected: true, dotColor: 'green', selectedColor: 'green'},
        '2018-05-07': {selected: true, dotColor: 'green', selectedColor: 'green'},
        '2018-05-08': {selected: true, dotColor: 'green', selectedColor: 'green'},
        '2018-05-01': {selected: true, dotColor: 'green', selectedColor: 'green'},
        '2018-05-05': {selected: true, dotColor: 'green', selectedColor: 'green'},
       
      },


      time:['9:00', '10:00', '11:00', '12:00', '13:00', '14:00']
      
    }

  }
  componentWillMount(){
    this.mounted = true
  } 

  onDayPress (day) {
    console.log('onDayPress === ' + day.dateString);
    

    var dateArray = Object.keys(this.state.refDate);

    //console.log('dateArray === ' + dateArray);

    dateArray.push(day.dateString)

    let dates = {};
    dateArray.forEach((val) => {
      if( val === day.dateString)
      {
        dates[val] = {selected: true};
      }
      else
      {
       dates[val] = {selected: true, dotColor: 'green', selectedColor: 'green'}; 
      }
    });



    //let dates = {};
    //dates[day.dateString] = {selected: true};
     
    this.setState({ mark:dates})

    

    //this.refs._scrollView.markedDates = mark
    this.refs._scrollView.scrollTo({x:layout.deviceWidth, animated: true})
  }

  timeBoxOnClick(rowData, sectionID, rowID, higlightRow)
  {
    console.log('timeBoxOnClick')
    this.refs._scrollView.scrollTo({x:0, animated: true})
  }
 

  render (){


    //const imageURL = this.props.imageURL
    //const content = this.props.content
    

    var ds = new  ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
    var dataSource= ds.cloneWithRows(this.state.time)

    

    return(
      <ScrollView 
        ref = '_scrollView'
        scrollEnabled = {true}
      >
        <View style = {styles.backgroundStyle}>
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
          <View style = {styles.timeSlotStyle}>
            <View style = {styles.dateViewStyle}>
              <TouchableHighlight 
                underlayColor = {this.props.touchColor}
                onPress={ ()=>this.arrowOnClick(this.props.tag-1)}
              >
                <Image 
                  style = {{ width: 30, height: 30}}
                  source= {require('tutorRN/src/image/left_arrow_icon_100.png')}
                  resizeMode =  'contain'
                />
              </TouchableHighlight>

              <Text style = {{fontSize: 16, fontWeight: 'bold'}}>25</Text>
              <Text style = {{fontSize: 16, fontWeight: 'bold'}}>DEC</Text>
              <Text style = {{fontSize: 16, fontWeight: 'bold'}}>Mon</Text>
            </View>
            
            <ListView     //创建ListView           
              dataSource={dataSource} //设置数据源               
              renderRow={this.renderRow} //设置cell               
              contentContainerStyle={styles.listViewStyle}//设置cell的样式

              renderRow={(rowData, sectionID, rowID, higlightRow) =>
                <TouchableHighlight 
                  onPress={()=>this.timeBoxOnClick (rowData, sectionID, rowID, higlightRow) }
                  underlayColor = {layout.touchHighlightColor}
                >
                  <View style={styles.timeBox}>
                    <Text style = {styles.timeBoxText}>
                      {rowData}
                    </Text>
                  </View>
                </TouchableHighlight>
                  
              }
            />
          </View>

        </View>
        
      </ScrollView>
        
      )
  }
}

CalendarCell.defaultProps = {
  tag : 1,
  touchColor: 'rgba(107,157,242,1)',
  
};

export default CalendarCell;

const styles = StyleSheet.create ({


  backgroundStyle:{
    width: layout.deviceWidth *2,
    flexDirection:'row',
  },
  calendarStyle:{
    width: layout.deviceWidth
  },

  timeSlotStyle:{
    backgroundColor : 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: layout.deviceWidth
  },

  dateViewStyle:{
    width: 50,
    padding: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  listViewStyle:{        
    flexDirection:'row', //设置横向布局       
    flexWrap:'wrap'    //设置换行显示
  },  
  timeBox:{
    borderColor: 'gray',
    borderWidth: 0.5,
    height: 30,
    width: (layout.deviceWidth- 50 )/4,
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'

  },

  timeBoxText:{
    fontSize: 12
  }
  
})


