import React, { Component } from 'react';
import { 
   Text, 
   Image, 
   View, 
   StyleSheet, 
   FlatList,
   TouchableOpacity ,
} from 'react-native';
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
    console.log('imageOnClicked : ' + index)
    this.props.imageOnClicked(index)
  }

  slideOnClick()
  {
    
    console.log('PhotoSlideView on slideOnClick')
    //this.props.onPress()
  }

  render (){

    
    const data = [
      'https://images.unsplash.com/photo-1485832329521-e944d75fa65e?auto=format&fit=crop&w=1000&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
      'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/3a7803bf022db91704584b7297b38bc6.jpg',
      'https://images.unsplash.com/photo-1485832329521-e944d75fa65e?auto=format&fit=crop&w=1000&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
      'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/3a7803bf022db91704584b7297b38bc6.jpg', 
      'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/3a7803bf022db91704584b7297b38bc6.jpg', 
      'https://images.unsplash.com/photo-1485832329521-e944d75fa65e?auto=format&fit=crop&w=1000&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
      'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/3a7803bf022db91704584b7297b38bc6.jpg',
      'https://images.unsplash.com/photo-1485832329521-e944d75fa65e?auto=format&fit=crop&w=1000&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
    ]

    return(

      <View style = {styles.background}>
        <FlatList
          horizontal = {true}
          data = {this.props.imageSource}
          renderItem={({item, index, separators}) => 
            <TouchableOpacity
              style = {{marginLeft:5, marginRight:5}}
              onPress={()=>this.imageOnClicked(index)}
            >
              <Image 
                style = {{ height:100, width:100}}
                source={{uri: item.url }}
              />
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


