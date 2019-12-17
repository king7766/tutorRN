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

const layout = require('tutorRN/src/Layout')


class LessonCell extends Component{

  constructor (props){
    super(props);

  }
  componentWillMount(){
    this.mounted = true
  } 

  handleSettingsPress = () => {
    //NewsHomeView
    //console.log('handleSettingsPress')
    //this.props.navigation.navigate('NewsHomeView');

  }

  typeViewStyle ()
  {
    var color 
    if ( this.props.lesson.type === 1)
    {
      color = 'green'
    }
    else if ( this.props.lesson.type === 2 )
    {
      color = 'red'
    }
    else
    {
      color = 'rgba(233,155,77,1)'
    }
    return {
      marginTop:5,
      marginBottom:5,
      width: 10,
      backgroundColor: color
    }
  }

  selectedLesson = (index) => {
    //NewsHomeView
    //console.log('handleSettingsPress' + index)
    this.props.onClicked(index)
  }

  render (){


    //const imageURL = this.props.imageURL
    //const content = this.props.content
    
    //const detail = '\uE800  ' + this.props.lesson.location + '\t\uF155  ' + this.props.lesson.price
    const location = '\uE801  ' + this.props.lesson.location 
    const price = '\t\uF155  ' + this.props.lesson.price

    const time = '\uE807  ' + this.props.lesson.startTime + ' - ' + this.props.lesson.endTime
    const rating = this.props.lesson.rating + '  \uE803'

    return(
      
      <TouchableHighlight 
        onPress={ ()=>this.selectedLesson(this.props.index)}
        //onPress={this.handleSettingsPress}
        underlayColor = {layout.touchHighlightColor}
        //underlayColor = 'gray'
        >
      
      <View style = {styles.background}>
        <View style = {this.typeViewStyle()}>

        </View>

        <View style = {styles.dateViewStyle}>
          <Text style = {{fontSize: 16, fontWeight: 'bold'}}>25</Text>
          <Text style = {{fontSize: 16, fontWeight: 'bold'}}>DEC</Text>
          <Text style = {{fontSize: 16, fontWeight: 'bold'}}>Mon</Text>

        
        </View>
        <View style = {styles.photoViewStyle}>
          <Image 
            style = {styles.imageStyle}
            source = {{uri: this.props.lesson.image}}
            // cover, contain, stretch, center
            rezizeMode = 'contain'
          />
          <Text style = {{fontSize: 14, padding : 5, fontFamily: "fontello"}}>
            {rating}
          </Text>
        </View>

        <View style = {styles.lessonViewStyle}>
          <Text style = {styles.subjectStyle}>
            {this.props.lesson.subject}
          </Text>

          <Text style = {styles.timeStyle}>
            {time}
          </Text>

          <View style = {{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',}}>
            <Text style = {styles.locationStyle}>
              {location}
            </Text>

            <Text style = {styles.priceStyle}>
              {price}
            </Text>
          </View>
          

        </View>
        

        

      </View>
      </TouchableHighlight>
      )
  }
}

export default LessonCell;

const styles = StyleSheet.create ({
  background:{
    backgroundColor: 'white',
    //flex: 1,
    flexDirection: 'row',
    width: layout.deviceWidth,
    height: 100,
    //borderTopColor: 'gray',
    //borderTopWidth: 0.5

    borderBottomColor: 'gray',
    borderBottomWidth: 0.5
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
    //padding: 5
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
    
  },

  imageStyle :{

    marginTop:10,
    //backgroundColor: 'rgba(61,89,148,1)',
    //backgroundColor: 'red',
    height:60,
    width: 60
    
    //width:layout.deviceWidth

  },

  lessonViewStyle:{
    padding : 5,
    paddingLeft : 10,
    flexDirection: 'column',
    //alignItems: 'center'
    justifyContent: 'center'
  },

  subjectStyle:{
    padding: 3,
    fontSize: 18,
    fontWeight: 'bold',
  },

  timeStyle:{
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


