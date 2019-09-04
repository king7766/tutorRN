import React, { Component, PureC} from 'react';
import { 
   Text, 
   Image, 
   View, 
   StyleSheet, 
   ScrollView ,
   TouchableHighlight,
   Animated,
   DeviceEventEmitter,
   Easing,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
mixins: [TimerMixin];

import YouTube from 'react-native-youtube'

import Dimensions from 'Dimensions';
import ParsedText from 'react-native-parsed-text';

import Video from 'react-native-video';

import PhotoSlideView from 'tutorRN/src/view/ui/PhotoSlideView'
import * as M from 'tutorRN/src/service/membership'

import YoutubePlayer from 'tutorRN/src/view/ui/component/YoutubePlayer'
import VideoPlayer from 'tutorRN/src/view/ui/component/VideoPlayer'
import Assets from './Assets';

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
      showingIndex : 0 ,
      hiddenCover: false,
      hiddenUI: false,

      sound : false,
      like : false,
      comment : false,

    }


    this.soundBtnOnClick = this.soundBtnOnClick.bind(this)
    this.likeBtnOnClick = this.likeBtnOnClick.bind(this)
    this.commentBtnOnClick = this.commentBtnOnClick.bind(this)

    this.onLoad = this.onLoad.bind(this)
    this.displayViewOnClick = this.displayViewOnClick.bind(this)
  }

  /*
  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }
  */

  componentWillMount(){
    console.log('NewsVideoCell componentWillMount')
    
  } 

  

  /*
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate : ' + nextProps.showingIndex)
    this.setState({
      showingIndex : nextProps.showingIndex
    })
    return true
  }
  
  
  componentWillReceiveProps(nextProps, nextState) {
    console.log('componentWillReceiveProps : ' + nextProps.showingIndex)

    
    //console.log(nextProps.showingIndex)
  }
  */

  showUI()
  {
    return (
      <View style = {{position: 'absolute'}}>
      {
        
        //<TouchableIcon index={index} >children HERE </TouchableIcon>
        
      }
        <TouchableHighlight onPress={ this.soundBtnOnClick}>
          <Image  style = {{position: 'absolute', top: layout.deviceHeight * 0.8 - 180 , left : layout.deviceWidth - 50, height: 40,width: 40,}} source={require('tutorRN/src/image/sound.png')} />
        </TouchableHighlight>
       
        <TouchableHighlight onPress={ this.likeBtnOnClick}>
          <Image  style = {{position: 'absolute', top: layout.deviceHeight * 0.8 - 130, left : layout.deviceWidth - 50, height: 40,width: 40,}} source={this.state.like ? Assets.actions.like : Assets.actions.unlike} />
        </TouchableHighlight>

        <TouchableHighlight onPress={ this.commentBtnOnClick}>
          <Image  style = {{ top: layout.deviceHeight * 0.8 - 80, left : layout.deviceWidth - 50, height: 40,width: 40}} source={this.state.comment ? Assets.actions.comment : Assets.actions.comment} />
        </TouchableHighlight>

        <View style = {styles.tutorNameStyle}>
          <Text style = {{ color:'white', fontWeight:'bold', backgroundColor: 'rgba(0,0,0,0)' }} >{this.props.item.tutor_name}</Text>
        </View>
            
        <Image style = {{height: 30, width: 30, borderRadius:15, borderColor:'white'  , borderWidth:2,  position: 'absolute', top : layout.deviceHeight * 0.05, left:10}} source = {{uri: this.props.item.tutor_thumb}}/>

            
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
      //<Image source={{uri: this.props.item.cover }} style={styles.fullViewStyle} /> 
      <Image source={{uri:'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/5895592a166f19435e4e127ae1b1f336.jpg'}} style={styles.fullViewStyle} /> 

    )
  }

  showPhotoVideo()
  {
    /*
    const photos = [
      'https://images.unsplash.com/photo-1485832329521-e944d75fa65e?auto=format&fit=crop&w=1000&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
      'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/3a7803bf022db91704584b7297b38bc6.jpg',
      'https://images.unsplash.com/photo-1485832329521-e944d75fa65e?auto=format&fit=crop&w=1000&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
      'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/3a7803bf022db91704584b7297b38bc6.jpg', 
      'https://images.unsplash.com/photo-1485832329521-e944d75fa65e?auto=format&fit=crop&w=1000&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
      'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/3a7803bf022db91704584b7297b38bc6.jpg',
      ]
    */
    var photos = [this.props.item.news_thumb]
    return (
      <ImageLoader
        showingIndex = {this.props.showingIndex}
        photos = {photos}
      />
      //<View/>
      //<Image source={{uri: 'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/3a7803bf022db91704584b7297b38bc6.jpg' }} style={styles.fullViewStyle} /> 
      
      


      //<PhotoSlideView
      //  photos  = {photos}
      //  onReady = { this.onLoad }
      //  onPress = { this.displayViewOnClick }
      ///>
      
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
    DeviceEventEmitter.emit('stopAnimate', {});

    this.props.onClicked( this.props.index )

    /*
    var getUIState = this.state.hiddenUI
    this.setState({
      hiddenUI:!getUIState
    })
    */
  }

  soundBtnOnClick()
  {
    this.props.soundBtnOnClicked()
  }

  likeBtnOnClick()
  {
    console.log('likeBtnOnClick, going to logout ')
    this.setState({      
      like: !this.state.like
    })
    this.props.likeBtnOnClicked()
    //M.logoutAction();
  }

  commentBtnOnClick()
  {
    this.props.commentBtnOnClicked()
  }


  displayViewLogic(index)
  {
    
    return (
      <TouchableHighlight 
        onPress={ this.displayViewOnClick}
        underlayColor = {layout.touchHighlightColor}
      >
        <View style = {{backgroundColor:'black'}}>  
        {
          this.showPhotoVideo()
        }
        {
          this.showUI()
        }
        </View>
      </TouchableHighlight>
    )
    
  

    //if (0)
    if ( index == this.state.showingIndex )
    {
      // viewable view -> show video
  
      return (
        <TouchableHighlight 
            onPress={ this.displayViewOnClick}
            //onPress={params.increaseCount}
            underlayColor = {layout.touchHighlightColor}
        >
          <View style = {{backgroundColor:'black'}}>  
          {
            !this.state.hiddenCover && this.showCoverView()
            /*
            !this.state.hiddenCover && // for video 
            //this.state.hiddenCover &&
            <Image 
              //ref={(ref) => this.coverView = ref}
              source={{uri: this.props.item.cover }} 
              style={styles.fullViewStyle} 
            />
            */
          }    
          {     
            this.props.type == 0 ? this.showPhotoVideo() : this.showPhotoVideo()
            /*     
            this.props.item.type == 0 ? this.showPhotoVideo() : 
            this.props.item.type == 1 ? this.showVideoView() : 
            this.showVideoByYoutube()
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
  backgroundStyle :{
    flex:1,
  },

  tutorNameStyle:{
    position: 'absolute', 
    top : layout.deviceHeight * 0.05, 
    left:45, height: 30, width: 100, 
    justifyContent:'center', 
    //alignItems:'center'
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






class ImageLoader extends Component {

  constructor (props){
    super(props);
    this.animatedValue = new Animated.Value(0),
    this.opacity = new Animated.Value(0),
    this.state = {
      //fadeAnim: new Animated.Value(0),
      
      //opacity: new Animated.Value(0),
      move : new Animated.Value(0),
      data: this.props.photos,
      displayingIndex : 0,
      landscape : false,
      imageHeight: 0,
      imageWidth: 0,
      //loading : true,
      //displayContent : this.displayContent.bind(this)
    }
    //this.displayContent = this.displayContent.bind(this)
  }
   componentDidMount() {
    
    this.preloadImageSize()

    this.deEmitter = DeviceEventEmitter.addListener('stopAnimate', (a) => {
      //this.animatedValue.stopAnimation(({value}) => console.log("Final Value: " + value))
      //clearInterval(this.interval);
    });

    this.interval = setInterval(() => {
      console.log('going to next image by interval')

      index = this.state.displayingIndex + 1
      if ( index == this.state.data.length )
      {
        index = 0 
      }
      Image.getSize(this.state.data[index], (width, height) =>{
        var landscape = false
        if ( height < width)
        {
          landscape = true
          
        }
        this.setState({
          displayingIndex : index,
          landscape: landscape,
        })
        
        //this.animate()
  
      }, (error) =>{
        console.log(error)
      })

    }, 5000); //6 seconds

    
    //this.props.onReady()
   
  }

  componentWillUnmount(){
    console.log('ImageLoader componentWillUnmount :')
    
    clearInterval(this.interval);
  }

  preloadImageSize ()
  {
    Image.getSize(this.state.data[this.state.displayingIndex], (width, height) =>{
      var landscape = false
      if ( height < width)
      {
        landscape = true
        
      }
      this.setState({
        landscape: landscape,
      })
      
      this.animate()

    }, (error) =>{
      console.log(error)
    })
  }

  animationFinishWithIndex(index)
  {
    index = index + 1
    if ( index == this.state.data.length )
    {
      index = 0 
    }
    
    console.log('coming display = ' + index)

    this.setState({
      displayingIndex: index,
      //loading: true,
    })
    // load next image 
    this.preloadImageSize()

  }

  animate() {

    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear
      }
    ).start(() => this.animate())

    return

    if ( this.state.landscape ){
      this.animatedValue.setValue(0)
      Animated.timing(
        this.animatedValue,
        {
          toValue: 1,
          duration: 6000,
          easing: Easing.linear
        }
      ).start(() => this.animate())
    }
    else{
      this.opacity.setValue(0)
      Animated.timing(
        this.state.opacity,
        {
          toValue:1,
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.linear
        }
      ).start(()=>this.animate())
    }
    
    //this.animationFinishWithIndex( this.state.displayingIndex)
    //).start(() => this.animationFinishWithIndex( this.state.displayingIndex) )

    //return ;
  }

  animateImageStyle ()
  {
    if ( this.state.landscape )
    {
      return {
        height: layout.deviceHeight * 1/3,
        width: (layout.deviceHeight * 1/3 )* 1.78 ,
        position:'absolute',
        //top: layout.deviceHeight * 1/3 - 50, 
        top: 150, 
        
      }
    }
    else
    {
      return {
        height: layout.deviceHeight,
        width: layout.deviceWidth,
        position:'absolute',
        //top: layout.deviceHeight * 1/3, 
  
      }
    } 
  }

  portraintContent(){
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0]
    })

    return (
      <View
        style = {styles.fullViewStyle}
        //style = {{backgroundColor: 'transparent'}}
      >
        <Animated.Image
          resizeMode = 'stretch'
          //resizeMode='contain'
          source = {{uri : this.state.data[this.state.displayingIndex]}}
          //source = {{uri : this.state.data[0]}}
          style={{
            opacity: opacity ,      
            height: layout.deviceHeight,
            width: layout.deviceWidth,
            position:'absolute',
          }}
        />
        
      </View>
    )
   
  }

  landscapeContent(){
    const movingMargin = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [-50, 50, 0]
    })

    return (
      <View
        style = {styles.fullViewStyle}
        //style = {{backgroundColor: 'transparent'}}
      >
        <Image 
          style = {styles.backgroundStyle}
          resizeMode='cover'
          source= {{uri : this.state.data[this.state.displayingIndex]}}
          blurRadius={10}
        />
        <Animated.Image
          resizeMode = 'stretch'
          source = {{uri : this.state.data[this.state.displayingIndex]}}
          //source = {{uri : this.state.data[0]}}
          style={{
            opacity:1,
            marginLeft: movingMargin,
            height: layout.deviceHeight * 1/3,
            width: (layout.deviceHeight * 1/3 )* 1.78 ,
            marginTop:150,
            position:'absolute',
          }}
        />
      </View>
    )
  }

  render() {
    
    return (
      this.state.landscape ? this.landscapeContent() : this.portraintContent()
      //1 ? this.landscapeContent() : this.portraintContent()
    )
  }
}