import React, { Component } from 'react';
import { 
   Text, 
   Image, 
   View, 
   StyleSheet, 
   ScrollView ,
   TouchableHighlight
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Dimensions from 'Dimensions';
//import Hyperlink from 'react-native-hyperlink'
import ParsedText from 'react-native-parsed-text';
const layout = require('tutorRN/src/Layout')


class NewsCell extends Component{

  constructor (props){
    super(props);

  }
  componentWillMount(){
    this.mounted = true
  } 

  onClicked(index)
  {
    this.props.onClicked(index)
  }

  tagOnClicked( item)
  {
    console.log('tagOnClicked = ' + item)
  }

  render (){

    var res = this.props.news.tags.split("," )

    return(

      <TouchableHighlight 
        onPress={ ()=>this.onClicked(this.props.news.id)}
        underlayColor = {layout.touchHighlightColor}
      >
        <View style = {styles.background}>
          <Image 
            style = {styles.imageStyle}
            source = {{uri: this.props.news.news_thumb}}
            // cover, contain, stretch, center
            rezizeMode = 'stretch'
          />
          <Text 
            style = {styles.titleStyle}
          >
            {this.props.news.news_title}
          </Text>
          <Text
            style = {styles.contentStyle}
            numberOfLines={2}
          >
            {this.props.news.description}
          </Text>
          <View
            style = {styles.tagStyle}
          >
          {
            res.map(
              (item,index)=>
              (
                <TouchableHighlight 
                  key = {index}
                  onPress={ ()=>this.tagOnClicked(item)}
                  underlayColor = {layout.touchHighlightColor}
                >
                  <View 
                    style = {{padding: 5}}
                    //key = {index}
                  >
                    <Text style = {styles.tagTextStyle} >
                      {item}
                    </Text>
                  </View>
                </TouchableHighlight>
              )
            )
          }
          </View>
          <Text
            style = {styles.dateStyle}
          >
            {this.props.news.news_publish_start_date}
          </Text>
        </View>
      </TouchableHighlight>

    )
  }
}

export default NewsCell;

const styles = StyleSheet.create ({
  background:{
    //flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    width: layout.deviceWidth,
    height: 150 + 20 + 50 + 20 + 20 + 25, // last is padding
    padding: 5
  },

  imageStyle :{
    //backgroundColor: 'rgba(61,89,148,1)',
    height:150
    
    //width:layout.deviceWidth

  },

  titleStyle:{
    //backgroundColor: 'red',
    fontWeight: 'bold',
    height: 20,
    height: 25,
    padding: 5
  },
  contentStyle:{
    height: 50,
    padding: 5,
    paddingBottom: 5
  },

  dateStyle:{
    padding: 5,
    height: 20,
    color:'gray',
    fontSize:12
  },
  

  tagStyle:{
    flexDirection:'row'
  },

  tagTextStyle:{
    padding : 5, 
    backgroundColor : layout.touchHighlightColor,
    fontSize: 13,
    color: 'white'
  }
})


