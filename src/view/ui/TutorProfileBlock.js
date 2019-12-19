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
import {
  Avatar,
} from 'tutorRN/src/view/ui/UIComponent';
const layout = require('tutorRN/src/Layout')

class TutorProfileBlock extends Component{

  constructor (props){
    super(props);
    
    this.state = {
      editmode: true,
      user_introduction: this.props.tutor.user_introduction,
      title : this.props.tutor.title,
      exp: this.props.tutor.exp,
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

  editBtnOnClick()
  {
    this.setState({
      editmode:!this.state.editmode
    })
    if ( this.state.editmode == false)
    {

    }
  }

  content()
  {
    /*
    return (
      <View style = {{flex:2, backgroundColor:'white' }}>
        <View style= {{flex:1, backgroundColor:'yellow'}}/>
        <View style= {{flex:1, backgroundColor:'blue'}}/>
        <View style= {{flex:3, backgroundColor:'green'}}/>
      </View>

    )
    */
    return (
      <View style = {{flex:2, backgroundColor:'white' }}>
        {
          /*
          <Text style = {styles.profileTitleStyle}>
          自我介紹
          </Text>
          */
        }
        
        <Text
          style = {styles.nameStyle}
        >
          {this.props.tutor.user_nickname}
        </Text>
        {
          this.props.allowEdit ? 

          <TextInput 
            multiline
            lineHeight= {40}
            numberOfLines={4}
            style = {styles.subtextStyle}
            value = {this.state.user_introduction}
            editable = {this.props.allowEdit}
            //editable = {this.state.editmode}
            onChangeText={(user_introduction) => this.setState({user_introduction})}
          />
          :
            <Text
              style = {styles.subtextStyle}
              numberOfLines={4}
            >
              {this.state.user_introduction}
            </Text>
        }
        
        
      </View>
    )
  } 

  render (){

    return (
      <View style = {{flexDirection:'row', width:layout.deviceWidth, height:130,  backgroundColor:'white'}}>
        <View style = {styles.imageStyle} >

          <Avatar
            //onPress={() => {this.avatarOnClicked()}}
            round = {true}
            size = {80}
            type = {this.props.allowEdit == true ? 'edit' :''}
            //type = 'edit'
            url = {this.props.tutor.user_thumb}
            //url = {'https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-1/p320x320/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=110&_nc_oc=AQm5NxA1rY7W4d8YqPG0djDuG9uowyIbyAUwRkq7JOcJ9huJWbhhO2YfJ-37dviIEtA&_nc_ht=scontent-hkg3-1.xx&oh=c643ddf949263ca18a4c0eead81e1da3&oe=5DD86A90'}
          />
        </View>
        
        {
          this.content()
        }
        
      </View>
    )
  }
}

TutorProfileBlock.defaultProps = {
  tag : 1,
  touchColor: 'rgba(107,157,242,1)',
};

export default TutorProfileBlock;

const styles = StyleSheet.create ({
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
    
    flex:1, 
    alignItems:'center', 
    justifyContent:'center',
  
  },
  profileTitleStyle:{
    flex: 1,
    fontSize: layout.stringsSizeMid,
    marginTop:10,
    margin:5,
  },
  nameStyle:{
    flex:1,
    fontSize: layout.stringsSizeMid,
    fontWeight: 'bold',
    margin:5, 
    
  },
  subtextStyle:{
    lineHeight:layout.defaultLineHeight,
    margin:5,
    flex:4,
    fontSize: layout.stringsSizeSmall,

  }
})