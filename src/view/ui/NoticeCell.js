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

const layout = require('../../Layout')


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

    const status = this.props.item.name + ' 確定了'
    const lesson = this.props.item.day + ' 的 ' + this.props.item.subject + ' 課程'

    const location = '\uE801  ' + this.props.item.location 
    const price = '\t\uF155  ' + this.props.item.price

    //const time = '\uE807  ' + this.props.lesson.startTime + ' - ' + this.props.lesson.endTime
    //const rating = this.props.lesson.rating + '  \uE803'

    return(
      <TouchableHighlight 
        onPress={this.handleSettingsPress}
        underlayColor = {layout.touchHighlightColor}
        //underlayColor = 'gray'
        >
      <View style = {styles.background}>

        <View style = {styles.photoViewStyle}>
          <Image 
            style = {styles.imageStyle}
            source = {{uri: this.props.item.image}}
            // cover, contain, stretch, center
            rezizeMode = 'contain'
          />
          
        </View>

        <View style = {styles.noticeViewStyle}>
          <Text style = {styles.titleStyle}>
            {status}
          </Text>

          <Text style = {styles.timeStyle}>
            {lesson}
          </Text>

          <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
            <Text style = {styles.locationStyle}>
              {location}
            </Text>

            <Text style = {styles.priceStyle}>
              2 小時前
            </Text>
          </View>
          

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
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
    
  },

  imageStyle :{

    marginTop:10,
    //backgroundColor: 'rgba(61,89,148,1)',
    //backgroundColor: 'red',
    height:60,
    width: 60

  },

  noticeViewStyle:{
    padding : 5,
    paddingLeft : 10,
    flexDirection: 'column',
    //alignItems: 'center'
    justifyContent: 'center'
  },

  titleStyle:{
    padding: 3,
    fontSize: 18,
    fontWeight: 'bold',
  },

  timeStyle:{
    padding: 3,
    fontFamily: "fontello",
    fontWeight: 'bold',
    fontSize: 16,
  },


  locationStyle:{
    padding: 3,
    fontFamily: "fontello",
    fontSize: 14,
    color : layout.themeTextColor,
    fontWeight: 'bold',
    //fontFamily: "vincHand",
  },

  priceStyle:{
    padding: 3,
    fontFamily: "fontello",
    fontSize: 14,
    color : 'gray',
    //fontFamily: "vincHand",
  }

})


