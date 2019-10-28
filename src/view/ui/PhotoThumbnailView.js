import React, { Component } from 'react';
import { 
   Text, 
   Image, 
   View, 
   StyleSheet, 
   FlatList,
   TouchableOpacity ,
} from 'react-native';

import Assets from 'tutorRN/src/view/ui/Assets';
import Dimensions from 'Dimensions';
//import Hyperlink from 'react-native-hyperlink'
import ParsedText from 'react-native-parsed-text';
const layout = require('tutorRN/src/Layout')


class PhotoThumbnailView extends Component{

  constructor (props){
    super(props);
    this.imageOnClicked = this.imageOnClicked.bind(this)

  }

  componentWillMount(){
    this.mounted = true
    //this.props.onReady()
  } 

  imageOnClicked(index) {
    
    console.log('imageOnClicked = ' + index)
    
    if ( this.props.addBtnVisible && (index == this.props.imageSource.length-1) )
    {
      this.props.addBtnOnClicked()
    }
    else
    {
      this.props.imageOnClicked(index)
    }
    
  }

  render (){

    
    var imageSource = this.props.imageSource
    console.log('imageSource = ' + JSON.stringify(this.props.imageSource))
    if ( this.props.addBtnVisible && imageSource[imageSource.length-1] != 'add' )
    {
      // add last image here
      imageSource.push('add')
    }

 

    return(

      <View style = {styles.background}>
        <FlatList
          style={{ flex: 0 }}
          removeClippedSubviews={false}
          horizontal = {true}
          //data = {this.props.imageSource}
          data = {imageSource}
          renderItem={({item, index, separators}) => 
            <TouchableOpacity
              //style = {{marginLeft:5, marginRight:5}}
              onPress={()=>this.imageOnClicked(index)}
            >
              {
                item.media_file !== undefined ? 
                  <Image 
                    style = {{ height:90, width:90, margin:5}}
                    source={{uri: item.media_file }}
                    //source = { url.node ?  { uri: url.node.image.uri } : (typeof url) == 'string' ?  {uri:url} : url  }
                  /> : 
                  <View
                    style = {{justifyContent:'center', alignItems:'center', height:100, width:100}}
                  >
                    <Image 
                      style = {{height: 40, width:40}}
                      //style = {{ height:40, width:40,bottom:0, top:60}}
                      source=  {Assets.icon.addImage}
                    />
                  </View>
              }
            </TouchableOpacity>
          }
        />
      </View>

    )
  }
}

export default PhotoThumbnailView;

const styles = StyleSheet.create ({
  background:{
    flex:1,
  },
  
})


