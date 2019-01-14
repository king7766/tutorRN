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


const leftArrow = (props) => {
  return <Image 
                    style = {{ width: 30, height: 30}}
                    source= {require('tutorRN/src/image/left_arrow_icon_100.png')}
                    //resizeMode =  'center'
                    resizeMode =  'contain'
                  />
}

class TutorProfileTextBlock extends Component{

  constructor (props){
    super(props);
    this.arrowOnClick = this.arrowOnClick.bind(this)

  }
  componentWillMount(){
    this.mounted = true
  } 

  arrowOnClick (index)
  {
    console.log('arrowOnClick = ' + index)
    this.props.onClicked(index)
  }

  render (){

    return(
  
        
   
      <View style = {styles.background}>
        {this.props.arrowOn && 
          <TouchableHighlight 
              underlayColor = {this.props.touchColor}
              onPress={ ()=>this.arrowOnClick(this.props.tag-1)}
            >
            <Image 
              style = {{ flex: 1,width: 30, height: 30}}
              source= {require('tutorRN/src/image/left_arrow_icon_100.png')}
              resizeMode =  'contain'
            />
          </TouchableHighlight>
        }

        <View style = {styles.descriptionBG}>
          <Text style = {styles.descriptionTitle}>
            {this.props.title}
          </Text>
          <Text style = {styles.description}>
            {this.props.description}
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

TutorProfileTextBlock.defaultProps = {
  tag : 1,
  touchColor: 'rgba(107,157,242,1)',
  
};

export default TutorProfileTextBlock;

const styles = StyleSheet.create ({

  background :{
    flexDirection:'row',
    width: layout.deviceWidth,
    //height: 150,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  descriptionBG:{
    flex: 8,
    backgroundColor: 'white',
    padding:10,
  },

  descriptionTitle:{
    color: 'rgba(41,62,107,1)',
    //backgroundColor: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    //padding : 10,
    //paddingLeft : 10,

  },
  description:{
    //backgroundColor: 'green',
    lineHeight:20,
    fontSize: 14,
    paddingTop: 10,
    //paddingLeft: 10,
    // paddingLeft: 10,
    //paddingLeft : 10,
  },
})


