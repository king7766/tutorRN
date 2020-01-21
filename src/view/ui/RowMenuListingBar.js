import React, { Component } from 'react';
import { 
   Text, 
   Image, 
   View, 
   StyleSheet, 
   ScrollView ,
   TouchableOpacity
} from 'react-native';
import Dimensions from 'Dimensions';

const layout = require('tutorRN/src/Layout')
import Assets from 'tutorRN/src/view/ui/Assets';


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
class RowMenuListingBar extends Component <TopMenuBarProps>{

  constructor (props: TopMenuBarProps){
    super(props);
    //this.onPress = this.onPress.bind(this)
    
    
    
    this.state = {...props}
    console.log('data = '+ this.props.data)
    console.log('multiSelectArray = ' + this.state.multiSelectArray)

  }
  componentWillMount(){
    this.init()
  } 

  componentWillReceiveProps(nextProps){
    
  }

  init ()
  {
    /*
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
    */
  }

 
  textStyle(index)
  {
    const {multiSelect} = this.props


    return {
      //color : multiSelect ? ( this.state.multiSelectArray[index] ? 'black' : 'gray' ) : ( this.state.selected == index ? 'black' : 'gray') ,
      color :  this.state.multiSelectArray[index] ? 'black' : 'gray',
      fontSize: layout.stringsSizeMid,
      fontWeight: 'bold'
    }
  }

  borderStyle(index)
  {
    const { itemHeight, itemWidth, multiSelect, multiSelectArray} = this.props
    var bWidth = 1
    //console.log ('selected  = ' + selected)

    //var borderColor = multiSelect ? (this.state.multiSelectArray[index] ? layout.themeTextColor : 'gray') : (this.state.selected == index ? layout.themeTextColor : 'gray')
    var borderColor = this.state.multiSelectArray[index] ? layout.themeTextColor : 'gray'

    if ( index == -1 )
    {
      borderColor = layout.themeTextColor
    }

    return{
      //flex:1,
      //key: index,
      padding:10, 
      margin: 5,
      //borderColor : this.state.selected == index ? layout.themeTextColor : 'gray',
      borderColor : borderColor,
      alignItems:'center',
      justifyContent:'center', 
      height: itemHeight, 
      //width: itemWidth, 
      alignSelf: 'flex-start' ,
      borderRadius: 5,
      //borderWidth: bWidth + selected * 1 ,
      borderWidth: bWidth ,
      
    
    }
  }

  onPress(index)
  {
    
    //const { multiSelect } = this.props;

    this.props.onClicked(index)
    
    var tmpArray = this.state.multiSelectArray

    tmpArray[index] = !tmpArray[index]

    this.setState({
      multiSelectArray: tmpArray
    })

    return 

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
    const { firstImageSource, firstItemShowIcon,multiSelect, itemHeight, itemWidth } = this.props;
    
    //if (index == 0 && (firstItemShowIcon == true) ){
    if( index == -1 ){
      return (
        <View
          style = {this.borderStyle(index)}
        >
          <Image 
            style = {{
              height:20, 
              resizeMode:'contain', 
              width: 20,  
              alignItems:'center', 
            }} 
            source = {firstImageSource ? firstImageSource : Assets.icon.advanceSearch} 
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

    
  
  }
  
  

  render (){

    const {  firstItemShowIcon, badge, url, size, style, badgeStyle, avatarStyle, text, selected, data, itemHeight, itemWidth, multiSelect } = this.props;


    var dataSource = this.props.data
    /*
    if ( this.props.firstItemShowIcon && !dataSource.includes(""))
    {
      dataSource.splice(0, 0, '')
    }
    
    var multiSelectArray = this.props.multiSelectArray
    */

    return(

      <View
        style = {{height:this.props.itemHeight +10}}
      >
        <ScrollView
          style = {{backgroundColor: 'white'}}
          horizontal = {true}
          showsHorizontalScrollIndicator={false}
        >
          {
            this.props.showConfigIcon && 
            <TouchableOpacity
              onPress={ ()=>this.onPress(-1) }  
            >
              {this.itemComponent("",-1)}
            </TouchableOpacity>  

          }
          {
            dataSource.map((item, index) =>
              (
                <TouchableOpacity
                  key= {index}
                  onPress={ ()=>this.onPress(index) }  
                >
                  {this.itemComponent(item, index)}
                </TouchableOpacity>    
              )
            )
          }
        </ScrollView>

      </View>
      

    )
  }
}

export default RowMenuListingBar;

const styles = StyleSheet.create ({   
  

  backgroundContainer:{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
})


