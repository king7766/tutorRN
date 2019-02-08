import React, { Component } from 'react';
import { 
   Text, 
   Image, 
   View, 
   StyleSheet, 
   ScrollView ,
   TouchableHighlight,
   Animated
} from 'react-native';

import YouTube from 'react-native-youtube'

import Dimensions from 'Dimensions';
//import Hyperlink from 'react-native-hyperlink'
import ParsedText from 'react-native-parsed-text';

import Video from 'react-native-video';

import PhotoSlideView from 'tutorRN/src/view/ui/PhotoSlideView'
//import navigation from 'tutorRN/src/service/navigation'

//const navigation = require ('tutorRN/src/service/navigation')
//import * as N from 'tutorRN/src/service/navigation'
import * as M from 'tutorRN/src/service/membership'

import YoutubePlayer from 'tutorRN/src/view/ui/component/YoutubePlayer'
import VideoPlayer from 'tutorRN/src/view/ui/component/VideoPlayer'

const layout = require('tutorRN/src/Layout')


// https://developers.facebook.com/tools/explorer/?method=GET&path=me%2Fvideos%3Ftype%3Duploaded%26fields%3Dtitle%2Cdescription%2Cthumbnails&version=v3.1
// https://developers.facebook.com/tools/explorer/?method=GET&path=me%3Flocale%3Den_US%26fields%3Dname%2Cemail%2Cfriends%2Cage&version=v3.1

const TouchableIcon = ({ index, children }) => {
  return (
    <TouchableHighlight onPress={ this.favouriteOnClick}>
    
      <Image  style = {{position: 'absolute', top: layout.deviceHeight/2 + (index * 50), left : layout.deviceWidth - 50, height: 40,width: 40,}} source={require('tutorRN/src/image/heart.png')} />
      <Text> {children}</Text>
    </TouchableHighlight>
  
  )
};

class NewsVideoCell extends Component{

  constructor (props){
    super(props);
  
    this.state = {
      hiddenCover: false,
      hiddenUI: false,
 

    }


    //this.displayViewLogic = this.displayViewLogic.bind(this)
    //this.showVideoView = this.showVideoView.bind(this)
    //this.showCoverView = this.showCoverView.bind(this)
    this.onLoad = this.onLoad.bind(this)
    this.displayViewOnClick = this.displayViewOnClick.bind(this)
  }

  /*
  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }
  */

  componentWillMount(){
    //this.mounted = true
  } 

  showUI()
  {
    return (
      <View style = {{position: 'absolute'}}>
      {
        
        //<TouchableIcon index={index} >children HERE </TouchableIcon>
        
      }
        <TouchableHighlight onPress={ this.favouriteOnClick}>
          <Image  style = {{position: 'absolute', top: layout.deviceHeight * 0.8 - 180 , left : layout.deviceWidth - 50, height: 40,width: 40,}} source={require('tutorRN/src/image/sound.png')} />
        </TouchableHighlight>
       

        <TouchableHighlight onPress={ this.favouriteOnClick}>
          <Image  style = {{position: 'absolute', top: layout.deviceHeight * 0.8 - 130, left : layout.deviceWidth - 50, height: 40,width: 40,}} source={require('tutorRN/src/image/heart.png')} />
        </TouchableHighlight>

        <TouchableHighlight onPress={ this.favouriteOnClick}>
          <Image  style = {{ top: layout.deviceHeight * 0.8 - 80, left : layout.deviceWidth - 50, height: 40,width: 40}} source={require('tutorRN/src/image/chat.png')} />
        </TouchableHighlight>

            <View style = {{position: 'absolute', top : layout.deviceHeight * 0.05, left:45, height: 30, width: 100, justifyContent:'center', alignItems:'center'}}>
              <Text style = {{ color:'white', fontWeight:'bold',  }} >{this.props.item.creator}</Text>
            </View>
            
            <Image style = {{height: 30, width: 30, borderRadius:15, borderColor:'white'  , borderWidth:2,  position: 'absolute', top : layout.deviceHeight * 0.05, left:10}} source = {{uri: this.props.item.profilePic}}/>

            
            <View style = {{position: 'absolute', top : layout.deviceHeight * 0.8 - 30  , height: 30, width: layout.deviceWidth, paddingLeft:10, paddingRight:layout.deviceWidth*0.1, justifyContent:'flex-start',  backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
              <Text style = {{ color:'white', fontWeight:'bold', fontSize:16,  top:10 }} >{this.props.item.news_title}</Text>
            </View>

            <View style = {{position: 'absolute', top : layout.deviceHeight * 0.8  ,  width: layout.deviceWidth, paddingLeft:10, paddingRight:layout.deviceWidth*0.1, paddingTop:10, paddingBottom: 10,  justifyContent:'flex-start',  backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
              <Text style = {{ color:'white',lineHeight: 20, fontSize:14 }}  numberOfLines= {3} >{this.props.item.news_content}</Text>
            </View>

        </View>
    )
  }

  showCoverView()
  {
    return (
      //layout.deviceWidth*0.1
      //<Image source={{uri: this.props.item.news_thumb }} style={styles.fullViewStyle} /> 
      <Image source={{uri: this.props.item.cover }} style={styles.fullViewStyle} /> 
      //<Image source={{uri:'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/5895592a166f19435e4e127ae1b1f336.jpg'}} style={styles.fullViewStyle} /> 

    )
  }

  showPhotoVideo()
  {
    return (
      //<View/>
      //<Image source={{uri: 'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/3a7803bf022db91704584b7297b38bc6.jpg' }} style={styles.fullViewStyle} /> 
      
      <PhotoSlideView
        onReady = { this.onLoad }
        onPress = { this.displayViewOnClick }
      />
      
    )
  }

  showVideoView()
  {
    return (
      <VideoPlayer
      
        //source = {{uri: 'https://d33os2r86a346n.cloudfront.net/vodfile/_definst_/smil:amazons3/sportxmbr/2018/8/20/20180820_upower_alexfong.smil/playlist.m3u8' }}
        //source = {{uri : 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'}}
        //source = {{uri :'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'}}
        //source = {{uri : 'http://yt-dash-mse-test.commondatastorage.googleapis.com/media/car-20120827-86.mp4'}}
        //source = {{ uri : 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4'}}
        //source = {{uri : 'https://www.steppublishers.com/sites/default/files/step.mov'}}
        
        
        //source = {{ uri: 'https://cinelerra-cv.org/footage/prpol-rerender2.mov'}}
        source = {{ uri: this.props.item.video }}
        onReady = {this.onLoad}
        onEnd = {this.onEnd}
        onPress = { this.displayViewOnClick }
      />
    )
  }

  showVideoByYoutube()
  {

    //624073744/videos?type=uploaded
    return (
      
      
        <YoutubePlayer

          onPress = { this.displayViewOnClick }
          //videoId = '6HQvwHpEzao'
          videoId = {this.props.item.youtubeId}
          onReady = {this.onLoad}
          onEnd = {this.onEnd}
        />
      
      
      
    )
    
  }
  
  onLoad()
  {
    console.log('NewsVideoCell onLoad');
    this.setState({
      hiddenCover: true
    })
  }

  onEnd()
  {
    console.log('NewsVideoCell onEnd')
  }

  displayViewOnClick()
  {
    console.log('displayViewOnClick')

    this.props.onClicked( this.props.index )

    var getUIState = this.state.hiddenUI
    this.setState({
      hiddenUI:!getUIState
    })
  }

  favouriteOnClick()
  {
    console.log('favouriteOnClick, going to logout ')
    M.logoutAction();
  }

  
  displayViewLogic(index)
  {
  
    //if (0)
    if ( index == this.props.showingIndex )
    {
      // viewable view -> show video
      /*
      return (
        this.showPhotoVideo()
      )
      */

      return (
        <TouchableHighlight 
            onPress={ this.displayViewOnClick}
            //onPress={params.increaseCount}
            underlayColor = {layout.touchHighlightColor}
        >
        <View style = {{backgroundColor:'black'}}>  
        {
          !this.state.hiddenCover && // for video 
          //this.state.hiddenCover &&
          <Image 
            //ref={(ref) => this.coverView = ref}
            source={{uri: this.props.item.cover }} 
            style={styles.fullViewStyle} 
          />
        }
          
          
          {
            this.props.item.type == 0 ? this.showPhotoVideo() : 
            this.props.item.type == 1 ? this.showVideoView() : this.showVideoByYoutube()

            /*
            1 ? (
              
              this.showPhotoVideo()
              //this.showVideoView()
            ) : (
              this.showVideoByYoutube()
            )
            */
          } 
          
          
        {
          !this.state.hiddenUI && this.showUI()
        }
        </View>  

        </TouchableHighlight>
      )
      
      
      
    }
    else
    {
      // other case show IMAGE only

      return (
        <View>
        {
          this.showCoverView()
        }
        {
          this.showUI()
        }
        </View>
        
      )
    }
  }

  render (){

    //const { key } = params;
    //console.log('this.props.key = ' + this.props.index)
    //console.log('title = ' + this.props.item.news_title)
    //console.log('title = ' + this.props.index)
    return(

      this.displayViewLogic(this.props.index)

    )
  }
}

export default NewsVideoCell;

const styles = StyleSheet.create ({

  background:{
    //flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    width: layout.deviceWidth,
    height: 150 + 20 + 50 + 20 + 20 + 25, // last is padding
    padding: 5
  },

  fullViewStyle :{
    width: layout.deviceWidth,
    height: layout.deviceHeight
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


