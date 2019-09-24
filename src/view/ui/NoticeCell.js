import React, { Component } from 'react';
import { 
   Text, 
   Image, 
   View, 
   StyleSheet, 
   ScrollView ,
   ListView,
   Linking,
   TouchableOpacity,
} from 'react-native';
import Dimensions from 'Dimensions';
//import Hyperlink from 'react-native-hyperlink'
import ParsedText from 'react-native-parsed-text';

import {
  Avatar,
} from 'tutorRN/src/view/ui/UIComponent';

const layout = require('tutorRN/src/Layout')


class NoticeCell extends Component{

  constructor (props){
    super(props);

    this.contentString = this.contentString.bind(this)

  }
  componentWillMount(){
    this.mounted = true
  } 

  handleSettingsPress = () => {
    //NewsHomeView
    console.log('handleSettingsPress')
    //this.props.navigation.navigate('NewsHomeView');

  }

  onPress (index)
  {
    this.props.onPress(index)
  }

  typeViewStyle ()
  {
    var color 
    if ( this.props.item.type === 1)
    {
      color = 'green'
    }
    else if ( this.props.item.type === 2 )
    {
      color = 'red'
    }
    else
    {
      color = 'rgba(233,155,77,1)'
    }
    return {
      marginTop:5,
      marginBottom:5,
      width: 10,
      backgroundColor: color
    }
  }

  nameString(){
    
  }

  contentString(){
    console.log('contentString = ' + this.props.item.type)
    if (this.props.item.type == 1 ){
      return '已對你評分'
    }else if ( this.props.item.type == 2){
      
    }else if ( this.props.item.type == 3){
      return '報讀了你的 ' + this.props.item.lesson_name 
    }else if ( this.props.item.type == 4){
      return '已確認 ' + this.props.item.lesson_date + ' 的 ' + this.props.item.lesson_name 
    }else if ( this.props.item.type == 5){
      return '已完成 ' + this.props.item.lesson_date + ' 的 ' + this.props.item.lesson_name  + ', 馬上評分'
    }else if ( this.props.item.type == 6){
      return '對 你 發出私人信息'
    }

    return 'CONTENT CONTENT CONTENT CONTENT CONTENT CONTENT CONTENT CONTENT CONTENT'
  }

  render (){

    const title = '已對你有新評論'
    const content = '第一次補習跟左個朋友報p chan,第一堂上到我呆哂！之後都慣左佢個節奏，但佢教既野本人覺得好難，要求真係好高，狂抄notes，比6分鐘你做10題speech bubble 最尾只係做左3題仲要錯 但補開又已經唔想轉，本來試冷門Marc Wong 不過意外地報唔到又報返p chan 利申:唔補應該得2-3既底 '

    const status = this.props.item.name + ' 已對你有新評論'
    const lesson = this.props.item.day + ' 的 ' + this.props.item.subject + ' 課程'

    const location = '\uE801  ' + this.props.item.location 
    const price = '\t\uF155  ' + this.props.item.price

    //const time = '\uE807  ' + this.props.lesson.startTime + ' - ' + this.props.lesson.endTime
    //const rating = this.props.lesson.rating + '  \uE803'

    return(
      <TouchableOpacity 
        //onPress={this.handleSettingsPress}
        onPress = { () => this.onPress(this.props.index)}
        //underlayColor = {layout.touchHighlightColor}
        //underlayColor = 'gray'
      >
        <View style = {styles.background}>

          <View style = {styles.photoViewStyle}>
            <Avatar
              //onPress={() => {this.avatarOnClicked()}}
              round = {true}
              size = {60}
              //type = {this.props.allowEdit == true ? 'edit' :''}
              type = 'edit'
              url = {'https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-1/p320x320/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=110&_nc_oc=AQm5NxA1rY7W4d8YqPG0djDuG9uowyIbyAUwRkq7JOcJ9huJWbhhO2YfJ-37dviIEtA&_nc_ht=scontent-hkg3-1.xx&oh=c643ddf949263ca18a4c0eead81e1da3&oe=5DD86A90'}
            />
            
          </View>

          <View style = {styles.noticeViewStyle}>
            <Text 
              style = {styles.titleStyle}
              numberOfLines={1}
            >
              NAME NAME NAME NAME NAME NAME NAME NAME NAME NAME NAME NAME
            </Text>

            <Text 
              style = {styles.contentStyle}
              numberOfLines={2}
              color = 'gray'
            >
              {this.contentString()}
            </Text>
            <Text style = {styles.timeStyle}>
                2 小時前
            </Text>
          </View>

          <View
            style = {styles.trailViewStyle}
            //style = {{flex:1, flexDirection: 'row', alignItems:'center'}}
          >
            <View
              //style = {{backgroundColor:this.props.item.read ? 'transparent': 'red', height: 10, width:10, borderRadius:5}}
            />
          </View>
          

          

        </View>
      </TouchableOpacity>
      )
  }
}

export default NoticeCell;

const styles = StyleSheet.create ({
  background:{
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: layout.deviceWidth,
    height: 100,
    //borderTopColor: 'gray',
    //borderTopWidth: 0.5

    borderBottomColor: 'gray',
    borderBottomWidth: 0.5
    //padding: 5
    //paddingTop:5,
    //paddingBottom:5
    //padding:5
  },

  photoViewStyle:{
    flex:2,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
    
  },

  imageStyle :{

    marginTop:10,
    //backgroundColor: 'rgba(61,89,148,1)',
    backgroundColor: 'grey',
    height:60,
    width: 60,
    borderRadius: 30,

  },

  noticeViewStyle:{
    flex:7,
    padding : 5,
    paddingLeft : 10,
    flexDirection: 'column',
    //alignItems: 'center'
    justifyContent: 'center'
  },

  trailViewStyle:{
    flex:1, 
    alignItems:'center',
    justifyContent:'center'
  },

  titleStyle:{
    
    fontSize: layout.stringsSizeMid,
    fontWeight: 'bold',
  },

  contentStyle:{
    
    fontFamily: "fontello",
    //fontWeight: 'bold',
    fontSize: layout.stringsSizeSmall,
    color : 'gray',
  },


  locationStyle:{
    
    fontFamily: "fontello",
    fontSize: 14,
    color : layout.themeTextColor,
    fontWeight: 'bold',
    //fontFamily: "vincHand",
  },

  timeStyle:{
    
    fontFamily: "fontello",
    fontSize: layout.stringsSizeSmall,
    color : 'gray',
    //fontFamily: "vincHand",
  }

})




/*  <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
            <Text 
              style = {styles.locationStyle}
              
            >
              {location}
            </Text>

            <Text style = {styles.priceStyle}>
              2 小時前
            </Text>
          </View>
          */