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

import TimedSlideshow from 'react-native-timed-slideshow';
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
    this.defaultImage = (  
      <Image
        source={Assets.background.welcome}
        style = {styles.defaultImage}
        resizeMode = 'stretch'
      />
    )
  } 

  showUI()
  {
    return (
      <View style = {{flex: 1}}>
        <View style = {styles.upperPartViewStyle}>
          <View style = {styles.tutorNameViewStyle}>
            <Image 
              //style = {styles.tutorImageStyle}
              style = {[layout.styles.homeIconSize, styles.tutorImageStyle]}
              source = {{uri: this.props.item.tutor_thumb}}
            />
            <Text style = {[styles.tutorNameTextStyle, this.props.item.course_media_list.length > 0 ? {color:'white'} : {color:'black'}] }>
              {this.props.item.tutor_name}
            </Text>
          </View>

        </View>
        <View style = {styles.lowerPartViewStyle}>
        
          <TouchableOpacity
            style = {[layout.styles.homeIconSize, {left:layout.deviceWidth - 50}]}
            onPress = {()=>this.props.commentBtnOnClicked(this.props.index)}
          >
            <Image style ={layout.styles.homeIconSize} source={Assets.actions.comment} />
          </TouchableOpacity>

          <TouchableOpacity
            style ={[layout.styles.homeIconSize, {left:layout.deviceWidth - 50}]}
            onPress = {()=>this.props.likeBtnOnClicked(this.props.index)}
          >
            <Image style = {layout.styles.homeIconSize} source={Assets.actions.like} />
          </TouchableOpacity>
        </View>
        <View style = {styles.lowerPartViewStyle}>
          {
            this.props.item.course_media_list.length == 0 &&
            <View style = {styles.newsTextViewStyle}>
              <Text style = {styles.newsContentTextStyle} >{this.props.item.course_name}</Text>
              <Text 
                style = {styles.newsTitleTextStyle}
                numberOfLines= {3} 
              >
                {this.props.item.course_introduction}
              </Text>
            </View> 
          }
          
        </View>                                                     
      </View>
    
    )
  }

  showContent()
  {
    
    
    const items = [
			{
				uri: "https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/5895592a166f19435e4e127ae1b1f336.jpg",
				title: "Michael Malik",
        text: "Minnesota, USA",
        //extraSpacing:100,
        fullWidth: false,
			},
			{
				uri: 'https://images.unsplash.com/photo-1485832329521-e944d75fa65e?auto=format&fit=crop&w=1000&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
				title: "Victor Fallon",
				text: "Val di Sole, Italy",
        duration: 5000,
        fullWidth: true
        
			},
			{
				uri: "https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/5895592a166f19435e4e127ae1b1f336.jpg",
				title: "Mary Gomes",
				text: "Alps",
				fullWidth: true
			}
    ]

    var photos = []
    if ( this.props.item.course_media_list.length > 0 )
    {
      for (var i = 0; i < this.props.item.course_media_list.length ; i ++)
      {
        photos.push({
          uri:this.props.item.course_media_list[i].media_file,
          title:this.props.item.course_name,
          text:this.props.item.course_introduction,
          //fullWidth: true,
          extraSpacing:300,
        })
      }

      return (
        <View style={{height:layout.contentHeight, width:'100%', position:'absolute',backgroundColor:'black' }} >
          <TimedSlideshow
            progressBarColor = {layout.themeTextColor}
            items={photos}
          />
        </View>
      )
    }
    else
    {
      return (
        <View style={{height:layout.contentHeight, width:'100%', position:'absolute',backgroundColor:'black' }} >
          {this.defaultImage}
        </View>
      )
    }  
  }

  displayViewOnClicked()
  {
    console.log('displayViewOnClicked')
  }

  

  render (){
     
    return(

      <TouchableOpacity 
        onPress = {()=>this.props.onClicked(this.props.index)}
        style = {{  height:layout.contentHeight}}
      >
        {
          this.showContent()
        }
        {
          this.showUI()
        }
        
      </TouchableOpacity>

    )
  }
}

export default NewsItemCell;

const styles = StyleSheet.create ({
  upperPartViewStyle:{
    flex:1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    //backgroundColor:'orange',
    //width:'100%'
  },
  lowerPartViewStyle:{
    flex:4,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    //backgroundColor:'green',
    //width:'100%'
    
  },

  tutorNameViewStyle:{
    paddingLeft: 10,
    //top:30,
    width: layout.deviceWidth,
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  tutorImageStyle:{
    //height: 30, 
    //width: 30, 
    borderRadius:20, 
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
    flex:1,
    backgroundColor:'black',
    //width: layout.deviceWidth,
    //height: layout.deviceHeight
  },

  newsTextViewStyle:{
    backgroundColor:'red',
    
    left:0,
    right:0,
    //bottom: 0,
    
    flexDirection:'column',
    //top: layout.deviceHeight - 200,
    height:120,
    width: layout.deviceWidth,
    backgroundColor:'rgba(0, 0, 0, 0.5)',
  },

  newsContentTextStyle:{
    
    padding:10,
    color:'white', 
    fontWeight:'bold', 
    fontSize:layout.stringsSizeMid,  
    
  },

  newsTitleTextStyle:{
    paddingLeft:10,
    paddingRight:10,
    color:'white',
    lineHeight: 20,
    fontSize:layout.stringsSizeSmall
  },
  defaultImage: {
    height:'100%',
    width:'100%',
  },

})


