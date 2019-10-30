import React, { Component } from 'react';
import { 
   Text, 
   Image, 
   View, 
   StyleSheet, 
   ScrollView ,
   TouchableHighlight,
   TouchableOpacity
} from 'react-native';
import Dimensions from 'Dimensions';
//import Hyperlink from 'react-native-hyperlink'
import ParsedText from 'react-native-parsed-text';

import strings from 'tutorRN/src/service/strings'
import Assets from 'tutorRN/src/view/ui/Assets'

const layout = require('tutorRN/src/Layout')


class NewsItemCell extends Component{

  constructor (props){
    super(props);

    this.displayViewOnClicked = this.displayViewOnClicked.bind(this)
  }
  componentWillMount(){

  } 

  showUI()
  {
    return (
      <View style = {{position: 'absolute', backgroundColor:'#00000000'}}>
        <View style = {styles.tutorNameViewStyle}>
          <Image 
            style = {styles.tutorImageStyle}
            source = {{uri: this.props.item.tutor_thumb}}
          />
          <Text style = {styles.tutorNameTextStyle} >
            {this.props.item.tutor_name}
          </Text>
        </View>

        <TouchableOpacity
        >
          <Image style = {styles.commentIconStyle} source={Assets.actions.comment} />
        </TouchableOpacity>

        <TouchableOpacity
        >
          <Image style = {styles.likeIconStyle} source={Assets.actions.like} />
        </TouchableOpacity>

        <View style = {styles.newsTextViewStyle}>
          <Text style = {styles.newsContentTextStyle} >{this.props.item.news_title}</Text>
          <Text style = {styles.newsTitleTextStyle}
            numberOfLines= {3} 
          >{this.props.item.news_content}</Text>

        </View>
      </View>
    )
  }

  displayViewOnClicked()
  {
    console.log('displayViewOnClicked')
  }

  

  render (){
    
    return(

      <TouchableOpacity 
        onPress = {this.displayViewOnClicked}
      >
        <View style = {styles.fullViewStyle}>
          {
            this.showUI()
          }
        
        </View>
      </TouchableOpacity>

    )
  }
}

export default NewsItemCell;

const styles = StyleSheet.create ({
  tutorNameViewStyle:{
    paddingLeft: 10,
    top:30,
    width: layout.deviceWidth,
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  tutorImageStyle:{
    height: 30, 
    width: 30, 
    borderRadius:15, 
    borderColor:'white' ,
    borderWidth:2
  },

  tutorNameTextStyle :{
    paddingLeft: 10,
    color:'white', 
    fontWeight:'bold', 
    backgroundColor: 'rgba(0,0,0,0)'
  },

  commentIconStyle :{
    left : layout.deviceWidth - 50,
    height: 40,
    width: 40
  },

  likeIconStyle:{
    left : layout.deviceWidth - 50,
    height: 40,
    width: 40
  },
  fullViewStyle :{
    backgroundColor:'black',
    width: layout.deviceWidth,
    height: layout.deviceHeight
  },

  newsTextViewStyle:{
    position: 'absolute',
    left:0,
    top: layout.deviceHeight - 200,
    height:50,
    width: layout.deviceWidth,
    backgroundColor:'white',
  },

  newsContentTextStyle:{
    color:'white', 
    fontWeight:'bold', 
    fontSize:layout.stringsSizeMid,  
    top:10 
  },

  newsTitleTextStyle:{
    color:'white',
    lineHeight: 20,
    fontSize:layout.stringsSizeSmall
  }

})


