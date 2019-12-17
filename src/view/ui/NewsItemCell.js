import React, { Component } from 'react';
import { 
  
  Text, 
  Image, 
  View, 
  StyleSheet, 
  FlatList,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Dimensions from 'Dimensions';

import strings from 'tutorRN/src/service/strings'
import Assets from 'tutorRN/src/view/ui/Assets'

const layout = require('tutorRN/src/Layout')


class ImageSlider extends Component{
  _isMounted = false

  constructor (props){
    super(props);
    this.animatedValue = new Animated.Value(0)

    this.state = ({
      currentIndex:0,
    })
    this.renderItem = this.renderItem.bind(this)
    this.nextPhoto = this.nextPhoto.bind(this)
  }

  componentDidMount(){
    this._isMounted = true
    this.animate()

  }
  componentWillUnmount()
  {
    this._isMounted = false
  }

  animate () {
    var rand = 5 - Math.floor(Math.random() * 3)
    var time = rand * 1000
    
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: time ,
        easing: Easing.linear
      }
    ).start(() => this.nextPhoto()) 
  }

  nextPhoto()
  {
    var nextIndex = this.state.currentIndex +1
    if ( nextIndex == this.props.items.length)
    {
      nextIndex = 0
    }
    if ( this._isMounted ){
      this.setState({
        currentIndex : nextIndex
      })
      this.animate()
    }
    
  }

  renderItem(items) {

    var rand = Math.floor(Math.random() * 4)

    var animatedStyle;

    if (rand == 0)
    {
      const opacity = this.animatedValue.interpolate({
        inputRange: [0.5, 0.75, 1],
        outputRange: [0.75, 1, 0.75]
        })
        
        animatedStyle = {opacity,position:'absolute', height:layout.deviceHeight, width:layout.deviceWidth}

    }
    else if( rand == 1)
    {
      
      const scaleDown = this.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [2, 1]
      })
      animatedStyle = {transform: [{scale: scaleDown}],position:'absolute', height:layout.deviceHeight, width:layout.deviceWidth}
      
    }
    else if ( rand == 2)
    {
      const movingMargin = this.animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [-50, 50, -50]
      })
      animatedStyle = {position:'absolute', marginLeft: movingMargin, height:layout.deviceHeight, width:layout.deviceWidth}
    
    }
    else 
    {
      const scaleUp = this.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 2]
      })
      animatedStyle = {transform: [{scale: scaleUp}],position:'absolute', height:layout.deviceHeight, width:layout.deviceWidth}
      
    }
    return (
      <Animated.Image
        style={animatedStyle}
        source={{uri:items[this.state.currentIndex].uri}}
        //style = {styles.defaultImage}
        resizeMode = 'contain'
      />    
    )
  }

  render (){ 
    return(
      <View style = {{flex:1}}>
        <Image 
          style = {{flex:1}}
          resizeMode='cover'
          source= {{uri : this.props.items[this.state.currentIndex].uri}}
          blurRadius={10}
        />
        {
          this.renderItem(this.props.items)         
        }
      </View>
    )
  }

}

class NewsItemCell extends Component{

  constructor (props){
    super(props);

    this.displayViewOnClicked = this.displayViewOnClicked.bind(this)
  }
  componentWillMount(){
    this.defaultImage = (  
      <Image
        source={Assets.background.welcome}
        style = {styles.defaultImage}
        resizeMode = 'stretch'
      />
    )
  } 

  componentWillUnmount() {
    console.log('NewsItemCell componentWillUnmount')
    //clearInterval(this.state.interval);
  }

  showUU()
  {
    return (
      <LinearGradient colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.0)']} style={styles.linearGradient}>
        <View style = {{flex:1}}/>
      </LinearGradient>
    )
  }

  showUI()
  {
    return (
      <View style = {{flex: 1}}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.7)','rgba(0, 0, 0, 0.0)']} style = {styles.upperPartViewStyle}>
          <View style = {styles.tutorNameViewStyle}>
            <Image 
              //style = {styles.tutorImageStyle}
              style = {[layout.styles.homeIconSize, styles.tutorImageStyle]}
              source = {{uri: this.props.item.tutor_thumb}}
            />
            <Text style = {styles.tutorNameTextStyle }>
              {this.props.item.tutor_name}
            </Text>
          </View>
        </LinearGradient>
        <View style = {styles.lowerPartViewStyle}>
        
          <TouchableOpacity
            style = {[layout.styles.homeIconSize, {left:layout.deviceWidth - 50}]}
            onPress = {()=>this.props.commentBtnOnClicked(this.props.index)}
          >
            <Image style ={layout.styles.homeIconSize} source={Assets.actions.comment} />
          </TouchableOpacity>

          <TouchableOpacity
            style ={[layout.styles.homeIconSize, {left:layout.deviceWidth - 50}]}
            onPress = {()=>this.props.likeBtnOnClicked(this.props.index)}
          >
            <Image style = {layout.styles.homeIconSize} source={Assets.actions.like} />
          </TouchableOpacity>
        </View>
        <LinearGradient colors={['rgba(0, 0, 0, 0.0)','rgba(0, 0, 0, 0.5)']} style = {styles.lowerPartViewStyle}>
          {
            //this.props.item.course_media_list.length == 0 &&
            <View style = {styles.newsTextViewStyle}>
              <Text style = {styles.newsContentTextStyle} >{this.props.item.course_name}</Text>
              <Text 
                style = {styles.newsTitleTextStyle}
                numberOfLines= {3} 
              >
                {this.props.item.course_introduction}
              </Text>
            </View> 
          }
          
        </LinearGradient> 
        <LinearGradient colors={['rgba(0, 0, 0, 0.5)','rgba(0, 0, 0, 0.0)']} style = {{flex:1}}></LinearGradient>  
        
      </View>
    
    )
  }

  showContent()
  {
    
    var photos = []
    if ( this.props.item.course_media_list.length > 0  )
    {
      if ( this.props.showingIndex == this.props.index)
      {

        for (var i = 0; i < this.props.item.course_media_list.length ; i ++)
        {
          photos.push({
            uri:this.props.item.course_media_list[i].media_file,
            title:this.props.item.course_name,
            text:this.props.item.course_introduction,
            //fullWidth: true,
            extraSpacing:300,
          })
        }

        return (
          <View style={{height:layout.deviceHeight, width:'100%', position:'absolute',backgroundColor:'black' }} >
            {
              <ImageSlider items={photos} />
            }
            
          </View>
        )
      }
      else
      {
        return (
          <View style={{height:layout.deviceHeight, width:'100%', position:'absolute',backgroundColor:'black' }} >
            <Image 
              style = {{flex:1}}
              resizeMode='cover'
              source= {{uri : this.props.item.course_media_list[0].media_file}}
              blurRadius={10}
            />  
          </View>
        )
      }
      
    }
    else
    {
      return (
        <View style={{height:layout.deviceHeight, width:'100%', position:'absolute',backgroundColor:'black' }} >
          {this.defaultImage}
        </View>
      )
    }  
  }

  displayViewOnClicked()
  {
    console.log('displayViewOnClicked')
  }

  

  render (){
     
    return(

      <TouchableOpacity 
        onPress = {()=>this.props.onClicked(this.props.index)}
        style = {{  height:layout.deviceHeight}}
      >
        {
          this.showContent()
        }
        {
          this.showUI()
        }
      </TouchableOpacity>

    )
  }
}

export default NewsItemCell;

const styles = StyleSheet.create ({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },

  upperPartViewStyle:{
    flex:1,
    //backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    //backgroundColor:'orange',
    //width:'100%'
  },
  lowerPartViewStyle:{
    flex:4,
    justifyContent: 'flex-end',
    //backgroundColor: 'transparent',
    //backgroundColor:'green',
    //width:'100%'
    
  },

  tutorNameViewStyle:{
    paddingLeft: 10,
    //top:30,
    width: layout.deviceWidth,
    flexDirection:'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  tutorImageStyle:{
    //height: 30, 
    //width: 30, 
    borderRadius:20, 
    borderColor:'black' ,
    borderWidth:2
  },

  tutorNameTextStyle :{
    paddingLeft: 10,
    color:'white', 
    fontWeight:'bold', 
    backgroundColor: 'rgba(0,0,0,0)'
  },

  commentIconStyle :{
    left : layout.deviceWidth - 50,
    height: 40,
    width: 40
  },

  likeIconStyle:{
    left : layout.deviceWidth - 50,
    height: 40,
    width: 40
  },
  fullViewStyle :{
    flex:1,
    backgroundColor:'black',
    //width: layout.deviceWidth,
    //height: layout.deviceHeight
  },

  newsTextViewStyle:{  
    left:0,
    right:0,
    //bottom: 0,
    backgroundColor :'transparent',
    flexDirection:'column',
    //top: layout.deviceHeight - 200,
    height:120,
    width: layout.deviceWidth,

  },

  newsContentTextStyle:{
    
    padding:10,
    color:'white', 
    fontWeight:'bold', 
    fontSize:layout.stringsSizeMid,  
    
  },

  newsTitleTextStyle:{
    paddingLeft:10,
    paddingRight:10,
    color:'white',
    lineHeight: 20,
    fontSize:layout.stringsSizeSmall
  },
  defaultImage: {
    height:'100%',
    width:'100%',
  },

})


