import React, { Component } from 'react';
import { 
   Text, 
   Image, 
   View, 
   StyleSheet, 
   ScrollView ,
   ListView,
   Linking,
   TouchableHighlight
} from 'react-native';

const layout = require('../../Layout')
import Dimensions from 'Dimensions';

class SegmentControl extends React.Component{

  constructor (props){
    super(props);
    this.state = {
      selectedTab: 0
    }
    this.handleSettingsPress = this.handleSettingsPress.bind(this)
  }

  componentWillMount(){
    this.mounted = true
  } 

  handleSettingsPress(index, key ) {
    //NewsHomeView
    console.log( 'handleSettingsPress = ' + index + ' ,' + key)
    if( this.props.pressEnable )
    {
      this.setState({selectedTab: index})
      this.props.onClicked(index, key )
    }
    

  }

  lineStyle (index)
  {
    var lineCount = this.props.data.length
    var color 

    if( this.props.numberOfItem )
    {
      lineCount = this.props.numberOfItem
    }

    if( index === this.state.selectedTab )
    {
      color = this.props.colorTheme
    }
    else{
      color = 'rgba(255,255,255,0)'
    }

    // Disable TOUCH

    if ( !this.props.pressEnable)
    {
      color = 'rgba(255,255,255,0)'
    }


    var width = layout.deviceWidth / lineCount
    return{
      width: ((width - 10) *2)/3,
      position: 'absolute',
      bottom: 0.5,
      height: 3.5,
      backgroundColor : color,
      borderColor: color,
      borderWidth: 0.5,
      borderRadius: 3.5/2,

    }
  }

  textStyle (index)
  {
    return {
      color: this.props.textColor,
      fontSize: 15
    }
  }

  buttonStyle (index){

    var lineCount = this.props.data.length

    if( this.props.numberOfItem )
    {
      lineCount = this.props.numberOfItem
    }

    var width = layout.deviceWidth / lineCount
    var borderRightColor 
    var borderBottomColor
   
    if ( (index +1 ) % lineCount == 0 )
    {      
      borderRightColor = 'transparent'
    }
    else
    {
      borderRightColor = 'gray'
    }


    if ( this.props.data.length <= this.props.numberOfItem )
    {
      // Single LINE
      borderBottomColor = 'transparent'
    }
    else
    {
      // Multi LINE
    
      if ( Math.floor(this.props.data.length / lineCount) == Math.floor(index / lineCount) )
      {
        borderBottomColor = 'transparent'
      }
      else
      {
        borderBottomColor = 'gray'
      }


    }

    
    return {
      height: 40,
      width: width ,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: 'transparent',
      //borderColor: 'gray',
      //borderWidth: 0.5
      borderRightColor : borderRightColor,
      borderRightWidth: 0.5,
      borderBottomColor : borderBottomColor,
      borderBottomWidth: 0.5     

      //backgroundColor : 'rgba(216,72,118,1)',
      //borderBottomColor: 'rgba(216,72,118,1)',
      //borderBottomColor : color,
      //borderBottomWidth: 3.5

    }
  }

  render (){
    

    return(
      <View style = {styles.background}>
      
      {
        this.props.data.map((item, index) =>{
          return (
            <TouchableHighlight 
              //onPress={this.props.onClicked}
              underlayColor = {this.props.touchColor}
              onPress={ ()=>this.handleSettingsPress(index, this.props.tag)}
              //onPress={ ()=>this.props.onClicked(index)}
              key = {index}
            >
              <View style={this.buttonStyle(index)}>
                <Text style = {this.textStyle(index)}>
                    {item}
                </Text>
                <View style = {this.lineStyle(index)}>
                </View>
              </View>
            </TouchableHighlight>
          );
        })
      }
      

      </View>

    );
  }

}

SegmentControl.defaultProps = {
  tag: 1,
  textColor : 'gray',
  colorTheme: 'rgba(216,72,118,1)',
  touchColor: 'rgba(237,182,202,1)',
  pressEnable: true,
  numberOfItem: 3,
};

export default SegmentControl;

const styles = StyleSheet.create ({
  background:{
    backgroundColor: 'white',
    //flex: 1,
    flexWrap:'wrap',
    flexDirection: 'row',
    //justifyContent: 'space-between',
    //justifyContent: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    //backgroundColor: 'red',
    width: layout.deviceWidth,
    paddingTop:5,
    paddingBottom:5,
    //height: 50,
    //padding: 5
  }

    /*
     <Text style = { this.textStyle(index)}>
                    {item}
                </Text>
                <View style = {{backgroundColor : 'red', height: 5, flex:1}}>
                </View>
                */
    

})


