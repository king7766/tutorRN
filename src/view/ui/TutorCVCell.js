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

import TutorProfileBlock from './TutorProfileBlock'
import TutorProfileTextBlock from './TutorProfileTextBlock'

const layout = require('../../Layout')


class TutorCVCell extends Component{

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

  arrowOnClicked (index ){
    console.log('arrowOnClicked = ' + index)
  }


  render (){

    const tutor = this.props.tutor



    return(

      
      <ScrollView
        style = {{height: 130}}
        scrollEnabled = {true}
        pagingEnabled = {true}
        horizontal = {true}
      >
        <View style = {styles.backgroundStyle} >

          <TutorProfileBlock
            tag = {0}
            tutor = {this.props.tutor}
            onClicked = {this.arrowOnClicked}
          />

          <TutorProfileTextBlock
            tag = {1}
            arrowOn = {true}
            title = '課程簡介'
            description = {this.props.tutor.description}
            onClicked = {this.arrowOnClicked}
          />
        </View>
      </ScrollView>
      

      )
  }
}

export default TutorCVCell;

const styles = StyleSheet.create ({


  backgroundStyle:{
    width: layout.deviceWidth *2,
    flexDirection:'row',
  },

  background:{
    backgroundColor: 'white',
    //flex: 1,
    flexDirection: 'row',
    width: layout.deviceWidth,

    //height: 100,
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
    //width: layout.deviceWidth *2,
    //flexDirection:'row',

    //borderBottomColor: 'gray',
    //borderBottomWidth: 0.5
    //padding: 5
    //paddingTop:5,
    //paddingBottom:5
    //padding:5
  },

  typeViewStyle:{
    marginTop:5,
    marginBottom:5,
    width: 10,
    //backgroundColor: 'red'

  },

  dateViewStyle:{
    padding: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  photoViewStyle:{
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


