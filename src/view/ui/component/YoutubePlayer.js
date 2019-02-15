import React, { Component } from 'react';
import { 
   Text, 
   Image, 
   View, 
   StyleSheet, 
   ScrollView ,
   TouchableHighlight,
   Animated,
   WebView
} from 'react-native';

import YouTube from 'react-native-youtube'
import Dimensions from 'Dimensions';

const layout = require('tutorRN/src/Layout')

class YoutubePlayer extends Component <Props>{

  constructor (props){
    super(props);
  

    this.state = {
      //play:true,
      play: false,
    }
    this.playerOnCLicked = this.playerOnCLicked.bind(this)

  }

  componentWillMount(){
    console.log('youtubePlayer mount')
    //this.mounted = true
  } 

  onReady()
  {
    console.log('youtube onReady' )
    this.props.onReady()
  }

  onEnd()
  {
    console.log('youtube onEnd')
    this.props.onEnd()
  }

  playerOnCLicked()
  {
    //console.log('playerOnCLicked')
    
    this.props.onPress()
    this.setState({ play: !this.state.play })

    //this._youTubePlayer.stopVideo()
    //this._youTubePlayer.seekTo(200)
    //let yourAlert = 'alert("hello")'
    //this.myWebView.props.injectedJavaScript(yourAlert)
  }

  

  onChangeState(e)
  {
    console.log('onChangeState = ' + e.state)
    if ( e.state == 'ended' )
    {
      this.props.onEnd()
    }
    else if ( e.state == 'buffering')
    {

    }else if ( e.state == 'playing')
    {

    }

  }

  showVideoByYoutube()
  {

    //624073744/videos?type=uploaded

    let yourAlert = 'alert("hello")'
    let html = '<div id="myContent">This is my name</div>'
    let jsCode = "document.querySelector('#myContent').style.backgroundColor = 'red'"

    return (
      /*
      <WebView
        //ref="myWebView"
        ref={(component) => { this.myWebView = component }}
        style = {{height: layout.deviceWidth /1.78, width: layout.deviceWidth, top: 200}}
        javaScriptEnabled={true}
        //injectedJavaScript={yourAlert}
        source={{uri: 'https://www.youtube.com/embed/' + this.props.videoId + '?rel=0&autoplay=0&showinfo=0&controls=0'}}
        //source = {{uri:'https://www.google.com'}}
      />
      */
      
      <YouTube
        play={this.state.play}
        ref={(component) => { this._youTubePlayer = component }}
        //videoId="vzPmI0GCDPM"           // The YouTube video ID
        videoId = {this.props.videoId}
        //playlist="PLF797E961509B4EB5"   // A playlist's ID, overridden by `videoId`
        //      play={true}                     // control playback of video with true/false
        //playsInline={true}              // control whether the video should play full-screen or inline
        loop={false}   
        showinfo = {false}                 // control whether the video should loop when ended
        //control = {2}
        showFullscreenButton = {false}
        //modestbranding = {true}
        controls ={0}
        mute = {true}   
        //onReady={e => this.setState({hiddenCover:true})}
        //onReady = {this.onLoad}
        onReady = { ()=>this.onReady() }
        //onEnd = { this.onEnd}
        //onReady={e => this.setState({ isReady: true })}
        //onChangeState={e => this.setState({ status: e.state })}
        //onChangeState={e => console.log('onChange State = ' + e.state)}
        onChangeState = {(e) =>this.onChangeState(e)}
        //onChangeQuality={e => this.setState({ quality: e.quality })}
        onError={e => console.log('youtubePlayer onError ' + e.error )}
        //onError={e => this.setState({ error: e.error })}
        //onProgress={e => this.setState({ currentTime: e.currentTime, duration: e.duration })}
            
        //style={{ alignSelf: 'stretch', height: 300, width: 300, backgroundColor: 'black', marginVertical: 10 }}
        //style = {{height: layout.deviceHeight, width: layout.deviceWidth}}
        //height: layout.deviceWidth /1.78,
        //width: layout.deviceWidth,
        style = {{height: layout.deviceWidth /1.78, width: layout.deviceWidth, top: 200}}
      />
      
    )
    
  }
  

  render (){

    return(
      <TouchableHighlight
        onPress={ this.playerOnCLicked}
      >
      <View 
        style = {{height: layout.deviceHeight, width: layout.deviceWidth}}
        pointerEvents="none"
      >
        {
          this.showVideoByYoutube()
        }
      </View>
      </TouchableHighlight>
    )
  }
}

export default YoutubePlayer;

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


