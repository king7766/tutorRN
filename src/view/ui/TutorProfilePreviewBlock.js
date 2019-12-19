import React, { Component } from 'react';
import { 
   Text, 
   Image, 
   View, 
   StyleSheet, 
   ScrollView ,
   ListView,
   Linking,
   TouchableHighlight,
   TouchableOpacity,
   TextInput
} from 'react-native';
import strings from '../../service/strings';
import userVM from 'tutorRN/src/VM/userVM'

import {
  Avatar,
  TutorProfileTextBlock
} from 'tutorRN/src/view/ui/UIComponent';

const layout = require('tutorRN/src/Layout')
const userViewModel = userVM.getInstance()

class TutorProfilePreviewBlock extends Component{

  constructor (props){
    super(props);
    
    this.state = {
      
      name: this.props.name,
      description: this.props.description,

      //rating: this.props.rating,
      //appliedLesson: this.props.appliedLesson,
      //teachedLesson: this.props.teachedLesson,
      rating: '1',
      appliedLesson:'99',
      teachedLesson:'99',


    }
    this.arrowOnClick = this.arrowOnClick.bind(this)

  }
  componentWillMount(){
    this.mounted = true
  } 

  arrowOnClick (index ){
    console.log('arrowOnClick = ' + index)
    this.props.onClicked(index)
  }

  startEditBtnOnClicked()
  {
    console.log('startEditBtnOnClicked')
    this.props.onClicked()
  }

  avatarOnClicked()
  {
    console.log('avatarOnClicked')
  }

  upperPartUI()
  {
    return (
      <View
        style = {styles.upperPartUIStyles}
      >
        <View style = {styles.imageStyle} >
          <Avatar
            onPress={() => {this.avatarOnClicked()}}
            round = {true}
            size = {80}
            //type = 'edit'
            url = {userViewModel.getUser().user_thumb}
            //url = {'https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-1/p320x320/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=110&_nc_oc=AQm5NxA1rY7W4d8YqPG0djDuG9uowyIbyAUwRkq7JOcJ9huJWbhhO2YfJ-37dviIEtA&_nc_ht=scontent-hkg3-1.xx&oh=c643ddf949263ca18a4c0eead81e1da3&oe=5DD86A90'}
          />
        </View>
        
        
        <View
          style = {{flexDirection:'column',  flex:2}}
        >
          <View style = {{ flex:1, flexDirection:'row', justifyContent:'center'}}>
            <View style = {{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}> 
              <Text style = {{fontWeight:'bold'}} >
                評價 {this.state.rating}
              </Text>
              
            </View>
            <View style = {{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}> 
              
              <Text style = {{fontWeight:'bold'}}>{this.state.appliedLesson}</Text>
              <Text style = {{fontSize:layout.stringsSizeSmall, color:'gray'}} >{strings.appliedLesson}</Text>
            </View>
            <View style = {{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}> 
              <Text style = {{fontWeight:'bold'}}>{this.state.teachedLesson}</Text>
              <Text style = {{fontSize:layout.stringsSizeSmall , color:'gray'}} >{strings.teachedLesson}</Text>
            </View>
            
          </View>
          <View style = {{flex:1,  flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <TouchableHighlight
              onPress = {()=>this.startEditBtnOnClicked()}
              style = {{borderColor:'gray', borderRadius:5, borderWidth:2, padding:5, justifyContent:'center'}}
            >
              <Text
                style = {{ textAlign:'center'}}
              >
                {strings.startEditProfile}
              </Text>
            </TouchableHighlight>
          </View>

        </View>
      </View>
    )
  }

  lowerPartUI()
  {
    //E.stringsSizeBig
    return (

      <TutorProfileTextBlock
        allowEdit = {false}
        arrowOn = {false}
        title = {userViewModel.getUser().user_nickname}
        description = {userViewModel.getUser().user_introduction}
      />

     
    )
  }

  render (){


    return (
      <View style = {{ width:layout.deviceWidth, backgroundColor:'white'}}>
        
        {
          this.upperPartUI()
        }
       
        
        {
          this.lowerPartUI()
        }
        
      </View>
    )
  }
}

TutorProfilePreviewBlock.defaultProps = {
  tag : 1,
  touchColor: 'rgba(107,157,242,1)',
  
};

export default TutorProfilePreviewBlock;

const styles = StyleSheet.create ({

  upperPartUIStyles:{
    
    margin:15,
    flexDirection: 'row',
    alignItems:'center',
    
  },


  background:{
    backgroundColor: 'white',
    flexDirection: 'row',
    width: layout.deviceWidth,
    borderTopWidth: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  photoViewStyle:{
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: 'red',
  },

  imageStyle :{
    marginLeft: 10,
  },

  tutorViewStyle:{
    backgroundColor: 'red',
    flex: 5,
    padding : 5,
    flexDirection: 'column',
    //alignItems: 'center'
    justifyContent: 'flex-start'
  },

  nameStyle:{
    color: 'rgba(41,62,107,1)',
    //backgroundColor: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    padding : 5,
    height:30,
  },

  subtextStyle:{
    //backgroundColor: 'green',
    color: 'rgba(107,157,242,1)',
    fontSize: 12,
    padding : 2,
    paddingLeft : 10,
    height:20,
  }
})