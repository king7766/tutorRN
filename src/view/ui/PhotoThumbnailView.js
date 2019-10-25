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

  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }

  imageOnClicked(index) {
    
    if ( this.props.addBtnVisible && index == this.props.imageSource.length - 1)
    {
      this.props.addBtnOnClicked()
    }
    else
    {
      this.props.imageOnClicked(index)
    }
  }

  slideOnClick()
  {
    
    console.log('PhotoSlideView on slideOnClick')
    //this.props.onPress()
  }

  render (){

    
    var imageSource = this.props.imageSource
    console.log('imageSource = ' + JSON.stringify(this.props.imageSource))
    if ( this.props.addBtnVisible)
    {
      // add last image here
      imageSource.push('add')
    }

    return(

      <View style = {styles.background}>
        <FlatList
          horizontal = {true}
          //data = {this.props.imageSource}
          data = {imageSource}
          renderItem={({item, index, separators}) => 
            <TouchableOpacity
              style = {{marginLeft:5, marginRight:5}}
              onPress={()=>this.imageOnClicked(index)}
            >
              {
                item.media_file !== undefined ? 
                  <Image 
                    style = {{ height:100, width:100}}
                    source={{uri: item.media_file }}
                    //source = { url.node ?  { uri: url.node.image.uri } : (typeof url) == 'string' ?  {uri:url} : url  }
                  /> : 
                  <Image 
                    style = {{ height:40, width:40,bottom:0, top:60}}
                    source=  {Assets.icon.addPhoto}
                  />
                  
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


