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

  textStyle(index)
  {
    return {
      height:20,  
      alignItems:'center', 
      marginTop:5, 
      color: index == this.state.selectedItem ? 'black' : 'gray'
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

  titleViewStyle()
  {
    return {
      //flex:1,
      flexDirection: 'row',
      justifyContent: 'space-around',
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
      
      <View style = {styles.ToolBarStyle}>
      
   

        
        <View style = {styles.background}>
          {
            this.props.catName.map((item, index) =>{
              return (
                <TouchableHighlight 
                  //onPress={this.props.onClicked}
                  //underlayColor = {this.props.touchColor}
                  underlayColor = { 'rgba(52, 52, 52, 0.0)'}
                  onPress={ ()=>this.OnClicked(index, this.props.tag)}
                  //onPress={ ()=>this.props.onClicked(index)}
                  //<Image style = {this.imageStyle(index)} source = {Assets.actions.search} />
                  key = {index}
                >
                  <View style = {{ width:layout.deviceWidth/5, height:50, alignItems:'center'}}>
                    <Image style = {this.imageStyle(index)} source = {this.props.imageSource[index]} />
                    <Text style = {this.textStyle(index)}>
                        {item}
                    </Text>
                    
                  </View>
                </TouchableHighlight>
              );
            })
          }
        

        </View>
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
  height: 100,
  imageSource : [Assets.actions.search, Assets.actions.search, Assets.actions.search, Assets.actions.search],
  catName: ['評分', '最多收藏', '收費','距離']
};

export default FilteringToolsBar;

const styles = StyleSheet.create ({
  background:{
    backgroundColor: 'white',
    //flex: 1,
    flexWrap:'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
    //justifyContent: 'center',
    //justifyContent: 'flex-start',
    alignItems: 'center',
    //backgroundColor: 'green',
    width: layout.deviceWidth,
    paddingTop:5,
    paddingBottom:5,
    //height: 50,
    //padding: 5
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


