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

import PhotoSlideView from '/view/ui/PhotoSlideView'

const layout = require('tutorRN/src/Layout')


const TouchableIcon = ({ index, children }) => {
  return (
    <TouchableHighlight onPress={ this.favouriteOnClick}>
    
      <Image  style = {{position: 'absolute', top: layout.deviceHeight/2 + (index * 50), left : layout.deviceWidth - 50, height: 40,width: 40,}} source={require('../../image/heart.png')} />
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
    this.videoOnClick = this.videoOnClick.bind(this)
  }
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
          <Image  style = {{position: 'absolute', top: layout.deviceHeight/2 - 50 , left : layout.deviceWidth - 50, height: 40,width: 40,}} source={require('tutorRN/src/image/sound.png')} />
        </TouchableHighlight>
       

        <TouchableHighlight onPress={ this.favouriteOnClick}>
          <Image  style = {{position: 'absolute', top: layout.deviceHeight/2, left : layout.deviceWidth - 50, height: 40,width: 40,}} source={require('tutorRN/src/image/heart.png')} />
        </TouchableHighlight>

            <Image  style = {{ top: layout.deviceHeight/2 + 50, left : layout.deviceWidth - 50, height: 40,width: 40}} source={require('tutorRN/src/image/chat.png')} />

            <View style = {{position: 'absolute', top : layout.deviceHeight * 0.05, left:45, height: 30, width: 100, justifyContent:'center', alignItems:'center'}}>
              <Text style = {{ color:'white', fontWeight:'bold',  }} >Elvira Tang</Text>
            </View>
            
            <Image style = {{height: 30, width: 30, borderRadius:15, borderColor:'white'  , borderWidth:2,  position: 'absolute', top : layout.deviceHeight * 0.05, left:10}} source = {{uri: this.props.item.profilePic}}/>

            <View style = {{position: 'absolute', top : layout.deviceHeight * 0.8 - 30  , height: 30, width: layout.deviceWidth, paddingLeft:layout.deviceWidth*0.1, paddingRight:layout.deviceWidth*0.1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
              <Text style = {{ color:'white', fontWeight:'bold',  }} >{this.props.item.news_title}</Text>
            </View>

            <View style = {{position: 'absolute', top : layout.deviceHeight * 0.8  ,  width: layout.deviceWidth, paddingLeft:layout.deviceWidth*0.1, paddingRight:layout.deviceWidth*0.1, paddingTop:10, paddingBottom: 10,  justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
              <Text style = {{ color:'white',lineHeight: 20 }}  numberOfLines= {3} >{this.props.item.news_content}</Text>
            </View>

        </View>
    )
  }

  showCoverView()
  {
    return (
     
      <Image source={{uri: this.props.item.news_thumb }} style={styles.fullViewStyle} /> 
      //<Image source={{uri: this.props.item.cover }} style={styles.fullViewStyle} /> 
      //<Image source={{uri:'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/5895592a166f19435e4e127ae1b1f336.jpg'}} style={styles.fullViewStyle} /> 
    )
  }

  showPhotoVideo()
  {
    return (
      //<Image source={{uri: 'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/3a7803bf022db91704584b7297b38bc6.jpg' }} style={styles.fullViewStyle} /> 
      <PhotoSlideView
        onReady = { this.onLoad }
        onPress = { this.videoOnClick }
      />
    )
  }

  showVideoView()
  {
    return (
      <Video
            ref={(ref) => this.videoPlayer = ref}
            //poster = 'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/5895592a166f19435e4e127ae1b1f336.jpg'
            //source={{uri: 'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/c2828d98dc07f8caffa0a6db1642fc24.mp4'}}

            //source={{uri: this.props.item.video }}
            source = {{uri: 'https://d33os2r86a346n.cloudfront.net/vodfile/_definst_/smil:amazons3/sportxmbr/2018/8/20/20180820_upower_alexfong.smil/playlist.m3u8' }}
            //source={require('/image/video_demo.mp4')}
            //rate={1.0}
            repeat = {true}
            volume={1.0}
            muted={true}
            resizeMode={'cover'}
            //playWhenInactive={true}
            //playInBackground={false}
            ignoreSilentSwitch={'ignore'}
            progressUpdateInterval={250.0}
            style = {{width: layout.deviceWidth, height: layout.deviceHeight}}
            //onLoad = {()=>this.setState({hiddenCover:true})}
            onLoad={this.onLoad}       
            //style={{width: this.state.videoWidth, height: this.state.videoHeight}}
            //<View style = {{ position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.5)', top : 0, height: (layout.deviceHeight * 0.05), width: 100 }} />
          />
    )
  }

  showVideoByYoutube()
  {

    //624073744/videos?type=uploaded
    return (
      <YouTube
       
              //ref={(component) => { this._youTubePlayer = component }}
              videoId="vzPmI0GCDPM"           // The YouTube video ID
              //playlist="PLF797E961509B4EB5"   // A playlist's ID, overridden by `videoId`
              play={true}                     // control playback of video with true/false
              playsInline={true}              // control whether the video should play full-screen or inline
              loop={true}   
              showinfo = {false}                 // control whether the video should loop when ended
              //control = {2}
              showFullscreenButton = {true}
              //modestbranding = {true}
            
              //onReady={e => this.setState({hiddenCover:true})}
              onReady = {this.onLoad}
              //onReady={e => this.setState({ isReady: true })}
              //onChangeState={e => this.setState({ status: e.state })}
              onChangeState={e => console.log('onChange State = ' + e.state)}
              //onChangeQuality={e => this.setState({ quality: e.quality })}
              onError={e => console.log('onError ' + e.error )}
              //onError={e => this.setState({ error: e.error })}
              //onProgress={e => this.setState({ currentTime: e.currentTime, duration: e.duration })}
            
              //style={{ alignSelf: 'stretch', height: 300, width: 300, backgroundColor: 'black', marginVertical: 10 }}
              style = {{height: layout.deviceHeight, width: layout.deviceWidth}}
      />
    )
    
  }
  
  onLoad()
  {
    //return
    this.setState({
      hiddenCover: true
    })
  }

  videoOnClick()
  {
    console.log('videoOnClick')

    this.props.onClicked( this.props.index )

    var getUIState = this.state.hiddenUI
    this.setState({
      hiddenUI:!getUIState
    })
  }

  favouriteOnClick()
  {
    console.log('favouriteOnClick')
  }

  displayViewLogic(index)
  {
  

    if ( index == this.props.showingIndex )
    {
      // viewable view -> show video
      /*
      return (
        this.showPhotoVideo()
      )
      */

      return (
        <View>  
        {
          !this.state.hiddenCover && // for video 
          //this.state.hiddenCover &&
          <Image 
            //ref={(ref) => this.coverView = ref}
            source={{uri: this.props.item.cover }} 
            style={styles.fullViewStyle} 
          />
        }
          <TouchableHighlight 
            onPress={ this.videoOnClick}
            //onPress={params.increaseCount}
            underlayColor = {layout.touchHighlightColor}
          >
          {
            1 ? (
              
              this.showPhotoVideo()
              //this.showVideoView()
            ) : (
              this.showVideoByYoutube()
            )
          } 
          </TouchableHighlight>
          
        {
          !this.state.hiddenUI && this.showUI()
        }
        </View>  
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


