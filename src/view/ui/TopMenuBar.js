import React, { Component } from 'react';
import { 
   Text, 
   Image, 
   View, 
   StyleSheet, 
   ScrollView ,
   TouchableHighlight
} from 'react-native';
import Dimensions from 'Dimensions';
//import Hyperlink from 'react-native-hyperlink'
//import ParsedText from 'react-native-parsed-text';
const layout = require('/Layout')
import Assets from '/view/ui/Assets';


interface TopMenuBarProps {
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
class TopMenuBar extends Component <TopMenuBarProps>{

  constructor (props: TopMenuBarProps){
    super(props);
    //this.onPress = this.onPress.bind(this)
    console.log('data = '+ this.props.data)
    var array = []
    for ( var i = 0; i < this.props.data.length; i ++)
    {
      array.push(false)
    }

    // /console.log('multiSelectArray = '+array)

    this.state = {
      imageSource: '',
      selected: 0,
      //multiSelectArray :[],
      multiSelectArray: array,
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
    var bgColor = 'clear'
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

  textStyle(index)
  {
    const {multiSelect} = this.props


    return {
      color : multiSelect ? ( this.state.multiSelectArray[index] ? 'black' : 'gray' ) : ( this.state.selected == index ? 'black' : 'gray') ,
      fontWeight: 'bold'
    }

    /*
    if ( multiSelect )
    {
      return{
        color : this.state.multiSelectArray[index] ? 'black' : 'gray',
        fontWeight: 'bold'
      }
    }
    else
    {
      return{
        //flex:1,
        color: this.state.selected == index ? 'black' : 'gray',
        fontWeight:'bold',        
      }
    }
    */
    
  }

  borderStyle(index)
  {
    const { selected, size, itemHeight, itemWidth, multiSelect} = this.props
    var bWidth = 1
    //console.log ('selected  = ' + selected)

    

    return{
      //flex:1,
      //key: index,
      margin: 5,
      //borderColor : this.state.selected == index ? layout.themeTextColor : 'gray',
      borderColor : multiSelect ? (this.state.multiSelectArray[index] ? layout.themeTextColor : 'gray') : (this.state.selected == index ? layout.themeTextColor : 'gray'),
      alignItems:'center',
      justifyContent:'center', 
      height: itemHeight, 
      width: itemWidth, 
      borderWidth: bWidth + selected * 1 ,
      borderRadius:2, 
    
    }
  }

  onPress(index)
  {
    const { multiSelect } = this.props;

    this.props.onClicked(index)
    
    var tmpArray = this.state.multiSelectArray

    if ( multiSelect )
    {
      tmpArray[index] = !tmpArray[index]

      this.setState({
        multiSelectArray: tmpArray
      })
      
    }
    else
    {
      this.setState({
        selected: index,
      })
    }
    
  }

  
  itemComponent(item, index)
  {
    const { multiSelect } = this.props;
    
    if (index == 0){
      return (
        <View
          style = {this.borderStyle(index)}
        >
          <Image style = {{height:20, 
            resizeMode:'contain', 
            width: 20,  
            alignItems:'center', 
            backgroundColor: index == this.state.selectedItem ? 'red' : 'gray'
            }} 
            source = {Assets.actions.trytry} 
          />
        </View> 
      )
    }
    else{

      return (
        <View
          style = {this.borderStyle(index)}
        >
          <Text style = {this.textStyle(index)} >{item}</Text>
        </View> 

      )
    }

    
    /*
    if ( 0 )
    {
      return <View/>
    }
    else
    {
      if (index == 0){
        return (
          <View
            style = {this.borderStyle(index)}
          >
            <Image style = {{height:20, 
              resizeMode:'contain', 
              width: 20,  
              alignItems:'center', 
              backgroundColor: index == this.state.selectedItem ? 'red' : 'gray'
              }} 
              source = {Assets.actions.trytry} 
            />
          </View> 
        )
      }
      else
      {
        return (
          <View
            style = {this.borderStyle(index)}
          >
            <Text style = {this.textStyle(index)} >{item}</Text>
          </View> 
        )
      }
    }
    */
  }
  
  

  render (){

    const {  badge, url, size, style, badgeStyle, avatarStyle, text, selected, data, itemHeight, itemWidth, multiSelect } = this.props;
    const { imageSource } = this.state
    return(

      <ScrollView
        style = {{backgroundColor: 'white'}}
        horizontal = {true}
        showsHorizontalScrollIndicator={false}
      >
        {
          data.map((item, index) =>
            (
              <TouchableHighlight
                key= {index}
                //onPress={() => onPress ? this.onPress() : null}
                //onPress={ ()=>this.onPress(index) ? this.onPress(index) : null}
                onPress={ ()=>this.onPress(index) }
                underlayColor = {layout.touchHighlightColor}
              >
                {this.itemComponent(item, index)}

              </TouchableHighlight>
              
            )
          )
        }
      
      </ScrollView>

    )
  }
}

export default TopMenuBar;

const styles = StyleSheet.create ({   
  

  backgroundContainer:{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
})


