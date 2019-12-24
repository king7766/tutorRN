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
            onPress = {()=>this.props.actionBtnOnClicked(this.props.item.id)}
          >
            <Image style = {layout.styles.homeIconSize} source={Assets.actions.like} />
          </TouchableOpacity>
        </View>
      )
    }
    
  }



  render (){
  
    return(
      <TouchableOpacity 
        onPress={ ()=>this.selectLesson(this.props.index)}
      >
        <View style = {styles.background}>
        
          <View style = {styles.photoViewStyle}>
            <View
              style = {{flex:2, justifyContent:'center' }}
            >
              <Avatar
                round = {true}
                size = {50}    
                url = {this.props.item.tutor_thumb}
                //url = {'https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-1/p80x80/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=831d0ee264e5772b4b15faa60c7d16c4&oe=5BD89683'}   
              />
            </View>
            <View style={{alignItems: 'center', flexDirection:'row', justifyContent:'center', flex:1}}>
              <Text style = {{fontSize: layout.stringsSizeSmall, padding : 5, fontFamily: "fontello"}}>
                {this.props.item.course_ranking ? this.props.item.course_ranking : ' -- '}
              </Text>
              <Image
                style = {{height:20, width:20}}
                source={Assets.icon.star_filled}
                resizeMode='contain'
              />

              
            </View>
            
          </View>

          <View style = {styles.tutorViewStyle}>
            <Text style = {styles.nameStyle}>
              {this.props.item.tutor_name}
            </Text>

            <Text style = {styles.subjectStyle}>
              {this.props.item.course_name}
            </Text>

            <View style = {{flexDirection:'row', flex:1}}>
              <View style = {styles.infoBlockStyle}>
                <Image source={Assets.icon.location} style={{height:30, width:30}} resizeMode='contain'/>
                <Text style={styles.locationTextStyle}>
                  {locationViewModel.getLocationNameById(this.props.item.location[0].id)}
                </Text>
              </View>

              <View style = {styles.infoBlockStyle}>
                <Image source={Assets.icon.price} style={{height:30, width:30}} resizeMode='contain'/>
                <Text style = {styles.priceTextStyle}>
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
    height: 100,
    //borderTopColor: 'gray',
    //borderTopWidth: 0.5,
    backgroundColor: 'white',
    borderBottomColor: layout.backgroundColor,
    borderBottomWidth: 0.5,
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
    height:60,
    width: 60
  },

  tutorViewStyle:{
    flex:6,
    padding : 5,
    flexDirection: 'column',
    justifyContent: 'center'
  },

  nameStyle:{
    flex:1,
    marginTop:5,
    fontSize: layout.stringSizeXBig,
    fontWeight: 'bold',
  },

  subjectStyle:{
    flex:1,
    fontSize: layout.stringsSizeMid,
  },

  
  actionBtnViewStyle:{
    flex:2,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
  },

  infoBlockStyle:{
    height:30,
    padding:5,
    alignItems:'center',
    justifyContent:'flex-start',
    flexDirection:'row',
    flex:1,
  },
  locationTextStyle:{
    backgroundColor:'transparent',
    color:layout.blackColor,
    fontSize: layout.stringsSizeSmall,
  },

  priceTextStyle:{
    backgroundColor:'transparent',
    color:layout.blackColor,
    fontSize: layout.stringsSizeSmall,
  }
})


