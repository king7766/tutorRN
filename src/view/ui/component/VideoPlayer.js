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

import Video from 'react-native-video';
import Dimensions from 'Dimensions';

const layout = require('tutorRN/src/Layout')

class VideoPlayer extends Component <Props>{

  constructor (props){
    super(props);
  
    this.state = {
      landscape : false,
    }
    this.playerOnCLicked = this.playerOnCLicked.bind(this)
  }

  componentWillMount(){
    
  } 

  onReady(info)
  {
    console.log('VideoPlayer onReady : ' + info.naturalSize )
   
    var newArr = Object.keys(info.naturalSize);
    var mappedArr = newArr.map(function(i) {
      return [i, info.naturalSize[i]];
    });
    console.log(mappedArr);
    this.setState({
      landscape: (info.naturalSize.width > info.naturalSize.height),
    })
    
    this.props.onReady()
  }

  onEnd()
  {
    this.props.onEnd()
  }

  playerOnCLicked()
  {
    console.log('playerOnCLicked')
    this.props.onPress()
  }

  videoStyle ()
  {
    if ( this.state.landscape )
    {
      return {
        height: layout.deviceWidth /1.78,
        width: layout.deviceWidth,
        //height: layout.deviceHeight * 1/3,
        //width: (layout.deviceHeight * 1/3 )* 1.78 ,
        //position:'absolute',
        top: layout.deviceWidth /1.78 + 50 , 
      }
    }
    else
    {
      return {
        height: layout.deviceHeight,
        width: layout.deviceWidth,
      }
    }
  }

  showVideo()
  {

    //624073744/videos?type=uploaded
    return (
      <Video
            ref={(ref) => this.videoPlayer = ref}
            //poster = 'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/5895592a166f19435e4e127ae1b1f336.jpg'
            //source={{uri: 'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/c2828d98dc07f8caffa0a6db1642fc24.mp4'}}

            //source={{uri: this.props.item.video }}
            //source = {{uri: this.props.source.uri }}
            //source={require('tutorRN/src/image/video_demo.mp4')}
            ////source={require('tutorRN/src/image/20181225145658.mp4')}
            source = {{uri : this.props.source.uri}}
            //rate={1.0}
            repeat = {true}
            volume={1.0}
            muted={true}
            resizeMode={'cover'}
            //playWhenInactive={true}
            //playInBackground={false}
            ignoreSilentSwitch={'ignore'}
            progressUpdateInterval={250.0}
            //style = {{width: layout.deviceWidth, height: layout.deviceHeight}}
            style = {this.videoStyle()}
            //style = {this.videoStyle()}
            //onLoad = {()=>this.setState({hiddenCover:true})}
            onLoad={ (info) => this.onReady(info) }     
            onEnd= { ()=>this.onEnd()}  
            //style={{width: this.state.videoWidth, height: this.state.videoHeight}}
            //<View style = {{ position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.5)', top : 0, height: (layout.deviceHeight * 0.05), width: 100 }} />
          />
      
    )
    
  }
  

  render (){

    return(
      <TouchableHighlight
        onPress={ this.playerOnCLicked}
      >
      <View
        style = {styles.fullViewStyle}
        backgroundColor = 'black'
      >
        {
          this.showVideo()
        }
      </View>
      </TouchableHighlight>
    )
  }
}

export default VideoPlayer;

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


