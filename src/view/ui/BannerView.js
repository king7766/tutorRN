import React, { Component } from 'react';
import { 
   Text, 
   Image, 
   View, 
   StyleSheet, 
   FlatList ,
   TouchableOpacity
} from 'react-native';
import Dimensions from 'Dimensions';

const layout = require('tutorRN/src/Layout')
import strings from 'tutorRN/src/service/strings'
import Assets from 'tutorRN/src/view/ui/Assets'

class BannerView extends Component{

  constructor (props){
    super(props);

  }
  componentWillMount(){
    this.mounted = true
  } 

  imageStyle ()
  {
    var margin = 15
    return {
      margin:margin,
      //marginLeft:margin,
      //marginRight:margin,
      height:this.props.height - (margin*2 ), 
      width:this.props.width - (margin*2 ),
      borderRadius:10,
      borderWidth:1,
      //backgroundColor:'yellow',
      borderColor:'transparent'
    }
  }

  backgroundStyle()
  {
    return {
      height:this.props.height,
      width:this.props.width, 
      backgroundColor:'white', 
      justifyContent:'center'
    }

  }

  bannerOnClicked(index)
  {
    this.props.bannerOnClicked(index)
  }


  render (){

    return(
      <View style={this.backgroundStyle()}>

        <FlatList
          data = {this.props.source}
          horizontal = {true}
          keyExtractor= {(item, index)=>index.toString()}
          pagingEnabled={true}
          renderItem=
          {
            ({item, index, separators}) => 
            <TouchableOpacity
              onPress={()=>this.bannerOnClicked(index)}
            >
              <Image
                key ={index}
                style = {this.imageStyle()}
                source = {{uri:item}}
                resizeMode = 'cover'
              />
            </TouchableOpacity>
            
          }
        />
      </View>  
    )
  }
}

BannerView.defaultProps = {
  width : layout.deviceWidth,
  height : layout.deviceWidth * 6 /16 ,
  
};

export default BannerView;

const styles = StyleSheet.create ({
  
})


