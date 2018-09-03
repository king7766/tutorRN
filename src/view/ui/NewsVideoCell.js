import React, { Component } from 'react';
import { 
   Text, 
   Image, 
   View, 
   StyleSheet, 
   ScrollView ,
   TouchableHighlight
} from 'react-native';
//import Video from 'react-native-video';
import Dimensions from 'Dimensions';
//import Hyperlink from 'react-native-hyperlink'
import ParsedText from 'react-native-parsed-text';
const layout = require('../../Layout')


class NewsVideoCell extends Component{

  constructor (props){
    super(props);

  }
  componentWillMount(){
    this.mounted = true
  } 

  onClicked(index)
  {
    this.props.onClicked(index)
  }

  tagOnClicked( item)
  {
    console.log('tagOnClicked = ' + item)
  }

  render (){

    //var res = this.props.news.tags.split("," )
    //http://techslides.com/demos/sample-videos/small.mp4 
    return(

      <View>
       
      </View>

    )
  }
}

export default NewsVideoCell;

const styles = StyleSheet.create ({
  background:{
    //flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    width: layout.deviceWidth,
    height: 150 + 20 + 50 + 20 + 20 + 25, // last is padding
    padding: 5
  },

  imageStyle :{
    //backgroundColor: 'rgba(61,89,148,1)',
    height:150
    
    //width:layout.deviceWidth

  },

  titleStyle:{
    //backgroundColor: 'red',
    fontWeight: 'bold',
    height: 20,
    height: 25,
    padding: 5
  },
  contentStyle:{
    height: 50,
    padding: 5,
    paddingBottom: 5
  },

  dateStyle:{
    padding: 5,
    height: 20,
    color:'gray',
    fontSize:12
  },
  

  tagStyle:{
    flexDirection:'row'
  },

  tagTextStyle:{
    padding : 5, 
    backgroundColor : layout.touchHighlightColor,
    fontSize: 13,
    color: 'white'
  }
})


