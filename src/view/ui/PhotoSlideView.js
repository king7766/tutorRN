import React, { Component, PureComponent} from 'react';
import { 
   Text, 
   Image, 
   View, 
   StyleSheet, 
   ScrollView ,
   TouchableHighlight,
   Animated,
   Easing,
   //animatedValue,
   ActivityIndicator
} from 'react-native';
import Dimensions from 'Dimensions';

const layout = require('tutorRN/src/Layout')




class ImageLoader extends Component {

  constructor (props){
    super(props);
    this.animatedValue = new Animated.Value(0),
    this.state = {
      //fadeAnim: new Animated.Value(0),
      
      opacity: new Animated.Value(0),
      move : new Animated.Value(0),
      data: this.props.photos,
      displayingIndex : 0,
      landscape : false,
      imageHeight: 0,
      imageWidth: 0,
      //loading : true,
      //displayContent : this.displayContent.bind(this)
    }
    this.displayContent = this.displayContent.bind(this)
  }

  componentDidMount() {
    /*
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 10000,              // Make it take a while
      }
    ).start();                        // Starts the animation
    */

    //this.animate()
    this.preloadImageSize()
   
   
  }

  preloadImageSize ()
  {
    Image.getSize(this.state.data[this.state.displayingIndex], (width, height) =>{
      //console.log('height : ' + imageHeight)
      //console.log('width : ' + imageWidth)
      var landscape = false
      if ( height < width)
      {
        landscape = true
        
      }
      //console.log('landscape = ' + landscape)
      //this.setState({imageHeight , imageWidth, landscape})
      
      this.setState({
        //imageHeight : height,
        //imageWidth: width,
        landscape: landscape,
        //loading : false
      })
      
      this.animate()

    }, (error) =>{
      console.log(error)
    })
  }


  //onLoad = (index) => {
  onLoad ( event ){

    

    //console.log('onLoad = ' + event.nativeEvent.height)
    
    /*
    Animated.sequence([
      Animated.timing(this.state.opacity,{
      toValue:1,
      duration: 3000,
      useNativeDriver: true,
      easing: Easing.linear}),

      Animated.timing(this.state.opacity,{
        toValue: 0 ,
        duration: 1500,
        useNativeDriver: true,
        easing: Easing.linear})
      ]).start( this.animationFinishWithIndex( index ));
    */
  
    /*
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
      easing: Easing.linear
    }).start( ()=>this.endAnimation(index) );
    */
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
        duration: 6000,
        easing: Easing.linear
      }
    //).start(() => this.animate())
    //this.animationFinishWithIndex( this.state.displayingIndex)
    ).start(() => this.animationFinishWithIndex( this.state.displayingIndex) )

  return ;
    if ( this.state.landscape )
    {
      console.log('landscape animate')
      Animated.sequence([
        Animated.timing(
          this.state.move,{
            toValue: 1,
            duration: 3000,
            //easing: Easing.linear
          }
        ),
        Animated.timing(
          this.state.move,{
            toValue: 0,
            duration: 3000,
            //easing: Easing.linear
          }
        ),
        Animated.timing(
          this.state.opacity,{
            toValue: 0 ,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.linear
          }
        )
      ]).start(() => this.animationFinishWithIndex( this.state.displayingIndex) )
    }
    else
    {
      console.log('postirat animate')
      Animated.sequence(
        [
        Animated.timing(this.state.opacity,{
          toValue:1,
          duration: 3000,
          useNativeDriver: true,
          easing: Easing.linear}),
    
        Animated.timing(this.state.opacity,{
          toValue: 0 ,
          duration: 1000,
          useNativeDriver: true,
          easing: Easing.linear})
        ]
      ).start( () => this.animationFinishWithIndex( this.state.displayingIndex ) );
    }
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

  displayLandscapeContent(){
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

  displayContent ()
  {
    
    
    
    
    return (
      /*
      <Animated.Image
        source = {{uri : this.state.data[this.state.displayingIndex]}}
        style = {[{ opacity: this.state.opacity }, styles.fullViewStyle]}
      />
      */

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
        //onLoad={this.onLoad(this.state.displayingIndex)}
        //onLoad={this.onLoad(0)}
        //onLoad = {evt => this.onLoad(evt)}
        //{...this.props}
          resizeMode = 'stretch'
          source = {{uri : this.state.data[this.state.displayingIndex]}}
          //source = {{uri : this.state.data[0]}}
          style={[
          {
            
            //opacity: this.state.imageHeight > this.state.imageWidth ? this.state.opacity : 1, 
            opacity: this.state.landscape ?  1 : this.state.opacity , 
            left: this.state.landscape ?  this.state.move.interpolate({
              inputRange:[-1,1],
              outputRange:[-150,0] 
            }) : 0 ,
            /*
            transform: [
              {
                scale: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.3],
                })
              },
            ],
            */
          },
          //this.props.style,
          //styles.fullViewStyle
          //styles.animateImageStyle
          this.animateImageStyle()
        ]}
      />
      </View>
      
    )
  }

  render() {
    //let { fadeAnim } = this.state;
   
    
    return (
      //<Image source={{uri: 'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/3a7803bf022db91704584b7297b38bc6.jpg' }} style={styles.fullViewStyle} /> 
        this.displayLandscapeContent()
        //this.displayContent()
      
    )
  }
}

class PhotoSlideView extends Component{

  constructor (props){
    super(props);

    this.sliderOnPress = this.sliderOnPress.bind(this)
  }
  componentWillMount(){
    this.mounted = true
    this.props.onReady()
  } 

  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps);
  }

  sliderOnPress() {
    console.log('hihihi')
  }

  slideOnClick()
  {
    
    console.log('PhotoSlideView on slideOnClick')
    //this.props.onPress()
  }

  render (){

    
    const data = ['https://images.unsplash.com/photo-1485832329521-e944d75fa65e?auto=format&fit=crop&w=1000&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
      'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/3a7803bf022db91704584b7297b38bc6.jpg',
      'https://images.unsplash.com/photo-1485832329521-e944d75fa65e?auto=format&fit=crop&w=1000&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
    'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/3a7803bf022db91704584b7297b38bc6.jpg', 
    'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/3a7803bf022db91704584b7297b38bc6.jpg', 
    'https://images.unsplash.com/photo-1485832329521-e944d75fa65e?auto=format&fit=crop&w=1000&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
    'https://d13ycpzy3ywwvb.cloudfront.net/holictoday/holic/3a7803bf022db91704584b7297b38bc6.jpg',
    'https://images.unsplash.com/photo-1485832329521-e944d75fa65e?auto=format&fit=crop&w=1000&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D',
    ]

    return(

      //<TouchableHighlight 
        //onPress = { this.sliderOnPress }
        //onPress = { ()=>this.sliderOnPress() }
        //onPress = { ()=> this.slideOnClick() }
        //onPress={ ()=>this.onClicked()}
        //underlayColor = {layout.touchHighlightColor}
      //>
        
        <ImageLoader
          style={styles.image}
          //data = {data}
          //data = {this.props.photos}
          //photos = {this.props.photos}
          photos = {data}
          //source={{ uri: 'https://images.unsplash.com/photo-1485832329521-e944d75fa65e?auto=format&fit=crop&w=1000&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D' }}
        />
      //</TouchableHighlight>

    )
  }
}

export default PhotoSlideView;

const styles = StyleSheet.create ({

  animateImageStyle:{
    height: 200,
    width: 200,
    position:'absolute',
  },
  fullViewStyle :{
    width: layout.deviceWidth,
    height: layout.deviceHeight,
    flex: 1,
    //backgroundColor: 'transparent',
    //marginLeft: movingMargin,
  },
  backgroundStyle :{
    //width: layout.deviceWidth,
    //height: layout.deviceHeight,
    flex: 1,
    //left:20
    //marginLeft: movingMargin,
  },

  background:{
    //flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    width: layout.deviceWidth,
    height: layout.deviceHeight,
    padding: 5
  },
  image: {
    width: layout.deviceWidth,
    height: layout.deviceHeight,
    //borderRadius: 10,
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

})


