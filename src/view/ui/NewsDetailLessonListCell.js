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
   TouchableHighlight
} from 'react-native';
import {
  Avatar,
} from 'tutorRN/src/view/ui/UIComponent';
import Assets from 'tutorRN/src/view/ui/Assets';
import strings from 'tutorRN/src/service/strings'
import locationVM from 'tutorRN/src/VM/locationVM'
import courseVM from 'tutorRN/src/VM/courseVM'

const courseViewModel = courseVM.getInstance()
const locationViewModel = locationVM.getInstance()
const layout = require('tutorRN/src/Layout')


class NewsDetailLessonListCell extends Component{

  constructor (props){
    super(props);

  }
  componentWillMount(){
    this.mounted = true
  } 

  render (){

    
    var image
    if ( this.props.item.course_media_list.length > 0 )
    {
      image = this.props.item.course_media_list[0].media_file
    }
    
    console.log('image = ' + image)
    return(
      <View
        style = {styles.background}
      >
        <View style = {styles.leftViewStyle}>
          {
            image ? 
            <Image 
              style={{width: '100%', height:50, }}
              source= {{uri:image}} /> 
              :
            <Image 
              style={{width: '100%', height:50, }}
              source ={Assets.icon.iconLogo}
            />

          }
          
        </View>
        <View style = {styles.rightViewStyle}>
          <Text 
            numberOfLines = {1}
            style = {{fontSize:layout.stringsSizeBig,fontWeight: 'bold'}}
          >
            {this.props.item.course_name}
          </Text>
          <View style ={{flexDirection:'row', justifyContent:'flex-start', height:40}}>
            <View style = {styles.infoBlockStyle}>
              <Image source={Assets.icon.location} style={layout.styles.icon} resizeMode='contain'/>
              <Text style={{ color:layout.darkGray}}>
                {locationViewModel.getLocationNameById(this.props.item.location[0].id)}
              </Text>
            </View>
            <View style = {styles.infoBlockStyle}>
              <Image source={Assets.icon.price} style={layout.styles.icon} resizeMode='contain'/>
              <Text style={{ color:layout.darkGray}}>
                {courseViewModel.getCourseFeeStringById(this.props.item.course_fee)}
              </Text>
            </View>
          
          </View>

          <Text 
            numberOfLines = {3}
            style = {{
              fontSize:layout.stringsSizeSmall,
              lineHeight:layout.defaultLineHeight,
            }}
          >
            {this.props.item.course_introduction}
          </Text>
        </View>
      </View>
    )
  }
}

export default NewsDetailLessonListCell;

const styles = StyleSheet.create ({
  background:{
    backgroundColor: 'white',
    //flex: 1,
    flexDirection: 'row',
    width: layout.deviceWidth,
    height: 150,
    //borderTopColor: 'gray',
    //borderTopWidth: 0.5,
    borderBottomColor: layout.backgroundColor,
    borderBottomWidth: 0.5,
  },

  leftViewStyle:{
    margin:10,
    flex:1,
  },
  rightViewStyle:{
    margin:10,
    flex:4,
    flexDirection:'column',
  },

  infoBlockStyle:{
    alignItems:'center',
    justifyContent:'flex-start',
    flexDirection:'row',
  },
  
})


