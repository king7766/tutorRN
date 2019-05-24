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


class TutorSelectCell extends Component{

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

  selectTutor = (index) => {
    //NewsHomeView
    //console.log('handleSettingsPress' + index)
    this.props.onClicked(index)
    //this.props.navigation.navigate('NewsHomeView');

  }

  render (){


    const imageURL = this.props.imageURL
    const content = this.props.content
    console.log('imageURL = ' + imageURL)

    const location = '\uE801  ' + '赤柱'
    const course_fee = '\t\uF155  ' + this.props.item.course_fee
    const rating = '4.5' + '  \uE803'

    return(
      <TouchableHighlight 

        onPress={ ()=>this.selectTutor(this.props.index)}
        //onPress={this.selectTutor }
        underlayColor = {layout.touchHighlightColor}
        //underlayColor = 'gray'
        >
      <View style = {styles.background}>
        

       
        <View style = {styles.photoViewStyle}>
          <Image 
            style = {styles.imageStyle}
            source = {{uri: this.props.item.tutor_img}}
            // cover, contain, stretch, center
            rezizeMode = 'contain'
          />
          <Text style = {{fontSize: 14, padding : 5, fontFamily: "fontello"}}>
            {this.props.item.course_ranking}
          </Text>
        </View>

        <View style = {styles.tutorViewStyle}>
          <Text style = {styles.nameStyle}>
            {this.props.item.course_introduction}
          </Text>

          <Text style = {styles.subjectStyle}>
            {this.props.item.course_name}
          </Text>

          <View style = {{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',}}>
            <Text style = {styles.locationStyle}>
              {this.props.item.tag_name}
            </Text>

            <Text style = {styles.priceStyle}>
              {course_fee}
            </Text>
          </View>
        </View>

        

        

      </View>
      </TouchableHighlight>
      )
  }
}

export default TutorSelectCell;

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
    padding : 5,
    paddingLeft : 10,
    flexDirection: 'column',
    //alignItems: 'center'
    justifyContent: 'center'
  },

  nameStyle:{
    padding: 3,
    fontSize: 18,
    fontWeight: 'bold',
  },

  subjectStyle:{
    padding: 3,
    fontFamily: "fontello",
    fontWeight: 'bold',
    fontSize: 16,
  },


  locationStyle:{
    padding: 3,
    fontFamily: "fontello",
    fontSize: 14,
    color : layout.themeTextColor,
    fontWeight: 'bold',
    //fontFamily: "vincHand",
  },

  priceStyle:{
    padding: 3,
    fontFamily: "fontello",
    fontSize: 14,
    color : 'gray',
    //fontFamily: "vincHand",
  }
})


