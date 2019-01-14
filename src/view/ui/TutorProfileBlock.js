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


class TutorProfileBlock extends Component{

  constructor (props){
    super(props);
    this.arrowOnClick = this.arrowOnClick.bind(this)

  }
  componentWillMount(){
    this.mounted = true
  } 

  arrowOnClick (index ){
    console.log('arrowOnClick = ' + index)
    this.props.onClicked(index)
  }

  render (){

    return(
   
      <View style = {styles.background}>
        

        
        <View style = {styles.photoViewStyle}>
          <Image 
            style = {styles.imageStyle}
            source = {{uri: this.props.tutor.image}}
            // cover, contain, stretch, center
            rezizeMode = 'contain'
          />
          
        </View>

        <View style = {styles.tutorViewStyle}>
          <Text style = {styles.nameStyle}>
            {this.props.tutor.name}
          </Text>
          <Text style = {styles.subtextStyle}>
            {this.props.tutor.job}
          </Text>
          <Text style = {styles.subtextStyle}>
            {this.props.tutor.title}
          </Text>
          <Text style = {styles.subtextStyle}>
            {this.props.tutor.exp}
          </Text>
          <Text style = {styles.subtextStyle}>
            {this.props.tutor.gender}
          </Text>
          <Text style = {styles.subtextStyle}>
            {this.props.tutor.location}
          </Text>
        </View>
        {this.props.arrowOn && 
          <TouchableHighlight 
              underlayColor = {this.props.touchColor}
              onPress={ ()=>this.arrowOnClick(this.props.tag+1)}
            >
            <Image 
              style = {{ flex: 1,width: 30, height: 30}}
              source= {require('tutorRN/src/image/right_arrow_icon_100.png')}
              resizeMode =  'contain'
            />
          </TouchableHighlight>
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
    //flex: 1,
    flexDirection: 'row',
    width: layout.deviceWidth,

    //height: 150,
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
    //width: layout.deviceWidth *2,
    //flexDirection:'row',

    //borderBottomColor: 'gray',
    //borderBottomWidth: 0.5
    //padding: 5
    //paddingTop:5,
    //paddingBottom:5
    //padding:5
  },

  photoViewStyle:{
    flex: 3,
    paddingLeft: 5,
    paddingRight: 5,
    //flexDirection: 'column',
    //backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
    
  },

  imageStyle :{

    //marginTop:10,
    //backgroundColor: 'rgba(61,89,148,1)',
    //backgroundColor: 'red',

    height:80,
    width: 80
    
    //width:layout.deviceWidth

  },

  tutorViewStyle:{
    flex: 6,
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
    paddingLeft : 10,
  },

  subtextStyle:{
    //backgroundColor: 'green',
    color: 'rgba(107,157,242,1)',
    fontSize: 12,
    padding : 2,
    paddingLeft : 10,
  }
})