import React, { Component } from 'react';
import { 
   Text, 
   Image, 
   View, 
   FlatList, 
   StyleSheet,
   TouchableOpacity ,
   ListView,
   Linking,
   TouchableHighlight
} from 'react-native';

const layout = require('tutorRN/src/Layout')
//const layout = require('tutorRN/src/Layout')
import Dimensions from 'Dimensions';
import Avatar from 'tutorRN/src/view/ui/Avatar';
import Assets from 'tutorRN/src/view/ui/Assets';

class FilteringToolsBar extends React.Component{

  constructor (props){
    super(props);
    this.state = {
      selectedItem: 0
    }
    //this.handleSettingsPress = this.handleSettingsPress.bind(this)
  }

  componentWillMount(){
    //this.mounted = true
  } 

  backgroundStyle ()
  {
    return {
      flexDirection : 'column',
      //backgroundColor: 'red',
      height: this.props.height,
    }
  }

  buttonContainerStyle()
  {
    var imageHeight = 0 
    var titleHeight = 0
    if( this.props.imageSource )
    {
      imageHeight = 30
    }

    if ( this.props.catName )
    {
      titleHeight = 20
    }
    else
    {
      titleHeight = 2
    }
    return {
      height:imageHeight + titleHeight + 10, 
      alignItems:'center',
      flexDirection: 'column',
      justifyContent:'space-between'
    }
  }

  textStyle(index)
  {
    return {
      fontSize:layout.stringsSizeMid,
      height:20,  
      alignItems:'center', 
      marginTop:5, 
      color: index == this.state.selectedItem ? 'black' : 'gray'
    }
  }

  underlineStyle(index)
  {
    return {
      height:2,
      width:'100%',
      backgroundColor :index == this.state.selectedItem ? 'black' : 'white',
      //borderBottomColor: index == this.state.selectedItem ? 'black' : 'white',
      //borderBottomWidth: 2 
    }
  }

  imageStyle(index)
  {
    
    return {
      height:30, 
      resizeMode:'contain', 
      width: 30,  
      alignItems:'center', 
      //backgroundColor: index == this.state.selectedItem ? 'red' : 'gray'
    }
  }

  

  OnClicked(index, key)
  {
    console.log('OnClicked ' + index)
    
    this.setState({
      selectedItem:index
    })
    this.props.onClicked(index)
  }


  render (){
    return(
     
        <View style = {styles.background}>
          {
             this.props.catName.map((item, index) =>{
              return (
                <TouchableOpacity 
                  //onPress={this.props.onClicked}
                  //underlayColor = {this.props.touchColor}
                  underlayColor = { 'rgba(52, 52, 52, 0.0)'}
                  onPress={ ()=>this.OnClicked(index, this.props.tag)}
                  //onPress={ ()=>this.props.onClicked(index)}
                  //<Image style = {this.imageStyle(index)} source = {Assets.actions.search} />
                  key = {index}
                >
                  <View style = {this.buttonContainerStyle()}>
                  {
                    this.props.imageSource && <Image style = {this.imageStyle(index)} source = {this.props.imageSource[index]} />
                  }
                  {  
                    this.props.catName && <Text style = {this.textStyle(index)}>{this.props.catName[index]}</Text>
                  }
                  {
                    <View style = {this.underlineStyle(index)}/>
                  }
                  </View>
                </TouchableOpacity>
              );
            })
          }
        

        </View>
      

    );
  }

}

FilteringToolsBar.defaultProps = {
  tag: 1,
  textColor : 'gray',
  colorTheme: 'rgba(216,72,118,1)',
  touchColor: 'rgba(237,182,202,1)',
  pressEnable: true,
  numberOfItem: 3,
  height: 120,
  imageSource : [Assets.actions.search,Assets.actions.search, Assets.actions.search, Assets.actions.search, Assets.actions.search],
  //catName: ['評分', '最多收藏', '收費','距離']
};

export default FilteringToolsBar;

const styles = StyleSheet.create ({
  background:{
    backgroundColor: 'white',
    flexWrap:'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex:1,
    alignItems: 'center',
    paddingTop:5,
    paddingBottom:5,
    
  },
  ToolBarStyle:{
    flexDirection: 'column',
    

  }
  /*
  background:{
    backgroundColor: 'red',
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
    //height: this.props.height,
    //padding: 5
  }

  <Text style = {{margin:10, color:'rgb(231,121,98)', fontWeight:'bold'}}>
          排序
        </Text>

  */
    
})


