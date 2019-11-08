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


class LessonListCell extends Component{

  constructor (props){
    super(props);

  }
  componentWillMount(){
    this.mounted = true
  } 

  /*
  selectTutor (){
    console.log('selectTutor')
    //this.props.onClicked(this.props.index )
    this.props.onClicked('1')
  }
  */

 selectLesson = (index) => {
    //NewsHomeView
    //console.log('handleSettingsPress' + index)
    this.props.onClicked(index)
    //this.props.navigation.navigate('NewsHomeView');

  }

  actionBtnOnClick(){
    console.log('actionBtnOnClick')
  }

  actionBtnViewStyle(){
    
  }
  actionBtnViewUI()
  {
    if ( this.props.action == "LIKE")
    {
      return(
        <View
          style = {styles.actionBtnViewStyle}
        >
          <TouchableOpacity
            style ={layout.styles.homeIconSize}
            //onPress = {()=>this.props.likeBtnOnClicked(this.props.index)}
          >
            <Image style = {layout.styles.homeIconSize} source={Assets.actions.like} />
          </TouchableOpacity>
        </View>
      )
    }
    
  }



  render (){
    const content = this.props.content
  
    const location = '\uE801  ' + '赤柱'
    const course_fee = '\t\uF155  ' + this.props.item.course_fee
    const rating = '4.5' + '  \uE803'

    console.log('this.props.item.tutor_thumb = ' + this.props.item.tutor_thumb)
    return(
      <TouchableOpacity 

        onPress={ ()=>this.selectLesson(this.props.index)}
        //onPress={this.selectTutor }
        //underlayColor = {layout.touchHighlightColor}
        //underlayColor = 'gray'
      >
        <View style = {styles.background}>
        
          <View style = {styles.photoViewStyle}>
            <Avatar
              
              round = {true}
              size = {50}
              //type = 'edit'      
              url = {this.props.item.tutor_thumb}
              //url = {'https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-1/p80x80/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=831d0ee264e5772b4b15faa60c7d16c4&oe=5BD89683'}   
            />
            
            <Text style = {{fontSize: 14, padding : 5, fontFamily: "fontello"}}>
              {this.props.item.course_ranking}
            </Text>
          </View>

          <View style = {styles.tutorViewStyle}>
            <Text style = {styles.nameStyle}>
              {this.props.item.tutor_name}
            </Text>

            <Text style = {styles.subjectStyle}>
              {this.props.item.course_name}
            </Text>

            <View style = {{flexDirection:'row'}}>
              <View style = {styles.infoBlockStyle}>
                <Image source={Assets.icon.location} style={{height:30, width:30}} resizeMode='contain'/>
                <Text style={{ color:layout.themeTextColor}}>
                  {locationViewModel.getLocationNameById(this.props.item.location[0].id)}
                </Text>
              </View>

              <View style = {styles.infoBlockStyle}>
                <Image source={Assets.icon.price} style={{height:30, width:30}} resizeMode='contain'/>
                <Text >
                  {courseViewModel.getCourseFeeStringById(this.props.item.course_fee)}
                </Text>
              </View>
            </View>
          </View>
          <View
            style = {styles.actionBtnViewStyle}
          >
            {
              this.actionBtnViewUI()
            }
            
            { 
              /*
              this.props.action && <TouchableOpacity
                onPress = {()=>this.actionBtnOnClick()}
                style = {{flex:1,margin:5, backgroundColor:'gray', justifyContent:'center', alignItems:'center'}}
              >
                <Text style = {{color:'white'}}>
                  聯絡
                </Text>
              </TouchableOpacity>
              */
            }
            { 
              /*
              this.props.action && <TouchableOpacity
                onPress = {()=>this.actionBtnOnClick()}
                style = {{flex:1,margin:5, backgroundColor:'gray', justifyContent:'center', alignItems:'center'}}
              >
                <Text style = {{color:'white'}}>
                  取消
                </Text>
              </TouchableOpacity>
              */
            }
            
          </View>
              
            
            
            
          
        </View>
      </TouchableOpacity>
      )
  }
}

export default LessonListCell;

const styles = StyleSheet.create ({
  background:{
    //backgroundColor: 'green',
    //flex: 1,
    flexDirection: 'row',
    width: layout.deviceWidth,
    height: 120,
    //borderTopColor: 'gray',
    //borderTopWidth: 0.5,
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    //padding: 5
    //paddingTop:5,
    //paddingBottom:5
    //padding:5
  },

  typeViewStyle:{
    marginTop:5,
    marginBottom:5,
    width: 10,
    backgroundColor: 'red'

  },

  dateViewStyle:{
    padding: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  photoViewStyle:{
    flex:2,
    padding: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
    
  },

  imageStyle :{

    marginTop:10,
    marginLeft: 5,
    //backgroundColor: 'rgba(61,89,148,1)',
    //backgroundColor: 'red',
    height:60,
    width: 60
    
    //width:layout.deviceWidth

  },

  tutorViewStyle:{
    flex:6,
    padding : 5,
    flexDirection: 'column',
    //alignItems: 'center'
    justifyContent: 'center'
  },

  nameStyle:{
    padding: 5,
    fontSize: layout.stringsSizeBig,
    fontWeight: 'bold',
  },

  subjectStyle:{
    padding: 5,
    fontWeight: 'bold',
    fontSize: layout.stringsSizeMid,
  },

  
  actionBtnViewStyle:{
    flex:2,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    //backgroundColor:'red',
  },
  infoBlockStyle:{
    padding:5,
    alignItems:'center',
    justifyContent:'flex-start',
    flexDirection:'row',
    flex:1,
  }
})


