import React, { Component } from 'react';
import { 
   Text, 
   Image, 
   View, 
   StyleSheet, 
   ScrollView ,
   TouchableOpacity,
   TouchableHighlight
} from 'react-native';
import Dimensions from 'Dimensions';
//import Hyperlink from 'react-native-hyperlink'
//import ParsedText from 'react-native-parsed-text';
const layout = require('tutorRN/src/Layout')
import Assets from 'tutorRN/src/view/ui/Assets';


interface AvatarProps {
  onPress?: any;
  size?: number; // 80 | 56 | 36 | 30 | 65,
  url: string | ImageURISource;
  badge?: string; // programme | AD company | KOL | artist 
  sex?: string;
  data?: any;
  style?: object;
  badgeStyle?: object;
  avaterStyle?: object;
  showEShop?: boolean;
}

//export default class AvaterComponent extends React.Component<AvaterProps, AvaterState> {
  //constructor(props: AvaterProps) {
class Avatar extends Component <AvaterProps>{

  constructor (props: AvaterProps){
    super(props);
    //this.onPress = this.onPress.bind(this)
    this.state = {
      imageSource: '',
    };
  }
  componentWillMount(){
    this.init()
  } 

  init ()
  {
    let { imageSource } = this.state;
    const { type } = this.props; 

    if( type === 'edit')
    {
      imageSource = Assets.actions.edit
    }
    else if ( type === 'Premium')
    {

    }

    this.setState({
      imageSource,
    });
  }

  typeBackground()
  {
    const {type, size} = this.props
    var typeIconBgSize = size * 0.3
    //var bgColor = 'clear'
    var bgColor = 'rgba(233,233,233,0.0)'
    if ( type )
    {
      bgColor = layout.touchHighlightColor
    }
    

    return{
      height: typeIconBgSize,
      width: typeIconBgSize,
      borderRadius : typeIconBgSize/2,
      //backgroundColor: layout.touchHighlightColor,
      backgroundColor: bgColor,
      alignItems:'center',
      justifyContent: 'center',
      position: 'absolute',
      top: size * 2/3,
      left: size * 2/3
      
    }
  }

  typeStyle()
  {
    const {size} = this.props
    var typeIconSize = size * 0.2

    return {
      height: typeIconSize,
      width: typeIconSize ,
    }
  }

  avatarImageStyle()
  {
    const {size, round} = this.props

    return{
      height: size, 
      width: size , 
      borderRadius: round ? size/2 : 0, 
      flex:1,
      backgroundColor: 'gray'
      //borderColor: 'red',
      //borderWidth: 2,
    }
  }

  onPress()
  {
    console.log('Avatar onPress ')
    //onPress()
    if ( this.props.onPress){
      this.props.onPress()
    }
    
  }

  
  
  

  render (){

    const {  badge, url, size, style, badgeStyle, avatarStyle } = this.props;
    const { imageSource } = this.state


    //console.log('default_avatar_man = ' + Assets.profile.default_avatar_man)
    console.log(typeof Assets.profile.default_avatar_man);
    return(

      <TouchableOpacity
        //onPress={() => onPress ? this.onPress() : null}
        onPress={ ()=>this.onPress() ? this.onPress() : null}
        //underlayColor = {layout.touchHighlightColor}
      >
        <View
          style = {{ alignItems:'center', height: size, width: size}}
        >
          <View
            style = {styles.backgroundContainer}
          >    
            <Image
              style = {avatarStyle ? avatarStyle : this.avatarImageStyle() }
              //style = {{height:(layout.deviceWidth- 20)/2, width:(layout.deviceWidth- 20)/2, borderRadius: (layout.deviceWidth- 20)/4 }}
              //source={{ uri: url }}
              //source = {{uri: 'https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-1/p80x80/13614994_10154250137598745_5801203470222158522_n.jpg?_nc_cat=0&oh=831d0ee264e5772b4b15faa60c7d16c4&oe=5BD89683'}}
              
              source = { url.node ?  { uri: url.node.image.uri } : (typeof url) == 'string' ?  {uri:url} : url  }
              defaultSource = {require('tutorRN/image/icons8-customer-filled-100.png') }
            />  
          </View>
          <View style = {this.typeBackground()} >
            {imageSource != '' &&  <Image style = {this.typeStyle()} source = {imageSource} /> }
          </View>
          

        </View> 
      </TouchableOpacity>

    )
  }
}

export default Avatar;

const styles = StyleSheet.create ({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  backgroundContainer:{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
})


