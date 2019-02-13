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

const layout = require('tutorRN/src/Layout')


class NoticeCell extends Component{

  constructor (props){
    super(props);

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
      <TouchableHighlight 
        //onPress={this.handleSettingsPress}
        onPress = { () => this.onPress(this.props.index)}
        underlayColor = {layout.touchHighlightColor}
        //underlayColor = 'gray'
        >
      <View style = {styles.background}>

        <View style = {styles.photoViewStyle}>
          <Image 
            style = {styles.imageStyle}
            source = {{uri: this.props.item.image}}
            defaultSource = {require('tutorRN/src/image/icons8-customer-filled-100.png') }
            // cover, contain, stretch, center
            rezizeMode = 'contain'
          />
          
        </View>

        <View style = {styles.noticeViewStyle}>
          <Text style = {styles.titleStyle}>
            {status}
          </Text>

          <Text 
            style = {styles.contentStyle}
            numberOfLines={2}
            color = 'gray'
          >
            {content}
          </Text>


        </View>

        <View
          style = {{flex:1, flexDirection: 'row', alignItems:'center'}}
        >
          <Text style = {styles.timeStyle}>
              2 小時前
          </Text>
          <View
            style = {{backgroundColor:this.props.item.read ? 'transparent': 'red', height: 10, width:10, borderRadius:5}}
          />
        </View>
        

        

      </View>
      </TouchableHighlight>
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
    flex:1,
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
    flex:3,
    padding : 5,
    paddingLeft : 10,
    flexDirection: 'column',
    //alignItems: 'center'
    justifyContent: 'center'
  },

  titleStyle:{
    padding: 3,
    fontSize: 17,
    fontWeight: 'bold',
  },

  contentStyle:{
    padding: 3,
    fontFamily: "fontello",
    //fontWeight: 'bold',
    fontSize: 14,
    color : 'gray',
  },


  locationStyle:{
    padding: 3,
    fontFamily: "fontello",
    fontSize: 14,
    color : layout.themeTextColor,
    fontWeight: 'bold',
    //fontFamily: "vincHand",
  },

  timeStyle:{
    padding: 3,
    fontFamily: "fontello",
    fontSize: 12,
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